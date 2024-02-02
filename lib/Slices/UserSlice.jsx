import axios from "axios";
import { createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";

const api = `https://657019a209586eff6640b53c.mockapi.io/Users`

const initialState = {
    user: [],
    isLoading: true,
    role: null,
}

const usersData = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.user = action.payload
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload
        },
        editUser: (state, action) => {
            const { id } = action.payload
            state.user = state.user.map((user) =>
                user.id === id ? { ...user, ...action.payload } : user
            )
        },
        deleteUser: (state, action) => {
            state.user = state.user.filter((user) => user.id !== action.payload)
        }
    }
})

export const {
    setUserData,
    setLoading,
    upDateUser,
    editUser,
    deleteUser,
} = usersData.actions
export default usersData.reducer

export const getUsers = () => async (dispatch) => {
    try {
        const res = await axios.get(api)
        dispatch(setUserData(res.data))
    } finally {
        dispatch(setLoading(false))
    }
}

export const deleteUserData = (id) => async (dispatch) => {
    dispatch(setLoading(true))
    try {
        await axios.delete(`${api}/${id}`)
        toast.success(`User Deleted Successfully`)
        dispatch(deleteUser(id))
    } finally {
        dispatch(setLoading(false))
    }
}