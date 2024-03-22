import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'Feed',
    initialState: {
        user:{
            name:'',
            picture:'',
            userId:'',
            lastName:'',
            DOB:'',
            bio:'',
            followersCount:'',
            followingCount:'',
        }
    },
    reducers: {
        userReducer: (state,action) => {
           let data= JSON.parse(localStorage.getItem('Tether'))
           
            state.user ={
                name:data?.name,
                lastName:data?.lastName,
                DOB:data?.DOB,
                bio:data?.bio,
                picture:data?.picture,
                userId:data?.userId,
                followersCount:data?.followers,
                followingCount:data?.following,
            }
        }

    }

})


export const { userReducer} = userSlice.actions

export default userSlice.reducer