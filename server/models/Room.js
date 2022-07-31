import pkg from "mongoose";
const { Schema, model } = pkg;

const room = new Schema({
    name:{
        type: String,
        required: true
    }
});

export default model('rooms', room);