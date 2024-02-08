import { Radio } from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCheckIn, selectCheckOut, selectLocation, selectPriceRange, selectRoomType, updatePriceRange,updateSearchResult } from "../../../services/searchSlice";
import useGetSearchHotels from "../hooks/useGetSearchHotels";
import { useSearchMutation } from "../../browse/services/searchApiSlice";

const PriceFilter = () => {
  // const [priceRange, setPriceRange] = useState(null);
  const dispatch = useDispatch();
  const searchString=useSelector(selectLocation)
  const checkIn=useSelector(selectCheckIn)
  const checkOut=useSelector(selectCheckOut)
  const roomType=useSelector(selectRoomType)
  const priceRange=useSelector(selectPriceRange)
 
  //hook to rerender hotel section in search page
   // useGetSearchHotels()
   const [search, { isError, isLoading, isSuccess, reset }] =
   useSearchMutation();

   const handleSearch= async ()=>{
    
    try {
      const response = await search({
        location: searchString,
        checkIn: checkIn,
        checkOut: checkOut,
        roomType: roomType,
        priceRange:priceRange
      });
      console.log(response);
      dispatch(updateSearchResult(response.data.response));
      console.log(response);
    } catch (error) {
      console.log(error);
    }
   }

   useEffect(()=>{
    handleSearch()
   },[priceRange])
  return (
    <>
    <h2 className="w-full text-center mt-8 -ms-4 font-bold">Price</h2>
    <div className="  w-full">
      

      <div className="flex  justify-left gap-5  ">
        <div className="flex justify-end">
          <Radio
            className="w-4 h-4"
            onInput={() => {
              dispatch(updatePriceRange({ min: 500, max: 999 }));
              handleSearch()
            }}
            name="price-range"
            size={"sm"}
          />
        </div>
        <h2 className="mt-3  flex justify-between w-[50%] text-[1rem] ">
          <span>₹500</span> - <span>₹999</span>
        </h2>
      </div>
      <div className="flex  justify-left gap-5   ">
        <div>
          <Radio
          className="w-4 h-4"
            onInput={() => {
              dispatch(updatePriceRange({ min: 1000, max: 1499 })) 
              
            }}
            onChange={()=>{
              handleSearch()
            }}
            name="price-range"
            value={{ min: 500, max: 999 }}
            size={"sm"}
          />
        </div>
        <h2 className="mt-3  flex justify-between w-[50%] text-[1rem] ">
          <span>₹1000</span> - <span>₹1499</span>
        </h2>
      </div>
      <div className="flex  justify-left gap-5 ">
        <div>
          <Radio
          className="w-4 h-4"
            onInput={() => {
              dispatch(updatePriceRange({ min: 1500, max: 1999 }));
              handleSearch()
            }}
            name="price-range"
            size={"sm"}
          />
        </div>
        <h2 className="mt-3  flex justify-between w-[50%] text-[1rem] ">
          <span>₹1500</span> - <span>₹1999</span>
        </h2>
      </div>
    </div>
    </>
  );
};

export default PriceFilter;
