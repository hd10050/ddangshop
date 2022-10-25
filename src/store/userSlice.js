import { configureStore, createSlice } from '@reduxjs/toolkit'

/**
 * 유저 정보
 */
let user = createSlice({
    name: 'auth',
    initialState: {
        userName: null,
        userEmail: "@",
        uid: null,
    },
    reducers: {
        setUserName(state, action) {
            state.userName = action.payload;
        },
        setUid(state, action) {
            state.uid = action.payload;
        },
        setUserEmail(state, action) {
            state.userEmail = action.payload;
        },
    }
})
export let { setUserName, setUid, setUserEmail } = user.actions

export default user;
