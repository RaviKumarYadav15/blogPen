import {configureStore } from '@reduxjs/toolkit'
import commentReducer from '../features/comments/comment.slice';
import blogReducer from '../features/blog/blog.slice.js'
import adminReducer from '../features/admin/admin.slice.js'
const store = configureStore({
    reducer:{
        comment: commentReducer,
        blog: blogReducer,
        admin: adminReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export default store;