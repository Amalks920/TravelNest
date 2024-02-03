import {
  useGetAHotelForUserQuery,
  useGetARoomForUserQuery,
} from "../services/getAHotelForUserApiSlice";

const useGetAHotel = (hotel_id, room_id) => {
  const {
    data: hotel,
    isError,
    isFetching,
    isLoading,
    isSuccess,
    isUninitialized,
  } = useGetAHotelForUserQuery({ hotel_id });
  const {
    data: room,
    isError: isErrorRoom,
    isFetching: isFetchingRoom,
    isLoading: isLoadingRoom,
    isSuccess: isSuccessRoom,
    isUninitialized: isUninitializedRoom,
  } = useGetARoomForUserQuery({ room_id });

  console.log(room);
  return {
    hotel,
    isError,
    isFetching,
    isLoading,
    isSuccess,
    isUninitialized,
    room,
    isErrorRoom,
    isFetchingRoom,
    isLoadingRoom,
    isSuccessRoom,
    isUninitializedRoom
  };
};

export default useGetAHotel;
