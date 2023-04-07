const { INCREMENT, DECREMENT, REQUESTED,SUCCED,FAILED,LOADED } = require("./actionType");

const increment = () =>{
    return {
        type: INCREMENT
    }
}
const decrement = () =>{
    return {
        type: DECREMENT
    }
}
const request = () =>{
    return {
        type: REQUESTED
    }
}
const success = (posts) =>{
    return {
        type: SUCCED,
        payload: posts
    }
}
const failed = (error) =>{
    return {
        type: FAILED,
        payload: error
    }
}

module.exports = {
    increment,
    decrement,request,success,failed
}