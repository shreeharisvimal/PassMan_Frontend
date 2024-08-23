
import {configureStore} from '@reduxjs/toolkit'
import auth_slice from './UserSlice'

export const store = configureStore({
    reducer:{
        auth_user:auth_slice,
    }
})

