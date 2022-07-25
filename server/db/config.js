//mongodb+srv://willadmin:<password>@cluster0.y0anvk8.mongodb.net/?retryWrites=true&w=majority
import mongoose from 'mongoose';

export const connectDB = async () => {
    try{
        const { CONNECTION_STRING } = process.env;
        await mongoose.connect(CONNECTION_STRING);
        console.log('Connect succefull')
    }catch(error){
        console.log(error);
    }
}