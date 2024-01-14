import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice:0,
  price: 0,
  checkIn:null,
  checkOut:null,
  noOfRooms: 0,
  totalNoOfRooms:0,
  isModalOpen: false,
  room_id:null,
  hotel_id:null,
  checkedRoomIds: [],
};

const priceSlice = createSlice({
  name: "price",
  initialState,
  reducers: {
    updatePrice: (state, action) => {
      state.price = action.payload;
    },
    updateNoOfRooms: (state, action) => {
      state.totalNoOfRooms+=action.payload
      state.noOfRooms = action.payload;
    },
    updateIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
    insertCheckedRoomId: (state, action) => {
      console.log(action.payload.noOfRooms)
      state.totalPrice+=action.payload.price*Number(action.payload.noOfRooms)
      state.checkedRoomIds.push(action.payload);
    },
    removeUnCheckedRoomId: (state, action) => {
      const id = action.payload;
      const indexToDelete = state.checkedRoomIds.findIndex((el) => el === id);
      const priceToMinus=state.checkedRoomIds[indexToDelete].price*state.checkedRoomIds[indexToDelete].noOfRooms
      state.totalPrice-=priceToMinus
      state.checkedRoomIds.splice(indexToDelete, 1);
    },
    updateRoomId:(state,action)=>{
        state.room_id=action.payload
    },
    updateHotelId:(state,action)=>{
      state.hotel_id=action.payload
    },
    updateRoomPrice:(state,action)=>{
      state.price=action.payload
    },

    updateCheckIn:(state,action)=>{
      state.checkIn=action.payload
    },
    updateCheckOut:(state,action)=>{
      state.checkOut=action.payload
    },
    // updateTotalNoOfRooms:(state,action)=>{
    //   state.totalNoOfRooms=action.payload
    // }
  },
});

export default priceSlice.reducer;
export const selectPrice = (state) => state.priceSlice.price;
export const selectCheckedRooms = (state) => state.priceSlice.checkedRoomIds;
export const selectCheckedRoomById = (state, id) => state.priceSlice.checkedRoomIds.find((el) => el.id=== id);
export const selectNoOfRooms = (state) => state.priceSlice.noOfRooms;
export const selectIsModalOpen = (state) => state.priceSlice.isModalOpen;
export const selectRoomId= (state) => state.priceSlice.room_id
export const selectTotalPrice= (state) => state.priceSlice.totalPrice
export const selectCheckIn= (state) => state.priceSlice.checkIn
export const selectCheckOut= (state) =>state.priceSlice.checkOut
export const selectHotelId= (state) =>state.priceSlice.hotel_id
export const selectTotalNumberOfRoom= (state) =>state.priceSlice.totalNoOfRooms

export const {
  updateIsModalOpen,
  updateNoOfRooms,
  updatePrice,
  insertCheckedRoomId,
  removeUnCheckedRoomId,
  updateRoomId,updateCheckIn,
  updateCheckOut,updateHotelId
} = priceSlice.actions;
