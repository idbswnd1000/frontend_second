import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { userLoginApi, userRegisterApi } from "../apis/user.api"

export const userLoginSlice = createAsyncThunk(
    "userLoginSlice",
    async (userObj, thunkApi) => {
        try {
            const user = await userLoginApi(userObj)
            localStorage.setItem("user", JSON.stringify(user))
            return user
        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

export const getUser = () => {
    return JSON.parse(localStorage.getItem("user"))
}

export const userRegisterSlice = createAsyncThunk(
    "userRegisterSlice",
    async (userObj, thunkApi) => {
        try {
            const user = await userRegisterApi(userObj)
            return user
        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

export const userLogoutSlice = createAsyncThunk(
    "userLogoutSlice",
    async (_, thunkApi) => {
        try {
            localStorage.removeItem("user")
            return true
        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

const initialState = {
    userList: [],
    user: {},
    isLogin: false,
    loading: false,
    error: null
}

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(userLoginSlice.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(userLoginSlice.fulfilled, (state, action) => {
                if (!action.payload || !action.payload.username) {
                    state.isLogin = false
                    state.user = {}
                    return
                }
                state.user = action.payload
                state.isLogin = true
                state.loading = false
            })
            .addCase(userLoginSlice.rejected, (state, action) => {
                state.loading = false
                state.isLogin = false
                state.user = {}
                state.error = action.payload
            })
            .addCase(userRegisterSlice.fulfilled, (state, action) => {
                state.userList = [
                    ...state.userList,
                    action.payload
                ]
                state.isLogin = false
                state.loading = false
            })
            .addCase(userLogoutSlice.fulfilled, (state, action) => {
                state.user = {}
                state.isLogin = false
                state.loading = false
            })
    }
})

export default userSlice.reducer;