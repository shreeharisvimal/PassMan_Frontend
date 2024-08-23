import {createSlice} from '@reduxjs/toolkit'

const UserDetails = createSlice({
    name:'user_details',
    initialState:{
        credential:null,
        user_id:null,
    },
    reducers:{
        get_UserDetails:(state,action)=>{
            state.credential = action.payload.credential
            state.user_id = action.payload.user_id
        }
    }
})

export const   {get_UserDetails} = UserDetails.actions
export default UserDetails.reducer