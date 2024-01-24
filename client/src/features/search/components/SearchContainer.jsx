import { useParams } from "react-router-dom";
import FilterSection from "./FilterSection";
import HotelListSection from "./HotelListSection";
import useGetSearchHotels from "../hooks/useGetSearchHotels";
import { useDispatch, useSelector } from "react-redux";
import { selectCheckIn, selectCheckOut, selectLocation, selectPriceRange, selectRoomType, selectSearchResult, updateSearchResult } from "../../../services/searchSlice";
import { useEffect, useState } from "react";
import { useSearchByLocationMutation } from "../services/searchApiSlice";

const SearchContainer = () => {
  
//console.log( useGetSearchHotels())
  const dispatch=useDispatch()  
  //const [data,setData]=useState([])
  const location=useSelector(selectLocation)
  const checkIn=useSelector(selectCheckIn)
  const checkOut=useSelector(selectCheckOut)
  const roomType=useSelector(selectRoomType)
  const data=useSelector(selectSearchResult)
  const priceRange=useSelector(selectPriceRange)
  //console.log(d)

  const [searchByLocation,{isError,isLoading,isSuccess}]=useSearchByLocationMutation({location,checkIn,checkOut})

  useEffect(()=>{
     handleSearch()
},[location,checkIn,checkOut,roomType,priceRange])

  const handleSearch=async ()=>{
    try {
      console.log(priceRange)
        const response=await searchByLocation({location,checkIn,checkOut,roomType,priceRange})
        console.log(response)
        dispatch(updateSearchResult(response.data.response))
       // setData(response.data.response)
    } catch (error) {
        console.log(error)
    }
}

  return (
    <div className="grid grid-rows-[100vh] grid-cols-[20%,auto]  w-full min-h-[80vh] gap-[5%]">
      <div className="lg:block hidden row-span-1 col-span-1 rounded-md min-h-[80vh]  ">
       <FilterSection />
      </div>

    
      <div className="row-span-1 col-span-2 lg:col-span-1 overflow-scroll">
        {
          data?.map((hotel,index)=>{
        
            return <HotelListSection key={index}  hotel={hotel}/>
          })
        }
        
      </div>
    </div>
  );
};

export default SearchContainer;
