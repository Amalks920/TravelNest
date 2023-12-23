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
            console.log(state.user.role)
        },
        logout:(state,action)=>{
            state.user={}
        }
    }
})


export const {setCredentials,logout}=authSlice.actions;
export const selectToken=(state)=>state?.auth?.user?.accessToken;
export const selectRole=(state)=>state?.auth?.user?.role;
export default authSlice.reducer;