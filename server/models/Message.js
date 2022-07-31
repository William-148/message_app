import pkg from "mongoose";
const { Schema, model } = pkg;

const message = new Schema({
    roomId:{
        type: String,
        required: true
    },
    writterId:{
        type: String,
        required: true
    },
    writter:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    }
}, {
    timestamps: {createdAt: true, updatedAt: false}
});

export default model('messages', message);