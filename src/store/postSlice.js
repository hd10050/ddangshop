import { configureStore, createSlice } from '@reduxjs/toolkit'

/**
 * 주소 정보
 */
let post = createSlice({
    name: 'post',
    initialState: null,
    reducers: {
        setPost(state, action) {
            return action.payload;
        }
    }
})
export let { setPost } = post.actions

export default post;
