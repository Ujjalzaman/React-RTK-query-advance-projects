const { configureStore, getDefaultMiddleware } = require("@reduxjs/toolkit");
const fetchDataSlice = require('../features/fetchDataslice/fetchDataSlice');
const { createLogger } = require("redux-logger");

const logger = createLogger();
const store = configureStore({
    reducer: {
        videos: fetchDataSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})
module.exports = store;