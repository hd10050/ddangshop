import { configureStore, createSlice } from '@reduxjs/toolkit'

/**
 * 유저 정보
 */
let user = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload;
        },
    }
    // initialState: {
    //     uid: null,
    //     userEmail: "@",
    //     userName: null,          
    // },
    // reducers: {
    //     setUid(state, action) {
    //         state.uid = action.payload;
    //     },
    //     setUserEmail(state, action) {
    //         state.userEmail = action.payload;
    //     },
    //     setUserName(state, action) {
    //         state.userName = action.payload;
    //     },
    // }
})
// export let { setUserName, setUid, setUserEmail } = user.actions
export let { setUser } = user.actions

export default user;
