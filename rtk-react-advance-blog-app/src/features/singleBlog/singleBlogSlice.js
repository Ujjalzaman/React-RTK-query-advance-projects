import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { singleBlogApi } from "./singleBlogApi"

const initialState = {
    error: '',
    isError: false,
    isLoading: false,
    blog: {},
}
export const getBlogApiAsync = createAsyncThunk(
    'blogs/getBlogApi',
    async (id) => {
        const blog = await singleBlogApi(id);
        return blog;
    }
);

const singleblogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        postSaved: (state, action) => {
            state.blog.isSaved = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getBlogApiAsync.pending, (state) => {
            state.isError = false;
            state.isLoading = true;
        })
        builder.addCase(getBlogApiAsync.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.blog = action.payload;
            state.error = '';
        })
        builder.addCase(getBlogApiAsync.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.blog = action.payload;
            state.error = action.error?.message;
        })
    }
})
export default singleblogSlice.reducer;
export const { postSaved } = singleblogSlice.actions;