import RoomModel from "../models/Room.js";
import Message from "../models/Message.js";
import '../config.js'

class Room{
    LIMIT_MESSAGES = 20;

    getDateTime (timestamp){
        const date = new Date(timestamp);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return [
            this.getDate(date),
            `${hours}:${minutes > 9 ? minutes : '0' + minutes}`
        ]
    }

    isDateEqual(a, b){
        return a.getYear() === b.getYear() 
            && a.getMonth() === b.getMonth()
            && a.getDate() === b.getDate();

    }

    getDate (date){
        const now = new Date();
        if(this.isDateEqual(date, now)) return 'Today';
        now.setDate(now.getDate() - 1);
        if(this.isDateEqual(date, now)) return 'Yesterday';
        const month = date.getUTCMonth() + 1; //months from 1-12
        const day = date.getDate();
        const year = date.getUTCFullYear();
        return day + "/" + month + "/" + year;
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

    createMsgObject(msg, writter){
        const [date, time] = this.getDateTime(msg.createdAt);
        return {
            _id: '' + msg._id,
            writterId: msg.writterId,
            writter,
            message: msg.message,
            time,
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

    transformMessages(messages){
        let currentWritter = '', writter;
        const data = messages.map((msg) => {
            //date = writter = undefined;
            writter = undefined;
            if(currentWritter !== msg.writter){
                currentWritter = writter = msg.writter;
            }
            /*
            const msgDate = (""+msg.createdAt).substring(0, 16);
            if(currentDate !== msgDate){
                currentDate = msgDate;
                date = msg.createdAt;
            }
            */
            return this.createMsgObject(msg, writter)
        });
        return {
            messages: data,
            lastTimestamp: messages.length > 0 ? messages[0].createdAt : ''
        }
    }

    async getMessagesBelowDate(roomId, timestamp){
        try {
            const finded = await Message.find(
                {
                    roomId,
                    createdAt: {
                        //$gt: startDate,
                        $lt: timestamp
                    }
                },
                null,
                {
                    sort: {$natural: -1},
                    limit: this.LIMIT_MESSAGES
                }
            );
            finded.reverse();
            return this.transformMessages(finded);
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getFirstMessages(roomId){
        try {
            const finded = await Message.find(
                {roomId}, 
                null, 
                {
                    sort: {$natural: -1}, 
                    limit: this.LIMIT_MESSAGES,
                }
            );
            finded.reverse();
            return this.transformMessages(finded, true);
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

export default new Room();