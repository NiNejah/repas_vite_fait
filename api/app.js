import connectDb from "./src/config/db.js";
import express from 'express';
import router from "./src/routes/index.js";
import { config } from "dotenv";
import swaggerJsDoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';
import cors from 'cors';
import Redis from 'ioredis';

config();
const host = process.env.HOST;
const port = process.env.PORT;

const redisPort = process.env.REDIS_PORT || 6379; // Default Redis port
const redisHost = process.env.REDIS_HOST || "redis"; // Default Redis host

const app = express();

const redis = new Redis({
    host: redisHost,
    port: redisPort,
});

connectDb();

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'REPAS_VITE_FAIT REST API',
            description: "A REST API built with Express and MongoDB.",
            version: '0.1',
        },
        servers: [
            {
                url: `http://localhost:${port}/api`,
                description: 'Development server',
            },
        ],
    },
    apis: ["./src/routes/*.js"],
}

const openapiSpecification = swaggerJsDoc(options);


// Middleware for caching
const cacheMiddleware = async (req, res, next) => {
    const key = req.originalUrl || req.url;

    try {
        const data = await redis.get(key);

        if (data !== null) {
            res.status(200).json(JSON.parse(data));
        } else {
            next();
        }
    } catch (error) {
        console.error('Error in cacheMiddleware:', error);
        next();
    }
};

app.use(cacheMiddleware);

app.use(cors())
app.use(express.json())
app.use('/', router);
app.use('/docs', serve, setup(openapiSpecification));
app.use(cors());

app.use(cacheMiddleware);

// Graceful shutdown: Close Redis client when the server is shut down
process.on('SIGINT', async () => {
    try {
        console.log('Closing Redis client');
        await redis.quit();
        console.log('Redis client closed');
        process.exit(0);
    } catch (error) {
        console.error('Error closing Redis client:', error);
        process.exit(1);
    }
});

app.listen(port, () => {
    console.log(`---------------------------------------------------------- Server is running on`)
});
