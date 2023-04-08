import { createSlice } from "@reduxjs/toolkit"

const initalState = {
    blogs: [],
    isLoading: false,
    isError: false,
    error: '',
}
export const BlogSlice = createSlice({
    name:"blogs",
    initalState,
    reducers:{
        decrement: (state) => {
            return state
          },
    }
})
export default BlogSlice.reducer;