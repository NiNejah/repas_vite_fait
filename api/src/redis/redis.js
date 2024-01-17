import Redis from 'ioredis';

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
});



// Middleware for caching
export const cacheMiddleware = async (req, res, next) => {
    const key = req.originalUrl || req.url;

    try {
        const data = await redis.get(key);

        if (data !== null) {
            console.log(data);
            res.status(200).json(JSON.parse(data));
        } else {
            console.log("rien");
            next();
        }
    } catch (error) {
        console.error('Error in cacheMiddleware:', error);
        next();
    }
};

export default redis ; 