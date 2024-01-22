import { Checkbox, Radio, Slider } from "@material-tailwind/react";
import PriceFilter from "./PriceFilter";

const FilterSection = () => {
  return (
    <div className=" h-full p-5 overflow-scroll border-r-2">
      <div className="flex flex-col justify-center items-center  rounded-xl">
        <header className="w-full  flex">
          <h2 className=" w-full text-[0.9rem]">Filters</h2>
          <h2 className="text-red-700 font-bold text-[0.7rem] text-right w-full pt-[5px] pe-1 cursor-pointer">
            Clear All
          </h2>
        </header>
        {/* <div className="w-full text-left pt-10 ">
          <h2 className="  font-bold  text-[1.1rem] text-left mb-3">Price</h2>
          <div className="flex">
            <Radio name="price-range"/>
           <h2 className="mt-2"> ₹500 to ₹999</h2>
          </div>
          <div className="flex">
            <Radio name="price-range"/>
           <h2 className="mt-2"> ₹100 to ₹1499</h2>
          </div>
          <div className="flex">
            <Radio name="price-range"/>
           <h2 className="mt-2"> ₹1500 to ₹1999</h2>
          </div>
        </div> */}
        <PriceFilter/>
      </div>
    </div>
  );
};

export default FilterSection;
