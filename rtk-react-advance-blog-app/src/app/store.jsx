import { configureStore } from '@reduxjs/toolkit'
import BlogReducer from '../features/Blog/BlogSlice';
export const store = configureStore({
    reducer: {
        Blogs: BlogReducer,
    }
    
})