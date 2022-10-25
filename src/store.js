import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice.js'

// let cartItm = createSlice({
//     name: 'cartItm',
//     initialState: [
//         { id: 0, name: 'White and Black', count: 2 },
//         { id: 2, name: 'Grey Yordan', count: 1 }
//     ],
//     reducers: {
//         /**
//          * 장바구니에 담긴 물건의 수량을 증가시키는 함수
//          * @param {*} state 
//          * @param {number} action 품목의 id
//          */
//         changeCount(state, action) {
//             let idx = state.findIndex((e) => e.id === action.payload);
//             if (idx >= 0)
//             {
//                 state[idx].count += 1;
//             }
//         },
        
//         /**
//          * 장바구니에 물건을 추가하는 함수
//          * @param {*} state 
//          * @param {object} action 
//          */
//         addItem(state, action) {
//             let idx = state.findIndex((e) => e.id === action.payload.id);
//             if (idx >= 0)
//             {
//                 state[idx].count += 1;
//             }
//             else
//             {
//                 let tempObj = {
//                     id : action.payload.id,
//                     name : action.payload.title,
//                     count : 1
//                 }
//                 state.push(tempObj);
//             }
//         },

//         /**
//          * 장바구니에 물건을 제거하는 함수
//          * @param {*} state 
//          * @param {number} action 
//          */
//          deleteItem(state, action) {
//             let idx = state.findIndex((e) => e.id === action.payload);
//             if (idx >= 0)
//             {
//                 state.splice(idx, 1);
//             }
//         }
//     }
// })
// export let { changeCount, addItem, deleteItem } = cartItm.actions

export default configureStore({
    reducer: {
        user: user.reducer
    }
}) 