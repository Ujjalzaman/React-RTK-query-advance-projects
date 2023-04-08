import { configureStore } from '@reduxjs/toolkit'
import blogReducer from '../features/Blog/BlogSlice';

export const store = configureStore({
    reducer:{
        blogs: blogReducer,
    },
})