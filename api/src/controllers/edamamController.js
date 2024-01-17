import NodeCache from 'node-cache';
 
const EDAMAM_ID = "01c306cf";
const EDAMAM_KEY = "6179f34f1acea7368bcd5d4020b90b0c";

const apiCache = new NodeCache();

export const getRecipes = async (req, res) => {
    const cacheKey = req.body.filters + req.body.health;
    try {
        // const cachedData = await getAsync(cacheKey);
        const cachedData = apiCache.get(cacheKey);

        if (cachedData) {
            console.log("cache");
            res.json(cachedData);
        } else {
            console.log("api");
            const apiUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${req.body.filters}&app_id=${EDAMAM_ID}&app_key=${EDAMAM_KEY}${req.body.health}`;

            const response = await fetch(apiUrl);
            const responseData = await response.json();

            console.log("API Response:", responseData);
            console.log(apiUrl);

            if (response.ok) {
                apiCache.set(cacheKey,responseData, 60*5);
                res.status(200).json(responseData);
            } else {
                res.status(404).json({ success: false, message: 'Recipes not found' });
            }
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};


export const getRecipeByID = async (req, res) => {
    const cacheKey = req.params.id;
    try {
        const cachedData = apiCache.get(cacheKey);

        if (cachedData) {
            console.log("cache");
            res.json(cachedData);
        } else {
            console.log("api");
            const apiUrl = `https://api.edamam.com/api/recipes/v2/${cacheKey}?type=public&app_id=${EDAMAM_ID}&app_key=${EDAMAM_KEY}`;
            const response = await fetch(apiUrl);
            const responseData = await response.json();

            console.log("API Response:", responseData);
            console.log(apiUrl);

            if (response.ok) {
                apiCache.set(cacheKey,responseData, 60*5);
                res.status(200).json(responseData);
            } else {
                res.status(404).json({ success: false, message: 'Recipe not found' });
            }
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

