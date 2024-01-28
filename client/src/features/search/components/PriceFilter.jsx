import { Radio } from "@material-tailwind/react";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updatePriceRange } from "../../../services/searchSlice";
import useGetSearchHotels from "../hooks/useGetSearchHotels";

const PriceFilter = () => {
  const [priceRange, setPriceRange] = useState(null);
  const dispatch = useDispatch();
 
  //hook to rerender hotel section in search page
   // useGetSearchHotels()
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
              dispatch(updatePriceRange({ min: 1000, max: 1499 }));
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