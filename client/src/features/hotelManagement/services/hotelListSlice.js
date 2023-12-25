import { createSlice } from "@reduxjs/toolkit";



const hotelListSlice=createSlice({

    name:'hotels',
    initialState:{
        hotels:{}
    },
    reducers:{
        addHotels:(state,action)=>{
            state.hotels=action.payload
        }
    }

})


export const {addHotels}=hotelListSlice.actions
export const selectHotelById=(state,id)=>state?.persistedSlice?.hotels?.hotels?.filter(hotel=>hotel._id===id);
export default hotelListSlice.reducer