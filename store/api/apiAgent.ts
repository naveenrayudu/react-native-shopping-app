import { IFireStorePostResponse, IFireStoreGetResponse } from "../../models/firestore";
import { ADD_NEW_PRODUCT } from "../actions/types";

const URI = 'https://mob-shopping-app.firebaseio.com/';

const Post = async <T>(url: any, data: T) => {
    try {
        const response = await fetch(`${URI}/${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if(!response.ok)
            return Promise.reject('Error occured while fetching results');

        const responseData: IFireStorePostResponse<string> = await response.json();
        return Promise.resolve(responseData);
    
    } catch (error) {
        return Promise.reject(error);
    }
}

const Get = async <T>(url: any) => {
    try {
        const response = await fetch(`${URI}/${url}`);

        if(!response.ok)
        return Promise.reject('Error occured while fetching results');

        const responseData: IFireStoreGetResponse<T> = await response.json();
        return Promise.resolve(responseData);
    
    } catch (error) {
        return Promise.reject(error);
    }
}


const Patch = async <T>(url: any, data: T) => {
    try {
        const response = await fetch(`${URI}/${url}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if(!response.ok)
       return Promise.reject('Error occured while updating results');

    const responseData: IFireStorePostResponse<string> = await response.json();
    return Promise.resolve(responseData);
    
    } catch (error) {
        return Promise.reject(error);
    }
}

const Delete = async <T>(url: any) => {
    try {
        const response = await fetch(`${URI}/${url}`, {
            method: 'DELETE'
        });

        if(!response || !response.ok){
            return Promise.reject('Error occured while fetching results');
        }

        const responseData: IFireStorePostResponse<string> = await response.json();
        return Promise.resolve(responseData);
    
    } catch (error) {
        return Promise.resolve(error);
    }
}



const API = {
    post: Post,
    get: Get,
    patch: Patch,
    delete: Delete
}


export default API;

