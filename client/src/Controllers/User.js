import Control from "./Control";
import {AUTH} from "@/Config/Api.js";

class User extends Control{
    ITEM_USER = "user";

    async signUp(user){
        const {status, content} = await this.request('POST', AUTH.signup, user);
        if(status === 500) return this.ERROR500;
        if(status >= 400) return {...content, success:false};
        return {...content, success:true};
    }

    async signIn(credentials){
        const {status, content} = await this.request('POST', AUTH.signin, credentials);
        if(status === 500) return this.ERROR500;
        if(status >= 400) return {...content, success:false};
        //Saving user data in localstorage
        this.saveLocalUser(content.data);
        return {...content, success:true};
    }

    async update(user){
        const {status, content} = await this.request('PUT', AUTH.update, user);
        if(status === 500) return this.ERROR500;
        if(status >= 400) return {...content, success:false};
        return {...content, success:true};
    }

    saveLocalUser(user){
        //Saving user data in localstorage
        this.setItem(this.ITEM_USER, user);
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