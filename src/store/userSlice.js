import { configureStore, createSlice } from '@reduxjs/toolkit'

/**
 * 유저 정보
 */
let user = createSlice({
    name: 'user',
    initialState: 'song',
    reducers: {
        changeName(state){
            return 'change ' + state; 
        }
    }
})
export let { changeName } = user.actions

export default user;