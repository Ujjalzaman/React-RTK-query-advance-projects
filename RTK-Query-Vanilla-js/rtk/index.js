const store = require("./app/store");
// const { counterActions } = require('./features/counter/counterSlice');
const { dynamicCounterSliceActions } = require('./features/dynamicCounter/dynamicCounter');
const {counterSliceActions} = require('./features/counter/counterSlice');
const { fetchPosts } = require("./features/postSlice/postSlice");

// action dispatch counter 
// store.dispatch(counterActions.increment());
// store.dispatch(counterActions.decrement());

//action dispatch extra reducer
// store.dispatch(counterSliceActions.increment());

//fetching data via middlware with the help of extra reducers
store.dispatch(fetchPosts())

//action dispatch dynamiccounter
// store.dispatch(dynamicCounterSliceActions.dynamiceIncrement(5));
// store.dispatch(dynamicCounterSliceActions.dynamiceDecrement(2));