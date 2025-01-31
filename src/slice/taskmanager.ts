import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


type Task ={
    id:string;
    completed:boolean;
    title: string;
}


const API_URL = "https://jsonplaceholder.typicode.com/todos"

export const FetchTasks = createAsyncThunk("Task/todo", async()=>{
 const response = await axios.get<Task[]>(`${API_URL}?_limit=5`)
 return response.data
})

export  const AddTask = createAsyncThunk("Task/AddTask", async (title:string)=> {
    const response = await axios.post<Task>(API_URL, {title, completed:false})
    return response.data
})

export const DeleteTask = createAsyncThunk("Task/deleteTask", async(id:string) => {
await axios.delete(`${API_URL}/${id}`)
  return id
})

export const CompleteTask =createAsyncThunk("Task/completeTask", async(id:string) => {
    const response = await axios.patch(`${API_URL}/${id}`, {completed:true})
    return response.data
} )

type InitialState = {
    tasks: Task[],
    loading:boolean,
    error:string | null
}


const initialstate :InitialState  = {
    tasks: [],
    loading: false,
    error: null
}


const Taskslice = createSlice({
    name: "tasks",
    initialState:initialstate,
    reducers: {}, 
    extraReducers: (builder) => {
        builder.addCase(FetchTasks.pending, (state)=> {state.loading = true})
        builder.addCase(FetchTasks.fulfilled, (state, action)=> {
            state.loading = false,
            state.tasks = action.payload
        })
        builder.addCase(FetchTasks.rejected, (state, action)=> {state.error = action.error.message || "something went wrong"})
        builder.addCase(AddTask.fulfilled, (state, action)=> {
            state.tasks.push(action.payload)
        })

        builder.addCase(DeleteTask.fulfilled, (state, action)=>{
            state.tasks = state.tasks.filter((task)=> task.id !== action.payload)
        })

        builder.addCase(CompleteTask.fulfilled,(state, action)=>{
            const index = state.tasks.findIndex((task)=> task.id === action.payload.id)
            if(index !== -1) state.tasks[index].completed = true
        } )
    }
})

export default Taskslice.reducer
