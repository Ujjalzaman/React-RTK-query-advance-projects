const {configureStore, getDefaultMiddleware } = require('@reduxjs/toolkit');
const {createLogger}  = require('redux-logger');
const counterSlice = require('../features/counter/counterSlice');
const dynamicCounterSlice = require('../features/dynamicCounter/dynamicCounter');
const postSlice = require('../features/postSlice/postSlice');
const logger = createLogger();
const store = configureStore({
    reducer: {
        counter: counterSlice,
        dynamiceCounter: dynamicCounterSlice,
        posts: postSlice
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger)
})

module.exports = store;