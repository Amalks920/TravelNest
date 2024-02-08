import { useDispatch, useSelector } from "react-redux";
import XXLDialog from "../../../components/modals/XXLDialog";
import useGetAllHotels from "../hooks/useGetAllHotels";
import Cards from "./Cards";
import { selectIsSearchBarOpen, updateSearchResult } from "../../../services/searchSlice";
import { Button } from "@material-tailwind/react";
import SearchSection from "./SearchSection";
import { HotelCardSkeleton } from "./HotelCardSkeleton";
import { useState } from "react";
import SearchSectionHome from "./SearchSectionHome";
import { useSearchMutation } from "../services/searchApiSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const isSearchBarOpen = useSelector(selectIsSearchBarOpen);
  const { hotels,location, isError, isFetching, isLoading, isUninitialized, error } =
    useGetAllHotels();

    const [search, { isSuccess, reset }] =
    useSearchMutation();

    const dispatch=useDispatch()
    const navigate=useNavigate()

    const handleSearch = async () => {
      navigate(`/search-page`);
    };



    {console.log(location)}
    
  return (
    <div className=" grid grid-flow-row grid-cols-1 md:grid-cols-4 xl:grid-cols-3  w-[100vw] ">
      <div
        className="absolute row-span-1 h-[270px] col-span-full w-[100vw]  bg-cover flex flex-col justify-center items-center -ms-2 -mt-5"
        style={{
          backgroundImage: `url(${"https://assets.oyoroomscdn.com/cmsMedia/115d178d-ef59-4212-a6ed-953eb4ce8241.jpg"})`,
        }}
      >
        <SearchSectionHome />
      </div>

      <div
        className="row-span-1 h-[300px] mt-[300px] ms-[90px] border-2 col-span-full w-[90%] bg-cover mb-[7%]"
        style={{
          backgroundImage: `url(${"https://assets.oyoroomscdn.com/cmsMedia/6e9d9804-9c6f-4b18-a5d5-5e9a8f9815e5.jpg"})`,
        }}
      ></div>
      <div className="row-span-1 col-span-full">
        <h1 className="text-center font-bold text-[1.8rem]">Popular Locations</h1>
      </div>
      {isLoading || isFetching || isUninitialized ? (
        <>
          <div className=" col-span-2 lg:col-span-2  mb-6   xl:col-span-1">
            <HotelCardSkeleton />
          </div>

          <div className=" col-span-2 lg:col-span-2  mb-6   xl:col-span-1">
            <HotelCardSkeleton />
          </div>

          <div className=" col-span-2 lg:col-span-2  mb-6   xl:col-span-1">
            <HotelCardSkeleton />
          </div>

          <div className=" col-span-2 lg:col-span-2  mb-6   xl:col-span-1">
            <HotelCardSkeleton />
          </div>
        </>
      ) : (
        location?.map(({ _id, hotelImages }, index) => (
          <div
          onClick={async ()=>{
            const searchResult=await search({location:_id, checkIn: null, checkOut: null, roomType: null})
            console.log(searchResult)
            dispatch(updateSearchResult(searchResult?.data?.response))
            handleSearch()
            
          }}
            key={_id}
            className={`${
              (index ===0 || index%3===0)  && " "
            } col-span-2 lg:col-span-2 xl:col-span-1 mt-[70px] ms-[17%] cursor-pointer`}
          >
            <Cards
            _id={_id}
            images={hotelImages[0]}
              // hotel_id={_id}
              // hotelName={hotelName}
              // price={price}
              // description={description}
              // images={images}
            />
          </div>
        ))

      )}
    </div>
  );
};

export default Home;
