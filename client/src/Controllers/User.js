import Control from "./Control";
import api from "../Config/Api";
const { AUTH } = api;

class User extends Control{
    ITEM_USER = "user";

    async signIn(email, password){
        const {status, content} = await this.request('POST', AUTH.signin, {email, password});
        if(status === 500) return "Un error ha ocurrido, intente mas tarde";
        if(status >= 400) return content;
        //Saving user data in localstorage
        this.setItem(this.ITEM_USER, content.data);
        return content;
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