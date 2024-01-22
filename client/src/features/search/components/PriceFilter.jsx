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
    <div className="mt-8  w-full">
      <h2 className="w-full text-center">PRICE</h2>

      <div className="flex  justify-left gap-5 mt-4 ">
        <div className="flex justify-end">
          <Radio
            onInput={() => {
              dispatch(updatePriceRange({ min: 500, max: 999 }));
            }}
            name="price-range"
            size={"sm"}
          />
        </div>
        <h2 className="mt-3  flex justify-between w-[100%] text-[0.9rem]">
          <span>₹500</span> - <span>₹999</span>
        </h2>
      </div>
      <div className="flex  justify-left gap-5   ">
        <div>
          <Radio
            onInput={() => {
              dispatch(updatePriceRange({ min: 1000, max: 1499 }));
            }}
            name="price-range"
            value={{ min: 500, max: 999 }}
            size={"sm"}
          />
        </div>
        <h2 className="mt-3  flex justify-between w-[100%] text-[0.9rem]">
          <span>₹1000</span> - <span>₹1499</span>
        </h2>
      </div>
      <div className="flex  justify-left gap-5  ">
        <div>
          <Radio
            onInput={() => {
              dispatch(updatePriceRange({ min: 1500, max: 1999 }));
            }}
            name="price-range"
            size={"sm"}
          />
        </div>
        <h2 className="mt-3  flex justify-between w-[100%] text-[0.9rem]">
          <span>₹1500</span> - <span>₹1999</span>
        </h2>
      </div>
    </div>
  );
};

export default PriceFilter;
