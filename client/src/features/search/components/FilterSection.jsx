import { Radio } from "@material-tailwind/react";

const FilterSection = () => {
  return (
    <div className=" h-full p-5 overflow-scroll ">
      <div className="flex flex-col justify-center items-center  rounded-xl">
        <header className="w-full px-2 flex">
          <h2 className="font-bold w-full text-2xl">Filters</h2>
          <h2 className="text-red-700 font-bold text-[1rem] text-right w-full pt-[5px] pe-1 cursor-pointer">Clear All</h2>
        </header>
        <ul className="w-full text-left pt-10 ms-5">
          <h2 className="font-semibold text-left ms-2 text-[1rem]">Location</h2>
          <li className="p- mt-3">
          <Radio name="type" ripple='true' size={'sm'} className="text-[0.4rem]" label="kollam" />       
          </li>
          <li className="p- ">
          <Radio name="type" ripple='true' size={'sm'} className="text-[0.4rem]" label="kollam" />       
          </li>
        </ul>

      </div>
    </div>
  );
};

export default FilterSection;
