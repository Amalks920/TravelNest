import { useSelector } from "react-redux";
import XXLDialog from "../../../components/modals/XXLDialog";
import useGetAllHotels from "../hooks/useGetAllHotels";
import Cards from "./Cards";
import { selectIsSearchBarOpen } from "../../../services/searchSlice";
import { Button } from "@material-tailwind/react";
import SearchSection from "./SearchSection";

const Home = () => {
  const isSearchBarOpen = useSelector(selectIsSearchBarOpen);
  const { hotels, isError, isFetching, isLoading, isUninitialized, error } =
    useGetAllHotels();

  return (
    <div className="flex flex-col">
      {/* {isSearchBarOpen && (

        <SearchSection/>

      )} */}
      <div className=" grid grid-flow-row grid-cols-1 md:grid-cols-4 xl:grid-cols-3  w-[90vw]">
        {/* <div className="border-2"> */}

        {hotels?.map(
          ({ _id, hotelName, price, description, images }, index) => (
            <div key={_id} className=" col-span-2 lg:col-span-2  mb-6   xl:col-span-1">
              <Cards
                hotel_id={_id}
                hotelName={hotelName}
                price={price}
                description={description}
                images={images}
              />
            </div>
          )
        )}

        {/* <div className="border-2">
                <Cards/>
                </div>
                <div className="border-2">
                <Cards/>
                </div>
                <div className="border-2">
                <Cards/>
                </div>
                <div className="border-2">
                <Cards/>
                </div> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default Home;
