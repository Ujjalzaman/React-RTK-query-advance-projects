const { createSlice } = require("@reduxjs/toolkit")
const {counterSliceActions} = require('../counter/counterSlice');
const initialState = {
    count: 0,
}

const dynamicCounterSlice = createSlice({
    name: 'dynamicCounter',
    initialState,
    reducers: {
        dynamiceIncrement : (state,action) =>{
            state.count += action.payload
        },
        dynamiceDecrement : (state, action) =>{
            state.count -= action.payload
        }
    },
    extraReducers: (builder) =>{
        builder.addCase(counterSliceActions.increment, (state, action) =>{
            state.count += 1
        })
    }
})

module.exports = dynamicCounterSlice.reducer;
module.exports.dynamicCounterSliceActions = dynamicCounterSlice.actions;