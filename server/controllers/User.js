import UserModel from "../models/User.js";
import CryptoJS  from "crypto-js";
import '../config.js'

const { SECRET_KEY } = process.env;

class User{

    /**
     * Encrypt a text passed by param
     * @param {string} data 
     * @returns {string} encripted text
     */
    encrypt(data){
        return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
    }

    async signUp(user){
        let status = 400;
        let msg = "User already registered.";
        try{
            const finded = await UserModel.findOne({email:user.email});
            if(!!finded) return { status, msg }
            // Encrypt password
            user['password'] = this.encrypt(user.password);
            // Encrypt googleId
            if(!!user.keyAuth) user.keyAuth = this.encrypt(user.keyAuth);
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
        const { email, password, keyAuth } = user;
        try{
            const finded = await UserModel.findOne({email});
            if(!finded) return { 
                status: 404, 
                msg: "User doesn't exist or incorrect."
            }

            if(!!password)
            if(!this.passIsCorrect(password, finded.password)) 
            return { 
                status: 400, 
                msg: "Password is incorrect."
            }
            
            if(!!keyAuth)
            if(!this.passIsCorrect(keyAuth, finded.keyAuth)) 
            return { 
                status: 400, 
                msg: "Key auth is incorrect."
            }

            const{_id, name, nickname, photo, state} = finded;
            return { 
                status: 200, 
                msg: "Successful sign in.",
                data: { _id, name, nickname, photo, state, email: finded.email }
            }
        }catch(error){
            console.error(error);
            return {status:500, msg: error.message}
        }
    }

    async update(user){
        try {
            const { _id, email, ...toUpdate } = user;
            if(!!email) return { status: 400, msg: "Email can't be updated." }
            if(!!toUpdate.password){
                toUpdate.password = CryptoJS.AES.encrypt(toUpdate.password, SECRET_KEY).toString();
            }
            
            const result = await UserModel.updateOne({_id}, toUpdate);

            if(result?.matchedCount === 1) return {
                status: 200,
                msg: "The field was updated."
            }

            return {
                status: 400,
                msg: "Could not update."
            }
        } catch (error) {
            console.error(error);
            return { status: 500, msg: error.message }
        }
    }

    passIsCorrect(password, hidden){
        if(!hidden) return false;
        const decrypt = CryptoJS.AES.decrypt(hidden, SECRET_KEY).toString(CryptoJS.enc.Utf8);
        return decrypt == password
    }
}

export default new User();