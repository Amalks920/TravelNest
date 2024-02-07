import { createSlice } from "@reduxjs/toolkit";

const initialState={
    searchResult:[],
    isSearchBarOpen:false,
    priceRange:{},
    location:'',
    checkIn:'',
    checkOut:'',
    roomType:''
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
        },
        updateRoomType:(state,action)=>{
            state.roomType=action.payload
        },
        updateSearchResult:(state,action)=>{
            state.searchResult=action.payload
        },
        updatePriceRange:(state,action)=>{
            console.log(action.payload)
            state.priceRange=action.payload;
        }
    }

})

export const selectIsSearchBarOpen=(state)=>state.persistedSlice.search.isSearchBarOpen;
export const selectLocation=(state)=>state.persistedSlice.search.location;
export const selectCheckIn=(state)=>state.persistedSlice.search.checkIn;
export const selectCheckOut=(state)=>state.persistedSlice.search.checkOut;
export const selectRoomType=(state)=>state.persistedSlice.search.roomType;
export const selectSearchResult=(state)=>state.persistedSlice.search.searchResult;
export const selectPriceRange=(state)=>state.persistedSlice.search.priceRange;
export default searchSlice.reducer
export const {updateIsSearchBarOpen,updateLocation,updateCheckIn,
              updateCheckOut,updateRoomType,updateSearchResult,updatePriceRange}=searchSlice.actions