const { INCREMENT, DECREMENT, SUCCED, REQUESTED, FAILED } = require("./actionType");

const initialState = {
    count: 0,
    loading: false,
    posts: [],
    error: ''
}

const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case INCREMENT:
            return {
                ...state,
                count: state.count + 1
            }
        case DECREMENT:
            return {
                ...state,
                count: state.count - 1
            }
        case REQUESTED:
            return {
                ...state,
                loading: true,
                error: '',
            }
        case SUCCED:
            return {
                ...state,
                loading: false,
                posts: action.payload,
                error: ''
            }
        case FAILED:
            return{
                ...state,
                loading: false,
                posts: [],
                error: action.payload.message
        }
        default:
            return state;
    }
}

module.exports = counterReducer;