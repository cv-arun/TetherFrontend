import { createSlice } from '@reduxjs/toolkit'

export const feedSlice = createSlice({
    name: 'Feed',
    initialState: {
        openModal: false
    },
    reducers: {
        openReducer: (state,action) => {
            state.openModal = action.payload
        }

    }

})


export const { openReducer} = feedSlice.actions

export default feedSlice.reducer