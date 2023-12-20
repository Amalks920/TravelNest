import { createSlice } from "@reduxjs/toolkit";


const authSlice=createSlice({
    name:'auth',
    initialState:{
        user:{}
    },
    reducers:{
        setCredentials:(state,action)=>{
            const user=action.payload;
            state.user=user
        },
        logout:(state,action)=>{
            state.user={}
        }
    }
})


export const {setCredentials,logout}=authSlice.actions;
export default authSlice.reducer;