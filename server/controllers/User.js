import UserModel from "../models/User.js";
import CryptoJS  from "crypto-js";
import '../config.js'

const { SECRET_KEY } = process.env;

class User{
    async signUp(user){
        let status = 400;
        let msg = "User already registered.";
        try{
            const finded = await UserModel.findOne({email:user.email});
            if(!!finded) return { status, msg }
            user['password'] = CryptoJS.AES.encrypt(user.password, SECRET_KEY).toString();
            const userModel = new UserModel(user);
            await userModel.save();
            status = 201;
            msg = "User has been created."
        }catch(error){
            status = 500;
            msg = error.message
            console.error(error);
        }
        return { status, msg }
    }

    async signIn(user){
        const {email, password} = user;
        try{
            const finded = await UserModel.findOne({email});
            if(!finded) return { 
                status:404, 
                msg: "User doesn't exist or incorrect."
            }
            if(!this.passIsCorrect(password, finded.password)) 
            return { 
                status: 400, 
                msg: "Password is incorrect."
            }
            
            const{_id, name, nickname, photo, state} = finded;
            return { 
                status:200, 
                msg:"Successful sign in.",
                data: {_id, name, nickname, photo, state, email: finded.email}
            }
        }catch(error){
            console.error(error);
            return {status:500, msg: error.message}
        }
    }

    passIsCorrect(password, hidden){
        const decrypt = CryptoJS.AES.decrypt(hidden, SECRET_KEY).toString(CryptoJS.enc.Utf8);
        return decrypt == password
    }
}

export default new User();