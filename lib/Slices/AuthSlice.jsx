import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { destroyCookie, parseCookies } from "nookies";

// 1*24*60*60*1000 = Day*Hours*Minute*Second*Milliseconds
const expires = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toUTCString()
const api = `https://657019a209586eff6640b53c.mockapi.io/Register`

const initialState = {
    user: {},
    isAuth: false,
    isLoading: true,
    role: null,
}

export const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setInitialData: (state, action) => {
            const { role } = action.payload
            state.user = action.payload
            state.isAuth = true
            state.role = role
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload
        },
        logOut: (state) => {
            destroyCookie(null, 'token')
            destroyCookie(null, 'role')
            state.user = {}
            state.isAuth = false
            state.isLoading = false
            state.role = null
            state.isError = null
        },
        logIn: (state, action) => {
            const { role, email } = action.payload
            state.user = action.payload
            state.isAuth = true
            state.role = role
            document.cookie = `token=${btoa(email)}; expires=${expires}; path=/`
            document.cookie = `role=${btoa(role)}; expires=${expires}; path=/`
        },
    }
})

export const {
    setInitialData,
    setLoading,
    logOut,
    logIn,
} = auth.actions
export default auth.reducer

export const initialData = () => async (dispatch) => {
    try {
        const cookies = parseCookies()
        if (cookies.token !== '' && cookies.token !== undefined) {
            const token = atob(cookies?.token)
            const role = atob(cookies?.role)
            // console.log(`Geting Data`);
            const res = await axios.get(api)
            const filterUser = res.data.filter((users) => users.email === token)
            if (filterUser.length !== 0 && role === filterUser[0].role) {
                dispatch(setInitialData(filterUser[0]))
            } else {
                dispatch(logOut())
            }
        }
    } finally {
        dispatch(setLoading(false))
    }
}