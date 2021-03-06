import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { 
        type: String,
        required: true, 
    },
    password: { 
        type: String,
        required: true,
        
    },
    email: { 
        type: String,
        required: true,
    },
    pantry: [],
    recipes: []
}, { timestamps: true });




module.exports = mongoose.model('User', UserSchema)
