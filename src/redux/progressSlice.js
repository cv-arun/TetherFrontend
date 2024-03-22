import { createSlice } from '@reduxjs/toolkit'

export const progress = createSlice({
    name: 'refresh',
    initialState: {
        progress:0
    },
    reducers: {
        progressReducer: (state,action) => {
            state.progress =action.payload
        }

    }

})


export const { progressReducer} = progress.actions

export default progress.reducer