import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSearchMutation } from "../services/searchApiSlice";
import { updateCheckIn, updateCheckOut, updateLocation, updateSearchResult } from "../../../services/searchSlice";

const SearchSectionHome = () => {
  const [checkIn, setCheckInDate] = useState(null);
  const [checkOut, setCheckOutDate] = useState(null);
  const [searchString, setSearchString] = useState(null);
  const [roomType,setRoomType]=useState(null);


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, { isError, isLoading, isSuccess, reset }] =
    useSearchMutation();

const handleSubmit=async () => {
    const searchResult=await search({location:searchString, checkIn: checkIn, checkOut: checkOut, roomType: roomType})
    console.log(searchResult)
    dispatch(updateSearchResult(searchResult.data.response))
    handleSearch()
}

  const handleSearch = async () => {
    navigate(`/search-page`);
  };

  console.log(checkIn);
  console.log(checkOut);
  console.log(searchString);

  const getYesterdayDateString = () => {
    const yesterday = new Date();
    const year = yesterday.getFullYear();
    const month = String(yesterday.getMonth() + 1).padStart(2, "0");
    const day = String(yesterday.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <h2 className="text-white capitalize font-bold sm:text-[2.2rem]  text-center mb-4">
        Over 174,000+ hotels and homes across 35+ countries
      </h2>
      <div 
        className="grid grid-cols-[35%,15%,15%,15%,20%] grid-rows-1 border-2 w-[70%] sm:h-1/4  h-1/5 rounded-md brightness-95">
        <input
          onChange={(e) => {
            updateLocation(e.target.value)
            setSearchString(e.target.value);
          }}
          className="ps-3 text-[1.1rem] capitalize focus:font-bold focus:border-2 border-black"
          placeholder="Search by location"
        />
        <input
          onChange={(e) => {
            updateCheckIn(e.target.value)
            setCheckInDate(e.target.value);
          }}
          type="date"
          min={getYesterdayDateString()}
          className="ps-3 text-[1.1rem] focus:border-2 border-black"
        />
        <input
          onChange={(e) => {
            updateCheckOut(e.target.value)
            setCheckOutDate(e.target.value);
          }}
          type="date"
          min={checkIn}
          className="ps-3 text-[1.1rem]  focus:border-2 border-black"
        />
        {/* <input className="ps-3 text-[1.1rem] capitalize1 focus:border-2 border-black" /> */}
        <select
          value={roomType}
          onChange={e => setRoomType(e.target.value)} 
          className="ps-2 pe-3 text-[1.1rem] bg-white capitalize font-extralight"
          name=""
          id=""
        >
          <option value="single">single</option>
          <option value="double">double</option>
          <option value="suite">suite</option>
          <option value="family">family</option>
        </select>

        <button
        onClick={()=>{
            handleSubmit()
        }}
         type="submit" className="bg-green-600 rounded-md hover:bg-green-800 text-white sm:text-[1.4rem] text-[0.6rem] font-bold uppercase">
          Search
        </button>
      </div>
    </>
  );
};

export default SearchSectionHome;
