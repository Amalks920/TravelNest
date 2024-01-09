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
},[location])

  const handleSearch=async ()=>{
    try {
        const response=await searchByLocation({location})
        console.log(response)
        setData(response.data.response)
    } catch (error) {
        console.log(error)
    }
}

  return (
    <div className="grid grid-rows-[auto] grid-cols-[25%,auto] gap-4 w-full min-h-[80vh]">
      <div className="md:block hidden row-span-1 col-span-1 rounded-md min-h-[80vh] border-2">
       <FilterSection />
      </div>


      <div className="row-span-1 col-span-2 md:col-span-1">
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
