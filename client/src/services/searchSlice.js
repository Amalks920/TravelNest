import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isSearchBarOpen:false,
    location:'',
    checkIn:'',
    checkOut:''
}

const searchSlice=createSlice({
    name:'search',
    initialState,

    reducers:{
        updateIsSearchBarOpen:(state,action)=>{
            state.isSearchBarOpen=action.payload
        },

        updateLocation:(state,action)=>{
            state.location=action.payload
        },
        updateCheckIn:(state,action)=>{
            state.checkIn=action.payload
        },
        updateCheckOut:(state,action)=>{
            state.checkOut=action.payload
        }
    }

})

export const selectIsSearchBarOpen=(state)=>state.search.isSearchBarOpen;
export const selectLocation=(state)=>state.search.location;
export const selectCheckIn=(state)=>state.search.checkIn;
export const selectCheckOut=(state)=>state.search.checkOut;

export default searchSlice.reducer
export const {updateIsSearchBarOpen,updateLocation,updateCheckIn,updateCheckOut}=searchSlice.actions