import { configureStore } from '@reduxjs/toolkit'
import auth from './Slices/AuthSlice'
import usersData from './Slices/UserSlice'
import Todo from './Slices/TodoSlice'

export const store = configureStore({
    reducer: {
        auth: auth,
        users: usersData,
        todo: Todo,
    }
})
