import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  price: 0,
  noOfRooms: 0,
  isModalOpen: false,
  room_id:null,
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
      state.noOfRooms = action.payload;
    },
    updateIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
    insertCheckedRoomId: (state, action) => {
      state.checkedRoomIds.push(action.payload);
    },
    removeUnCheckedRoomId: (state, action) => {
      const id = action.payload;
      const indexToDelete = state.checkedRoomIds.findIndex((el) => el === id);
      state.checkedRoomIds.splice(indexToDelete, 1);
    },
    updateRoomId:(state,action)=>{
        state.room_id=action.payload
    }
  },
});

export default priceSlice.reducer;

export const selectPrice = (state) => state.priceSlice.price;
export const selectCheckedRooms = (state) => state.priceSlice.checkedRoomIds;
export const selectCheckedRoomById = (state, id) => state.priceSlice.checkedRoomIds.find((el) => el.id=== id);
export const selectNoOfRooms = (state) => state.priceSlice.noOfRooms;
export const selectIsModalOpen = (state) => state.priceSlice.isModalOpen;
export const selectRoomId= (state) => state.priceSlice.room_id

export const {
  updateIsModalOpen,
  updateNoOfRooms,
  updatePrice,
  insertCheckedRoomId,
  removeUnCheckedRoomId,
  updateRoomId
} = priceSlice.actions;
