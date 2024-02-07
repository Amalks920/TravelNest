import { Button, Input, Select, Option } from "@material-tailwind/react";
import DatePicker from "../../../components/form/DatePicker";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  selectIsSearchBarOpen,
  updateCheckIn,
  updateCheckOut,
  updateIsSearchBarOpen,
  updateLocation,
  updateRoomType,
  updateSearchResult,
} from "../../../services/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { format } from "date-fns";
import { useSearchMutation } from "../services/searchApiSlice";
import * as yup from "yup";
import { IMAGE_BASE_URL } from "../../../data/constants";

const SearchSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearchBarOpen=useSelector(selectIsSearchBarOpen)
  const [checkIn, setCheckInDate] = useState(null);
  const [checkOut, setCheckOutDate] = useState(null);
  const [searchString, setSearchString] = useState(null);
  const [roomType, setRoomType] = useState(null);

  const [search, { isError, isLoading, isSuccess, reset }] =
    useSearchMutation();

  const handleSearch = async () => {
    try {
      const response = await search({
        location: searchString,
        checkIn: checkIn,
        checkOut: checkOut,
        roomType: roomType,
      });
      console.log(response);
      dispatch(updateSearchResult(response.data.response));
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className=" w-full   z-20  pt-14 " >
      <div className="grid grid-rows-[100px] place-content-center  grid-cols-[25%,15%,15%,25%,auto] bg-black text-white shadow-2xl rounded-md" style={{backgroundImage:`url(https://assets.oyoroomscdn.com/cmsMedia/115d178d-ef59-4212-a6ed-953eb4ce8241.jpg)`}}>
        <div className="flex items-center ps-16 row-span-1 col-span-1  border-white">
          <input
            onInput={(e) => {
              setSearchString(e.target.value);
              dispatch(updateLocation(e.target.value));
            }}
            className="border-white w-[80%] h-[40px] text-black ps-9 rounded-md cursor-pointer"
            placeholder="Enter Location"
          />
        </div>
        <div className="flex items-center row-span-1 col-span-1">
          <input
            onInput={(e) => {
              setCheckInDate(e.target.value);
              dispatch(updateCheckIn(e.target.value));
            }}
            name="checkIn"
            type="date"
            className="border-white w-[80%] h-[40px] text-black ps-9 rounded-md cursor-pointer"
            placeholder="Check In"
          />
        </div>
        <div className="flex items-center row-span-1 col-span-1">
          <input
            onInput={(e) => {
              setCheckOutDate(e.target.value);
              dispatch(updateCheckOut(e.target.value));
            }}
            name="checkOut"
            type="date"
            className="border-white w-[80%] h-[40px] text-black ps-9 rounded-md cursor-pointer"
            placeholder="Check Out"
          />
        </div>

        <div className="flex items-center row-span-1 col-span-1">
          <select
            value={roomType}
            onChange={(e)=>setRoomType(e.target.value)}
            className="border-white w-[80%] h-[40px] text-black ps-9 rounded-md cursor-pointer"
            name="roomType"
          >
            <option className="cursor-pointer" value="single">
              single
            </option>
            <option className="cursor-pointer" value="double">
              double
            </option>
            <option className="cursor-pointer" value="suite">
              suite
            </option>
            <option className="cursor-pointer" value="family">
              family
            </option>
          </select>
        </div>

        <div className="flex items-center row-span-1 col-span-1">
          <button
            onClick={() => {
              handleSearch();
            }}
            className="bg-green-800 px-5 py-3 rounded-md hover:bg-green-900 font-bold"
          >
            update search
          </button>
          <button
          onClick={
            ()=>{
              dispatch(updateIsSearchBarOpen(!isSearchBarOpen))
            }
          }
           className="text-red-600 ms-4 cursor-pointer">close</button>
        </div>
    
      </div>
      
    </div>
  );
};

export default SearchSection;
