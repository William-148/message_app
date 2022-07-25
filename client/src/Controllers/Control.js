
export default class Control{

    async request(method, url, data=undefined){
        const headers = {
            Accept: '*/*',
            'Content-Type': 'application/json',
        }
        /**
        if(sendToken){
            const data = await this.getData();
            headers['Authorization'] = `Bearer ${data.token}`
        }
        */
        try{
            const response = await fetch(url, {
                method: method,
                headers,
                body: JSON.stringify(data)
            })
            return {status: response.status, content: await response.json()};
        }
        catch(error){
            console.error(error);
            return {status: 500}
        }
    }

    getItem(itemName){
        return JSON.parse(localStorage.getItem(itemName));
    }

    setItem(itemName, data){
        localStorage.setItem(itemName, JSON.stringify(data));
    }

    deleteItem(itemName){
        localStorage.removeItem(itemName);
    }
}
