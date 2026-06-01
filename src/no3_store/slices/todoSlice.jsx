import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import {
    todoAllGetApi,
    todoDeleteApi,
    todoGetApi,
    todoPostApi,
    todoPutApi
} from "../apis/todo.api";


const initialObj = {
    id: "",
    subject: "",
    checked: false
}

const initialState = {
    todoList: [],
    todoObj: {
        id: "",
        subject: "",
        checked: false
    },
    loading: false,
    error: null
}

export const todoAllGetSlice = createAsyncThunk(
    "todoAllGetSlice",
    async (_, thunkApi) => {
        try {
            return await todoAllGetApi();
        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

export const todoPostSlice = createAsyncThunk(
    "todoPostSlice",
    async (dataObj, thunkApi) => {
        try {
            return await todoPostApi(dataObj);
        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

export const todoPutSlice = createAsyncThunk(
    "todoPutSlice",
    async (dataObj, thunkApi) => {
        try {
            return await todoPutApi(dataObj);
        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

export const todoDeleteSlice = createAsyncThunk(
    "todoDeleteSlice",
    async (id, thunkApi) => {
        try {
            await todoDeleteApi(id);
            return id;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

export const todoToggleSlice = createAsyncThunk(
    "todoToggleSlice",
    async (id, thunkApi) => {
        try {
            await todoGetApi(id);
            return id;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

const todoSlice = createSlice({
    name: "todoSlice",
    initialState, // initialState:initialState
    reducers: {
        change: (state, action) => {
            state.todoObj = {
                ...state.todoObj,
                [action.payload.name]: action.payload.value
            }
        },
    }, extraReducers: (builder) => {
        builder
            .addCase(todoAllGetSlice.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(todoAllGetSlice.fulfilled, (state, action) => {
                state.todoList = action.payload
                state.loading = false
            })
            .addCase(todoAllGetSlice.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(todoPostSlice.fulfilled, (state, action) => {
                state.todoList = [
                    ...state.todoList,
                    action.payload
                ]
                state.todoObj = initialObj
                state.loading = false
            })
            .addCase(todoPutSlice.fulfilled, (state, action) => {
                state.todoList = state.todoList.map(todo =>
                    todo.id === action.payload.id
                        ? action.payload
                        : todo
                )
                state.loading = false
            })
            .addCase(todoDeleteSlice.fulfilled, (state, action) => {
                state.todoList = state.todoList.filter(todo =>
                    todo.id !== action.payload
                )
                state.loading = false
            })
            .addCase(todoToggleSlice.fulfilled, (state, action) => {
                state.todoList =  state.todoList.map(todo =>
                todo.id === action.payload
                    ? { ...todo, checked: !todo.checked }
                    : todo
            )
                state.loading = false
            })
    }
})

export const { remove, update, toggle, change, register } = todoSlice.actions;
export default todoSlice.reducer; 