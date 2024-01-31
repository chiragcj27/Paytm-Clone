import mongoose from "mongoose";

const {Schema} = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    }
})

const User = mongoose.model('User', userSchema);

module.exports = {User};