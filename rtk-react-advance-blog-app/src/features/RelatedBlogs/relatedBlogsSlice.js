import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { relatedBlogsApi } from "./relatedBlogsApi"

const initialState = {
    error: '',
    isError: false,
    isLoading: false,
    relatedBlogs: [],
}
export const getRelatedBlogsApiAsync = createAsyncThunk(
    'relatedBlogs/getRelatedBlogsApi',
    async ({tags, id}) => {
        const relatedBlogs = await relatedBlogsApi(tags, id);
        return relatedBlogs;
    }
);

const relatedBlogsSlice = createSlice({
    name: 'relateBlogs',
    initialState,
    extraReducers:(builder) =>{
        builder.addCase(getRelatedBlogsApiAsync.pending, (state) =>{
            state.isError = false;
            state.isLoading = true;
        })
        builder.addCase(getRelatedBlogsApiAsync.fulfilled, (state, action) =>{
            state.isError = false;
            state.isLoading = false;
            state.relatedBlogs = action.payload;
            state.error = '';
        })
        builder.addCase(getRelatedBlogsApiAsync.rejected, (state, action) =>{
            state.isError = true;
            state.isLoading = false;
            state.relatedBlogs = action.payload;
            state.error = action.error?.message;
        })
    }
})
export default relatedBlogsSlice.reducer;