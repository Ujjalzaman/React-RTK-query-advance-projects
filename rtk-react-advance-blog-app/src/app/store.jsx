import { configureStore } from '@reduxjs/toolkit'
import blogReducer from '../features/Blog/BlogSlice';
import singleblogReducer from '../features/singleBlog/singleBlogSlice';
import relatedBlogsReducer from '../features/RelatedBlogs/relatedBlogsSlice';

export const store = configureStore({
    reducer:{
        blogs: blogReducer,
        blog: singleblogReducer,
        relatedBlogs: relatedBlogsReducer
    },
})