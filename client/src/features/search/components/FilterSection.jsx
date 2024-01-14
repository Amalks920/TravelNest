import { Checkbox, Radio, Slider } from "@material-tailwind/react";

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
        <div className="w-full text-left pt-10 ">
          <h2 className="  font-bold  text-[0.8rem] text-center mb-3">Price</h2>
          <div className="p- ">
            <Slider
              defaultValue={50}
              className="text-[#08080d]"
              barClassName="rounded-none bg-black"
              thumbClassName="[&::-moz-range-thumb]:rounded-none [&::-webkit-slider-thumb]:rounded-none [&::-moz-range-thumb]:-mt-[4px] [&::-webkit-slider-thumb]:-mt-[4px]"
              trackClassName="[&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-track]:bg-transparent rounded-none !bg-[#2ec946]/10 border border-black"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
