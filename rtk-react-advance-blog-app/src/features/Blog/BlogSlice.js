import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { blogsApi } from "./blogApi"

const initialState = {
    error: '',
    isError: false,
    isLoading: false,
    blogs: [],
}
export const getBlogsApiAsync = createAsyncThunk(
    'blogs/getBlogsApi',
    async () => {
        const blogs = await blogsApi();
        return blogs;
    }
);

const blogsSlice = createSlice({
    name: 'blogs',
    initialState,
    extraReducers:(builder) =>{
        builder.addCase(getBlogsApiAsync.pending, (state) =>{
            state.isError = false;
            state.isLoading = true;
        })
        builder.addCase(getBlogsApiAsync.fulfilled, (state, action) =>{
            state.isError = false;
            state.isLoading = false;
            state.blogs = action.payload;
            state.error = '';
        })
        builder.addCase(getBlogsApiAsync.rejected, (state, action) =>{
            state.isError = true;
            state.isLoading = false;
            state.blogs = action.payload;
            state.error = action.error?.message;
        })
    }
})
export default blogsSlice.reducer;