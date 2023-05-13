import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    projects: [],
    projectsName: [],
}
export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        addFilteringProjectsName: (state, action) => {
            const index = state.projectsName.indexOf(action.payload.name)
            if(index === -1){
                state.projectsName.push(action.payload.name)
            }else{
                state.projectsName.splice(action.payload.name, 1)
            }
        },
    }
})
export const {  addFilteringProjectsName } = filterSlice.actions;
export default filterSlice.reducer;