import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from "dotenv";

config();
const token_key = process.env.TOKEN_KEY;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(v) {
            if (!validator.isEmail(v)) throw new Error('Invalid e-mail!');
        }
    },
    password: {
        type: String,
        required: true,
        validate(v) {
            if (!validator.isLength(v, { min: 4, max: 20 })) throw new Error('The password must be between 4 and 20 characters long!');
        }
    },
    favorites: [{
        type : String 
    }],
    vegetarian: {
        type: Boolean,
        default: false,
    },
    program: {
        type: [
            {
                id: {
                    type:String,
                    required: true,
                },
                date: {
                    type: Date,
                    required: true,
                }
            }
        ],
        default: [],
    }
});

userSchema.pre('save', async function () {
    console.log("10101010101010101010101010101010101010101010101");
    if (this.isModified('password'))
        this.password = await bcrypt.hash(this.password, 8);
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

export const updateUser = async (id, newData) => {
    try {
        if (newData.password) {
            newData.password = await bcrypt.hash(newData.password, 8);
        }
        const user = await User.findByIdAndUpdate(id, newData, { new: true });
        return { success: true, data: user, message: 'User updated successfully' };
    } catch (error) {
        return { success: false, message: 'Error updating User: ' + error };
    }
}

export const findUser = async (email, password) => {
    try {
        const user = await User.findOne({ email: email });
        if (!user)
            return { success: false, message: 'User not found' };
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
            return { success: false, message: 'Wrong password' };

        const token = jwt.sign({ userId: user._id }, token_key);
        return { success: true, data: user, token: token };
    } catch (error) {
        return { success: false, message: 'User not found ' + error };
    }
};

export const getFavorites = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user)
            return { success: false, message: 'User not found' };
        return { success: true, data: user.favorites };
    }catch {
        return { success: false, message: 'User not found ' + error };
    }
}

export const addFavorite = async (userId,body) =>{
    const itemId = body.favoriteId; // Assuming itemId is sent in the request body
    try {
        const user = await User.findById(userId);
        if (!user)
            return { success: false, message: 'User not found' };
        user.favorites.push(itemId);
        console.log("ggggggggggggggggggggggggggg");
        await user.save();
        return { success: true, data: user.favorites };
    }catch (error) {
        console.error(error); // Log the error for debugging
        return { success: false, message: 'User not found ' + error };
    }
}

export const removeFavorite = async (userId,body) =>{
    const itemId = body.favoriteId; // Assuming itemId is sent in the request body
    try {
        const user = await User.findById(userId);
        if (!user)
            return { success: false, message: 'User not found' };
        // Add the itemId to favorites
        user.favorites = user.favorites.filter(favId => favId.toString() !== itemId);
        await user.save();
        return { success: true, data: user.favorites };
    }catch {
        return { success: false, message: 'User not found ' + error };
    }
} 