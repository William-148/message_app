import Control from "./Control";
import api from "../Config/Api";
const { AUTH } = api;

class User extends Control{
    ITEM_USER = "user";

    async signUp(user){
        const {status, content} = await this.request('PORT', AUTH.signup, user);
        if(status === 500) return this.ERROR500;
        if(status >= 400) return {...content, success:false};
        return {...content, success:true};
    }

    async signIn(credentials){
        const {status, content} = await this.request('POST', AUTH.signin, credentials);
        if(status === 500) return this.ERROR500;
        if(status >= 400) return {...content, success:false};
        //Saving user data in localstorage
        this.setItem(this.ITEM_USER, content.data);
        return {...content, success:true};
    }

    getUser(){
        return this.getItem(this.ITEM_USER);
    }

    removeUser(){
        this.deleteItem(this.ITEM_USER);
    }

}

const USER = new User();
export default USER;