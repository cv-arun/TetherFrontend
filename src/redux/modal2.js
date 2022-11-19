import { createSlice } from '@reduxjs/toolkit'

export const openModal2 = createSlice({
    name: 'Notification',
    initialState: {
        openModal:{
            open:false,
            component:<>hello</>
        }
    },
    reducers: {
        openReducer: (state,action) => {
            state.openModal = action.payload
        },
        closeReducer:(state,action)=>{
            state.openModal.open=false
        }

    }

})


export const { openReducer,closeReducer} = openModal2.actions

export default openModal2.reducer