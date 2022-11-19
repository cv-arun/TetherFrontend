import { createSlice } from '@reduxjs/toolkit'

export const refresh = createSlice({
    name: 'refresh',
    initialState: {
        refresh:false
    },
    reducers: {
        refreshReducer: (state,action) => {
            state.refresh =!state.refresh
        }

    }

})


export const { refreshReducer} = refresh.actions

export default refresh.reducer