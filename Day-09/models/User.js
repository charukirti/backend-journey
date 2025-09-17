import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    jobTitle: {
        type: String
    },

    gender: {
        type: String
    }
}, { timestamps: true });


/* creating model using schema */

const UserModel = mongoose.model('user', userSchema);


export default UserModel;