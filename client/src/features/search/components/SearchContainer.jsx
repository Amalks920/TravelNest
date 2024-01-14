import { useParams } from "react-router-dom";
import FilterSection from "./FilterSection";
import HotelListSection from "./HotelListSection";
import useGetSearchHotels from "../hooks/useGetSearchHotels";
import { useSelector } from "react-redux";
import { selectCheckIn, selectCheckOut, selectLocation } from "../../../services/searchSlice";
import { useEffect, useState } from "react";
import { useSearchByLocationMutation } from "../services/searchApiSlice";

const SearchContainer = () => {
  
  const [data,setData]=useState([])
  const location=useSelector(selectLocation)
  const checkIn=useSelector(selectCheckIn)
  const checkOut=useSelector(selectCheckOut)
  // const { searchResult,isError, isLoading, isSuccess } =
  //   useGetSearchHotels(location);
  const [searchByLocation,{isError,isLoading,isSuccess}]=useSearchByLocationMutation({location,checkIn,checkOut})

  useEffect(()=>{
     handleSearch()
  // if(location && !checkIn && !checkOut) handleSearch()
},[location,checkIn,checkOut])

  const handleSearch=async ()=>{
    try {
        const response=await searchByLocation({location,checkIn,checkOut})
        console.log(response)
        setData(response.data.response)
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
            console.log(hotel)
            return <HotelListSection key={index}  hotel={hotel}/>
          })
        }
        
      </div>
    </div>
  );
};

export default SearchContainer;
