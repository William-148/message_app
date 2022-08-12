import pkg from "mongoose";
const { Schema, model } = pkg;

const user = new Schema({
    name:{
        type: String,
        required: true
    },
    nickname:{
        type: String,
        required: true
    },
    photo:{
        type: String,
        default: "https://picsum.photos/150"
    },
    state:{
        type: String,
        default: "I'm using this app!!"
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    keyAuth:{
        type: String
    }
});

export default model('users', user);