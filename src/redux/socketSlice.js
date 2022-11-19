import { createSlice } from '@reduxjs/toolkit'

export const SocketSLice = createSlice({
    name: 'socket',
    initialState: {
        socket:{}
    },
    reducers: {
        socketReducer: (state,action) => {
            state.socket =action.payload
        }

    }

})


export const { socketReducer} = SocketSLice.actions

export default SocketSLice.reducer