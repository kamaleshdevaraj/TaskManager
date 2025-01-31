import { configureStore } from "@reduxjs/toolkit";
import TaskReducer from "../slice/taskmanager"


export const store = configureStore({
    reducer :{
      Task : TaskReducer  
    }
})

export type RootState =ReturnType< typeof store.getState>
export type AppDispatch = typeof store.dispatch