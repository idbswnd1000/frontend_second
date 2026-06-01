import { createSlice } from "@reduxjs/toolkit"

const initialEmps = [
    { id: "1", name: "John", email: "john@example.com", job: "frontend", pay: 600 },
    { id: "2", name: "Peter", email: "peter@example.com", job: "backend", pay: 600 },
    { id: "3", name: "Susan", email: "susan@example.com", job: "db", pay: 600 },
    { id: "4", name: "Sue", email: "sue@example.com", job: "ai", pay: 600 },
]
const initialEmp = {
    id: '', name: '', email: '', job: '', pay: ''
}
const initialState = {
    empTable: initialEmps,
    emp: initialEmp,
    mode: '',
    selectedId: ""
}

const employeeSlice = createSlice({
    name: "employeeSlice",
    initialState,
    reducers: {
        select: (state, action) => {
            state.selectedId = action.payload
        },
        setEmp: (state, action) => {
            state.emp = action.payload
        },
        register: (state, action) => {
            state.empTable = [
                ...state.empTable,
                {
                    ...action.payload.emp,
                    id: action.payload.newId
                }

            ]
        },
        update: (state, action) => {
            state.empTable = state.empTable.map(item =>
                item.id === state.selectedId ?
                    action.payload : item
            )
        },
        remove: (state, action) => {
            state.empTable = state.empTable.filter(item =>
                item.id !== state.selectedId
            )
        },
        setMode: (state, action) => {
            state.mode = action.payload
        }
    }
})

export const { select, setEmp, register, update, remove, setMode } = employeeSlice.actions;
export default employeeSlice.reducer; 