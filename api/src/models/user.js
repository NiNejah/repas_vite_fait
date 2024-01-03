import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

export default User;

// to create a new user
export const createUser = async (body) => {
    try {
        const user = new User(body);
        const result = await user.save();
        return { success: true, data: result };
    } catch (error) {
        return { success: false, message: 'User not added ' + error };
    }
};

export const getUserById = async (id) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            return { success: false, message: 'User not found' };
        }
        return { success: true, data: user };

    } catch (error) {
        return { success: false, message: 'Error getting user: ' + error };
    }
};

export const countAllUsers = async () => {
    try {
        const count = await User.countDocuments();
        if (!count) {
            return { success: false, message: "can't count Projects" };
        }
        return { success: true, data: count };
    } catch (error) {
        return { success: false, message: 'Error counting documents' + error };
    }
}

export const findAllUsers = async () => {
    try {
        const users = await User.find();
        if (!users) {
            return { success: false, message: 'users not found' };
        }
        return { success: true, data: users };
    } catch (error) {
        return { success: false, message: 'Error finding users:' + error };
    }
}

export const getUserByUsername = async (username) => {
    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            return { success: false, message: 'User not found' };
        }
        return { success: true, data: user };
    } catch (error) {
        return { success: false, message: 'Error getting user: ' + error };
    }
};

export const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return { success: false, message: 'User not found' };
        }
        return { success: true, data: user };
    } catch (error) {
        return { success: false, message: 'Error getting user: ' + error };
    }
};


