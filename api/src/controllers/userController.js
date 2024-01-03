import {
  countAllUsers,
  findAllUsers,
  createUser,
  getUserById,
  getUserByUsername,
  getUserByEmail
} from '../models/user.js';


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
    const response = await getUserById(req.params.id);
    res.status(response.success ? 200 : 404).json(response);
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

export const loginUser = async (req, res) => {
  console.log(req.body.email);
  try {
    const user = await getUserByEmail(req.body.email);
    //console.log(user.data.username);
    if (!user) {
      res.status(500).json({ success: false, message: 'User not found' });
    }
    if (req.body.password === user.data.password) {
      // return { success: true, data: user };
      res.status(user.success ? 200 : 404).json(user);
    } else {
      res.status(500).json({ success: false, message: 'wrong password' });
    }
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