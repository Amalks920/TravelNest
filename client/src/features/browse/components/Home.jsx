import { useSelector } from "react-redux";
import XXLDialog from "../../../components/modals/XXLDialog";
import useGetAllHotels from "../hooks/useGetAllHotels";
import Cards from "./Cards";
import { selectIsSearchBarOpen } from "../../../services/searchSlice";
import { Button } from "@material-tailwind/react";
import SearchSection from "./SearchSection";
import { HotelCardSkeleton } from "./HotelCardSkeleton";
import { useState } from "react";
import SearchSectionHome from "./SearchSectionHome";

const Home = () => {
  const isSearchBarOpen = useSelector(selectIsSearchBarOpen);
  const { hotels, isError, isFetching, isLoading, isUninitialized, error } =
    useGetAllHotels();

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
        className="row-span-1 h-[300px] mt-[300px] ms-[90px] border-2 col-span-full w-[90%] bg-cover"
        style={{
          backgroundImage: `url(${"https://assets.oyoroomscdn.com/cmsMedia/6e9d9804-9c6f-4b18-a5d5-5e9a8f9815e5.jpg"})`,
        }}
      ></div>
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
        hotels?.map(({ _id, hotelName, price, description, images }, index) => (
          <div
            key={_id}
            className={`${
              index <= 3 && "mt-[500px]"
            } col-span-2 lg:col-span-2  mb-[50px]   xl:col-span-1`}
          >
            <Cards
              hotel_id={_id}
              hotelName={hotelName}
              price={price}
              description={description}
              images={images}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
