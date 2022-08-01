import RoomModel from "../models/Room.js";
import Message from "../models/Message.js";
import CryptoJS  from "crypto-js";
import '../config.js'

const { SECRET_KEY } = process.env;

class Room{
    getTime (timestamp){
        const date = new Date(timestamp);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${hours}:${minutes > 9 ? minutes : '0' + minutes}`
    }

    getDate (timestamp){
        const date = new Date(timestamp);
        const month = date.getUTCMonth() + 1; //months from 1-12
        const day = date.getUTCDate();
        const year = date.getUTCFullYear();
        return year + "/" + month + "/" + day;
    }

    async create(name){
        try{
            const roomModel = new RoomModel({name});
            return await roomModel.save();
        }catch(error){
            console.error(error);
            return null;
        }
    }

    async getAll(){
        try {
            const finded = await RoomModel.find();
            return finded;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    createMsgObject(msg, date=undefined){
        return {
            _id: '' + msg._id,
            writterId: msg.writterId,
            writter: msg.writter,
            message: msg.message,
            time: this.getTime(msg.createdAt),
            date
        }
    }

    async saveMessage(message){
        try {
            const data = new Message(message);
            const result = await data.save();
            return this.createMsgObject(result);
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    transformMessages(messages, isToday=false){
        return messages.map((msg, index) => 
            this.createMsgObject(msg, 
                (index === 0 
                ? (isToday ? 'Today' : this.getDate(msg.createdAt))
                : undefined)
            )
        );
    }

    async getMessagesByRange(roomId, startDate, endDate){
        try {
            const finded = await Message.find({
                roomId,
                createdAt: {
                    $gt: startDate,
                    $lt: endDate
                }
            });
            return this.transformMessages(finded);
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getTodayMessages(roomId){
        try {
            const date = new Date();
            date.setDate(date.getDate() - 1);
            const finded = await Message.find({
                roomId,
                createdAt: {$gt: date}
            });
            return this.transformMessages(finded, true);
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

export default new Room();