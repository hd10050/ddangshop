import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice.js'
import post from './store/postSlice.js'

export default configureStore({
    reducer: {
        user: user.reducer,
        post: post.reducer,
    }
}) 