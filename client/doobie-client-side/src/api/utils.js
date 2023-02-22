import axios from "axios";

axios.defaults.withCredentials = true;


// //**
//  * 
//  * @param {str} name -- name of query param we want to get
//  * @returns value associated with the query param we want
//  */
export const getQueryParam = (name) => {
    const params = new URLSearchParams(window.location.search);
    if(params.has(name)){
        return params.get(name);
    }else{
        return "";
    }
}


// //**
//  * 
//  * @param {*} length -- desired length of the random string
//  * @returns 
//  */
export const getRandomString = (length) => {
    const letters = [];
    const hex = '0123456789abcdef';
    for (let index = 0; index < length; index++) {
        letters[index] = hex[Math.floor(Math.random() * hex.length)];
    }
    return letters.join("");
}




