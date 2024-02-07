import { createSlice,current } from "@reduxjs/toolkit";

const initialState = {
  totalPrice:0,
  price: 0,
  checkIn:null,
  checkOut:null,
  noOfRooms: 0,
  noOfDays:0,
  roomType:'',
  totalNoOfRooms:0,
  isModalOpen: false,
  room_id:null,
  hotel_id:null,
  checkedRoomIds:[],
  noOfAvailableRooms:0
};

const priceSlice = createSlice({
  name: "price",
  initialState,
  reducers: {

    updatePrice: (state, action) => {
      //state.price = action.payload;
      console.log(state.price,action.payload,'action.payload',)
      state.price=Number(state.noOfDays)*Number(action.payload);
    },


    updateNoOfRooms: (state, action) => {
      state.totalNoOfRooms+=action.payload
      state.noOfRooms = action.payload;
    },

    updateIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },

    insertCheckedRoomId: (state, action) => {

      const roomArray=action.payload;
      const priceToAdd=roomArray[roomArray.length-1].price;
      const noOfRoomsToAdd=roomArray[roomArray.length-1].noOfRooms;
      state.totalPrice+=Number(priceToAdd)*Number(noOfRoomsToAdd);
      state.checkedRoomIds=action.payload;
      
    },

    removeUnCheckedRoomId: (state, action) => {
      console.log(action.payload)
      const priceToMinus=action.payload.priceToMinus;
      const selectedRooms=action.payload.modifiedRoomArray;
      console.log(selectedRooms);
      state.checkedRoomIds=selectedRooms;
      console.log(state.checkedRoomIds)
      // const id = action.payload;
      // const indexToDelete = state.checkedRoomIds.findIndex((el) => el === id);
      // const priceToMinus=state.checkedRoomIds[indexToDelete].price*state.checkedRoomIds[indexToDelete].noOfRooms
      state.totalPrice-=priceToMinus
      // state.checkedRoomIds.splice(indexToDelete, 1);
    },

    updateRoomId:(state,action)=>{
        state.room_id=action.payload
    },

    updateNoOfAvailableRooms:(state,action)=>{
      state.noOfAvailableRooms=action.payload;
    },

    updateHotelId:(state,action)=>{
      state.hotel_id=action.payload
    },

    updateRoomType:(state,action)=>{
      state.roomType=action.payload
    },

    updateRoomPrice:(state,action)=>{
      console.log(state.noOfDays,action.payload)
      state.price=state.noOfDays*action.payload
    },

    updateCheckIn:(state,action)=>{
      state.checkIn=action.payload

      if(state.checkOut){
        const oneDay = 24 * 60 * 60 * 1000;
        const checkOut=new Date(state.checkOut)
        const checkIn=new Date(action.payload)
        const diffDays = Math.round(Math.abs((checkIn - checkOut) / oneDay))+1;
        state.noOfDays=diffDays
        state.checkIn=action.payload

        state.price=Number(state.noOfDays)*Number(state.price)*Number(state.noOfRooms);
      }
    },

    updateCheckOut:(state,action)=>{
      const oneDay = 24 * 60 * 60 * 1000;
      const checkIn=new Date(state.checkIn)
      const checkOut=new Date(action.payload)
      const diffDays = Math.round(Math.abs((checkIn - checkOut) / oneDay))+1;
      state.noOfDays=diffDays
      state.checkOut=action.payload
      state.price=Number(state.noOfDays)*Number(state.price)*Number(state.noOfRooms);
    },

  },
});

export default priceSlice.reducer;
export const selectPrice = (state) => state.priceSlice.price;
export const selectCheckedRooms = (state) => state.priceSlice.checkedRoomIds;
export const selectCheckedRoomById = (state, id) => state?.priceSlice?.checkedRoomIds?.find((el) => el?.id=== id);
export const selectNoOfRooms = (state) => state.priceSlice.noOfRooms;
export const selectIsModalOpen = (state) => state.priceSlice.isModalOpen;
export const selectRoomId= (state) => state.priceSlice.room_id
export const selectTotalPrice= (state) => state.priceSlice.totalPrice
export const selectCheckIn= (state) => state.priceSlice.checkIn
export const selectCheckOut= (state) =>state.priceSlice.checkOut
export const selectHotelId= (state) =>state.priceSlice.hotel_id
export const selectTotalNumberOfRoom= (state) =>state.priceSlice.totalNoOfRooms
export const selectRoomType= (state) =>state.priceSlice.roomType
export const selectAvailableRoom=(state) => state.priceSlice.noOfAvailableRooms
export const selectNoOfDays=(state) => state.priceSlice.noOfDays

export const {
  updateIsModalOpen,
  updateNoOfRooms,
  updatePrice,
  insertCheckedRoomId,
  removeUnCheckedRoomId,
  updateRoomId,updateCheckIn,
  updateCheckOut,updateHotelId,
  updateRoomType,updateNoOfAvailableRooms
} = priceSlice.actions;
