import {createSlice} from '@reduxjs/toolkit';


const initialState = {}

const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        // userLoggedIn: (state, action) => {
        //     state.accesToke = action.pahyloadfdf
        //     state.user = action.somethinf;
        // }
    }
})

// export const {userLoggedIn} = projectSlice.actions
export default projectSlice.reducer;