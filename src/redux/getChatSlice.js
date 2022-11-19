import { createSlice } from '@reduxjs/toolkit'

export const getChatSLice = createSlice({
    name: 'getChat',
    initialState: {
        friendId:'',
        openChatBox:false
    },
    reducers: {
        getChatReducer: (state,action) => {
            state.friendId =action.payload
           
        },
        openChatBoxReducer: (state,action) => {
            state.openChatBox =action.payload
        }

    }

})


export const { getChatReducer,openChatBoxReducer} = getChatSLice.actions

export default getChatSLice.reducer