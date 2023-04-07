const { combineReducers, applyMiddleware } = require("redux");
const { createStore } = require("redux");
const {logger} = require('redux-logger');
const counterReducer = require("./counter/reducer");
const thunnkMiddleware = require('redux-thunk')

const rootReducer = combineReducers({
    counter : counterReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunnkMiddleware.default, logger));
module.exports = store;