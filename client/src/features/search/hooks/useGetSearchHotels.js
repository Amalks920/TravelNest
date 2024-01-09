import { useEffect, useRef, useState } from "react";
import { useSearchByLocationMutation } from "../services/searchApiSlice";
import { useSelector } from "react-redux";
import { selectLocation } from "../../../services/searchSlice";



const useGetSearchHotels= async (location)=>{
   
const searchResult=useRef(null)
const [searchByLocation,{isError,isLoading,isSuccess}]=useSearchByLocationMutation({location})

useEffect(()=>{

    handleSearch()
},[location])


const handleSearch=async ()=>{
    try {
        const response=await searchByLocation({location})
        console.log(response)
        searchResult.current=response
    } catch (error) {
        console.log(error)
    }
}




return {
    searchResult,
    isError,
    isLoading,
    isSuccess
}
}

export default useGetSearchHotels;