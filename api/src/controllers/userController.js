import {
  countAllUsers,
  findAllUsers,
  createUser,
  getUserById,
  getUserByUsername,
  updateUser,
  findUser,
  getFavorites,
  addFavorite,
  removeFavorite,
  getVegetarian,
  updateVegetarian,
  getPorkFree,
  updatePorkFree,
  getPeanutFree,
  updatePeanutFree,
  createProgramDate,
  removeProgramDate,
  modifyProgramDate,
  getProgram

} from '../models/user.js';

import redis from '../redis/redis.js';

export const addUser = async (req, res) => {
  try {
    const response = await createUser(req.body);
    res.status(response.success ? 200 : 404).json(response);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const getUser = async (req, res) => {
  try {
    const key = `user${req.params.id}`;
    const cachedData = await redis.get(key);
    if (cachedData !== null) {
      console.log('Cache hit:', cachedData);
      // Parse cached data only if it exists
      const parsedCachedData = JSON.parse(cachedData);
      res.status(parsedCachedData.success ? 200 : 404).json(parsedCachedData);
    } else {

      const response = await getUserById(req.params.id);
      console.log('Cache miss. Fetching data from the database:', response);
      res.status(response.success ? 200 : 404).json(response);

      // Update the cache with the fetched data
      await redis.set(key, JSON.stringify(response));
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Controller to get a list of all users
export const getAllUsers = async (req, res) => {
  try {
    const total = await countAllUsers();
    const users = await findAllUsers();
    res.status(total.success && users.success ? 200 : 404).json({ total: total.data, data: users.data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


export const getUserByName = async (req, res) => {
  try {
    const user = await getUserByUsername(req.params.name);
    if (!user) {
      res.status(500).json({ success: false, message: 'User not found' });
    }
    res.status(user.success ? 200 : 404).json(user);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const modifyUser = async (req, res) => {
  try {
    const response = await updateUser(req.params.id, req.body);
    res.status(response.success ? 200 : 404).json(response);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

export const loginUser = async (req, res) => {
  try {
    const user = await findUser(req.body.email, req.body.password);
    res.status(user.success ? 200 : 404).json(user);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


export const getAllFavorites = async (req, res) => {
  try {
    const key = `allFavorites${req.params.id}`;
    const cachedData = await redis.get(key);

    if (cachedData !== null) {
      console.log('Cache hit:', cachedData);

      // Parse cached data only if it exists
      const parsedCachedData = JSON.parse(cachedData);
      res.status(parsedCachedData.success ? 200 : 404).json(parsedCachedData);
    } else {
      const favorites = await getFavorites(req.params.id);
      console.log('Cache miss. Fetching data from the database:', favorites);

      // No need to parse favorites here, as it's not cached yet
      res.status(favorites.success ? 200 : 404).json(favorites);

      // Update the cache with the fetched data
      await redis.set(key, JSON.stringify(favorites));
    }
  } catch (error) {
    console.error('Error in getAllFavorites:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


export const addOneFavorite = async (req, res) => {
  try {
    const favorites = await addFavorite(req.params.id, req.body);
    res.status(favorites.success ? 200 : 404).json(favorites);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const removeOneFavorite = async (req, res) => {
  try {
    const favorites = await removeFavorite(req.params.id, req.body);
    res.status(favorites.success ? 200 : 404).json(favorites);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Controller function to update the vegetarian field
export const getVegetarianStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const key = `vegetarian${id}`;
    const cachedData = await redis.get(key);
    if (cachedData !== null) {
      console.log('Cache hit:', cachedData);
      // Parse cached data only if it exists
      const parsedCachedData = JSON.parse(cachedData);
      res.status(parsedCachedData.success ? 200 : 404).json(parsedCachedData);
    } else {

      const response = await getVegetarian(id);
      console.log('Cache miss. Fetching data from the database:', response);
      res.status(response.success ? 200 : 404).json(response);

      // Update the cache with the fetched data
      await redis.set(key, JSON.stringify(response));
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
// Controller function to update the vegetarian field
export const updateVegetarianField = async (req, res) => {
  try {
    const { id } = req.params;
    const { isVegetarian } = req.body;

    const result = await updateVegetarian(id, isVegetarian);
    res.status(result.success ? 200 : 404).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const getPeanutFreeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const key = `peanutFree${id}`;
    const cachedData = await redis.get(key);
    if (cachedData !== null) {
      console.log('Cache hit:', cachedData);
      // Parse cached data only if it exists
      const parsedCachedData = JSON.parse(cachedData);
      res.status(parsedCachedData.success ? 200 : 404).json(parsedCachedData);
    } else {
      const response = await getPeanutFree(id);
      console.log('Cache miss. Fetching data from the database:', response);
      res.status(response.success ? 200 : 404).json(response);
      // Update the cache with the fetched data
      await redis.set(key, JSON.stringify(response));
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
// Controller function to update the PeanutFree field
export const updatePeanutFreeField = async (req, res) => {
  try {
    const { id } = req.params;
    const { isPeanutFree } = req.body;

    const result = await updatePeanutFree(id, isPeanutFree);
    res.status(result.success ? 200 : 404).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const getPorkFreeStatus = async (req, res) => {


  try {
    const { id } = req.params;
    const key = `porkFree${id}`;
    const cachedData = await redis.get(key);
    if (cachedData !== null) {
      console.log('Cache hit:', cachedData);
      // Parse cached data only if it exists
      const parsedCachedData = JSON.parse(cachedData);
      res.status(parsedCachedData.success ? 200 : 404).json(parsedCachedData);
    } else {
      const response = await getPorkFree(id);
      console.log('Cache miss. Fetching data from the database:', response);
      res.status(response.success ? 200 : 404).json(response);
      // Update the cache with the fetched data
      await redis.set(key, JSON.stringify(response));
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
// Controller function to update the PorkFree field
export const updatePorkFreeField = async (req, res) => {
  try {
    const { id } = req.params;
    const { isPorkFree } = req.body;

    const result = await updatePorkFree(id, isPorkFree);
    res.status(result.success ? 200 : 404).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const addProgramDate = async (req, res) => {
  try {
    const { id } = req.params;
    const { programDate } = req.body;

    const result = await createProgramDate(id, programDate);
    res.status(result.success ? 200 : 404).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const deleteProgramDate = async (req, res) => {
  try {
    const { id } = req.params;
    const { programDateId } = req.body;
    const result = await removeProgramDate(id, programDateId);
    res.status(result.success ? 200 : 404).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


export const updateProgramDate = async (req, res) => {
  try {
    const { id } = req.params;
    const { programDateId, newDate } = req.body;

    const result = await modifyProgramDate(id, programDateId, newDate);
    res.status(result.success ? 200 : 404).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const getAllProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const key = `allProgram${id}`;
    const cachedData = await redis.get(key);
    if (cachedData !== null) {
      console.log('Cache hit:', cachedData);
      // Parse cached data only if it exists
      const parsedCachedData = JSON.parse(cachedData);
      res.status(parsedCachedData.success ? 200 : 404).json(parsedCachedData);
    } else {
      const response = await getProgram(id);
      console.log('Cache miss. Fetching data from the database:', response);
      res.status(response.success ? 200 : 404).json(response);
      // Update the cache with the fetched data
      await redis.set(key, JSON.stringify(response));
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};