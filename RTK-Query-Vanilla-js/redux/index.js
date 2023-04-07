const { increment, decrement } = require("./counter/action");
const fetchPosts = require("./counter/thunk/fetchPosts");
const store = require("./store");

// console.log("hello")
// store.subscribe(() =>{
//     console.log(store.getState());
// })

store.dispatch(increment());
store.dispatch(decrement());
store.dispatch(fetchPosts());