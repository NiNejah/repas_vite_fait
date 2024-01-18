import { config } from "dotenv";

import redis from '../redis/redis.js';

config();

const edamamID = process.env.EDAMAM_ID || "01c306cf";
const edamamKey = process.env.EDAMAM_KEY || "6179f34f1acea7368bcd5d4020b90b0c";

export const getRecipes = async (req, res) => {
    try {
        const key = `recipes${req.body.filters}${req.body.health}`;
        const cachedData = await redis.get(key);

        if (cachedData !== null) {
            console.log('Cache hit:', cachedData);
            const parsedCachedData = JSON.parse(cachedData);
            res.status(parsedCachedData.success ? 200 : 404).json(parsedCachedData);
        } else {
            console.log("api");
            const apiUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${req.body.filters}&app_id=${edamamID}&app_key=${edamamKey}${req.body.health}`;

            const response = await fetch(apiUrl);
            const responseData = await response.json();

            console.log("API Response:", responseData);
            console.log(apiUrl);
            
            console.log('Cache miss. Fetching data from the database:', responseData);

            res.status(response.ok ? 200 : 404).json({ success: response.ok ,data : responseData});

            // Update the cache with the fetched data
            await redis.set(key, JSON.stringify({ success: response.ok ,data : responseData}));
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

export const getRecipeByID = async (req, res) => {
    try {
        const key = `recipesID${req.params.id}`;
        const cachedData = await redis.get(key);

        if (cachedData !== null) {
            console.log('Cache hit:', cachedData);
            const parsedCachedData = JSON.parse(cachedData);
            res.status(parsedCachedData.success ? 200 : 404).json(parsedCachedData);
        } else {
            console.log("api");
            const apiUrl = `https://api.edamam.com/api/recipes/v2/${req.params.id}?type=public&app_id=${edamamID}&app_key=${edamamKey}`;

            const response = await fetch(apiUrl);
            const responseData = await response.json();

            console.log("API Response:", responseData);
            console.log(apiUrl);
            
            console.log('Cache miss. Fetching data from the database:', responseData);

            res.status(response.ok ? 200 : 404).json({ success: response.ok ,data : responseData});

            // Update the cache with the fetched data
            await redis.set(key, JSON.stringify({ success: response.ok ,data : responseData}));
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};


