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
    peanutFree: {
        type: Boolean,
        default: false,
    },
    porkFree: {
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

export const addFavorite = async (userId, body) => {
    const itemId = body.favoriteId;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return { success: false, message: 'User not found' };
        }
        if(user.favorites.length < 5){
            user.favorites.push(itemId);
            const userUpdate = await User.findByIdAndUpdate(userId, { favorites: user.favorites }, { new: true });
            return { success: true, data: userUpdate.favorites };
        } else return { success: false, message: 'Maximum of favorites already reached' };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Internal Server Error' };
    }
};

export const removeFavorite = async (userId,body) =>{
    const itemId = body.favoriteId; // Assuming itemId is sent in the request body
    try {
        const user = await User.findById(userId);
        if (!user)
            return { success: false, message: 'User not found' };
        // Add the itemId to favorites
        user.favorites = user.favorites.filter(favId => favId.toString() !== itemId);
        const userUpdate = await User.findByIdAndUpdate(userId, { favorites: user.favorites }, { new: true });
        return { success: true, data: userUpdate.favorites };
    }catch {
        return { success: false, message: 'User not found ' + error };
    }
}

export const getVegetarian = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user)
            return { success: false, message: 'User not found' };
        return { success: true, data: user.vegetarian };
    }catch {
        return { success: false, message: 'User not found ' + error };
    }
}
// Function to update the vegetarian field
export const updateVegetarian = async (userId, isVegetarian) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: userId },
            { $set: { vegetarian: isVegetarian } },
            { new: true }
        );
        if (!user) {
            return { success: false, message: 'User not found' };
        }
        return { success: true, data: { vegetarian: user.vegetarian } };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Internal Server Error' };
    }
};
export const getPeanutFree = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user)
            return { success: false, message: 'User not found' };
        return { success: true, data: user.peanutFree };
    }catch {
        return { success: false, message: 'User not found ' + error };
    }
}
// Function to update the PeanutFree field
export const updatePeanutFree = async (userId, isPeanutFree) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: userId },
            { $set: { peanutFree: isPeanutFree } },
            { new: true }
        );
        if (!user) {
            return { success: false, message: 'User not found' };
        }
        return { success: true, data: { peanutFree: user.peanutFree } };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Internal Server Error' };
    }
};
export const getPorkFree = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user)
            return { success: false, message: 'User not found' };
        return { success: true, data: user.porkFree };
    }catch {
        return { success: false, message: 'User not found ' + error };
    }
}
// Function to update the porkFree field
export const updatePorkFree = async (userId, isPorkFree) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: userId },
            { $set: { porkFree: isPorkFree } },
            { new: true }
        );
        if (!user) {
            return { success: false, message: 'User not found' };
        }
        return { success: true, data: { porkFree: user.porkFree } };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Internal Server Error' };
    }
};

// Function to get the program for a user
export const getProgram = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            return { success: false, message: 'User not found' };
        }
        return { success: true, data: user.program };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Internal Server Error' };
    }
};

export const createProgramDate = async (userId, programDate) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { 
                _id: userId,
                $and: [
                    { 'program.date': { $ne: programDate.date } },
                    { 'program.id': { $ne: programDate.id } }
                ]
            },
            { $addToSet: { program: { $each: [programDate] } } },
            { new: true }
        );

        if (!updatedUser) {
            return { success: false, message: 'User not found or program date already exists' };
        }

        return { success: true, data: updatedUser.program };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Internal Server Error' };
    }
};



// Function to remove a date from the program
export const removeProgramDate = async (userId, programDateId) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            { $pull: { program: { id: programDateId } } },
            { new: true }
        );

        if (!updatedUser) {
            return { success: false, message: 'User not found' };
        }

        return { success: true, data: updatedUser.program };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Internal Server Error' };
    }
};

// Function to modify a date in the program
export const modifyProgramDate = async (userId, programDateId, newDate) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId, 'program.id': programDateId },
            { $set: { 'program.$.date': newDate } },
            { new: true }
        );
        if (!updatedUser) {
            return { success: false, message: 'User or program date not found' };
        }
        return { success: true, data: updatedUser.program };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Internal Server Error' };
    }
};



