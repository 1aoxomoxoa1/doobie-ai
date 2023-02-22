// //**
//  * 
//  * @param {*} length -- desired length of the random string
//  * @returns 
//  */
const getRandomString = (length) => {
    const letters = [];
    const hex = '0123456789abcdef';
    for (let index = 0; index < length; index++) {
        letters[index] = hex[Math.floor(Math.random() * hex.length)];
    }
    return letters.join("");
}


module.exports = {getRandomString}