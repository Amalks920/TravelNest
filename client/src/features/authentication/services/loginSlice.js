import { createSlice } from "@reduxjs/toolkit";


const authSlice=createSlice({
    name:'auth',
    initialState:{
        user:{},
        admin:{},
        owner:{},
        
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
export const selectToken=(state)=>state?.persistedSlice.auth?.user?.accessToken;
export const selectRole=(state)=>state?.persistedSlice.auth?.user?.role;
export const selectUserId=(state)=>state?.persistedSlice.auth.user.user_id;
export default authSlice.reducer;