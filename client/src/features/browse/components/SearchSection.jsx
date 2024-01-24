import { Button, Input, Select, Option } from "@material-tailwind/react";
import DatePicker from "../../../components/form/DatePicker";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  updateCheckIn,
  updateCheckOut,
  updateLocation,
  updateRoomType,
} from "../../../services/searchSlice";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import { format } from "date-fns";
import { useSearchMutation } from "../services/searchApiSlice";
import * as yup from "yup";

const SearchSection = () => {
  // const [location, setLocation] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, { isError, isLoading, isSuccess, reset }] =
    useSearchMutation();

  const _onSave = async (values) => {
    console.log("clicked");
    try {
      console.log(values);
      const response = await search(values);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {
    navigate(`/search-page`);
  };

  return (
    <div className=" w-full   z-20  pt-14 ">
      <Formik
        initialValues={{ checkInDate: "", checkOutDate: "", roomType: "" }}
        validationSchema={yup.object({
          checkInDate: yup.date().required(),
          checkOutDate: yup.date().required(),
          // roomType:yup.string().required()
        })}
        onSubmit={(values) => {
          console.log("dslkdskl");
          _onSave(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          setFieldValue,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form
            onSubmit={handleSubmit}
            className="grid grid-rows-[100px] place-content-center  grid-cols-[25%,15%,15%,25%,auto] bg-black text-white shadow-2xl"
          >
            <div className="flex items-center ps-16 row-span-1 col-span-1  border-white">
              <input
                onInput={(e) => {
                  handleSearch();
                  dispatch(updateLocation(e.target.value));
                }}
                className="border-white w-[80%] h-[40px] text-black ps-9 rounded-md"
                placeholder="Enter Location"
              />
            </div>
            <div className="flex items-center row-span-1 col-span-1">
              <input
                onInput={(e) => {
                  dispatch(updateCheckIn(e.target.value));
                  handleSearch();
                }}
                name="checkIn"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.checkIn}
                error={errors.checkIn && touched.checkIn && errors.checkIn}
                success={!errors.checkIn && touched.checkIn ? true : false}
                type="date"
                className="border-white w-[80%] h-[40px] text-black ps-9 rounded-md"
                placeholder="Check In"
              />
            </div>
            <div className="flex items-center row-span-1 col-span-1">
              <input
                onInput={(e) => {
                  dispatch(updateCheckOut(e.target.value));
                }}
                name="checkOut"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.checkOut}
                error={errors.checkOut && touched.checkOut && errors.checkOut}
                success={!errors.checkOut && touched.checkOut ? true : false}
                type="date"
                className="border-white w-[80%] h-[40px] text-black ps-9"
                placeholder="Check Out"
              />
            </div>

            <div className="flex items-center row-span-1 col-span-1">
              <select
                onInput={(e) => {
                  console.log(e.target.value)
                  dispatch(updateRoomType(e.target.value));
                  handleSearch();
                }}
                onChange={handleChange}
                value={values.roomType}
                className="border-white w-[80%] h-[40px] text-black ps-9"
                s
                name="roomType"
                id=""
              >
                <option className="" value="double">
                  double
                </option>
                <option value="single">single</option>
              </select>
            </div>

            <div className="flex items-center row-span-1 col-span-1">
              {/* <Button value={"submit"} type={"submit"} width={"sm"}>
                Update Search
              </Button> */}
              {/* <select
           className="border-white w-[80%] h-[40px] text-black ps-9"s
           name="roomType" id="">
            <option className="" value="">single</option>
            <option value="">single</option>
          </select> */}
            </div>
          </form>
        )}
      </Formik>
      {/* <div className="grid grid-rows-[auto] grid-cols-[10%,10%,auto,10%]
         place-content-center  h-[200px]  shadow-2xl
          z-auto bg-black">

        <div className="border-2 rounded-s-full flex justify-center items-center ">
          
          <input
              onInput={(e)=>{
                  dispatch(updateLocation(e.target.value))
              }}
           placeholder="Search destinations"  className="ps-5 text-[0.8rem]  w-full h-[4rem] rounded-s-full"/>
        </div>
        <div className="border-2 flex justify-center items-center shadow-2xl">CheckIn</div>
        <div className="border-2 flex justify-center items-center shadow-2xl">

             <div className="p-4">
              CheckOut

     </div>

        </div>
        <div className="border-2 flex justify-end p-2 rounded-e-full shadow-2xl">
        <Button
        
      onClick={()=>{
          handleSearch()
      }}
        color="black"
        size="xxl"
        className="rounded-full h-[50px] w-[50px] text-center border-2 "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          className="w-6 h-6  relative right-3"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
     
      </Button>
        </div>
      </div> */}
    </div>

    /* <Select label="Room Type" size="sm" className="" variant="outlined">
        <Option>Single - max 1 person</Option>
        <Option>Double - max 2 people</Option>
        <Option>Suite</Option>
        <Option>Adjoining</Option>
        <Option>Presidential</Option>
        <Option>Penthouse</Option>
      </Select> */

    //   <div className="flex justify-center items-center shadow-2xl w-full h-[200px] fixed z-10 top-16 left-0 bg-white">
    //   <div className="flex  min-w-[35%] h-[35%] rounded-full">

    //     <div className="w-1/2 border-2 h-full rounded-s-full">

    //       <input
    //           onInput={(e)=>{
    //               setLocation(e.target.value)
    //           }}
    //        placeholder="Search destinations" value={location} className="ps-6 text-md  w-full h-[4rem] rounded-s-full"/>
    //     </div>

    //     {/* <div className="flex  items-center w-1/3 border-2 h-full">
    //       <div className=""><DatePicker className={'max-w-[100px] -me-16'} label={'check in'}/></div>
    //       <div className=""><DatePicker className={'max-w-[100px] -ms-16'} /></div>
    //     </div> */}

    //     <div className="flex justify-around items-center min-w-1/2 border-2 h-full rounded-e-full">
    //     <div className="w-10">
    //     <Select label="Select Version">
    //       <Option>Material Tailwind HTML</Option>
    //       <Option>Material Tailwind React</Option>
    //       <Option>Material Tailwind Vue</Option>
    //       <Option>Material Tailwind Angular</Option>
    //       <Option>Material Tailwind Svelte</Option>
    //     </Select>
    //   </div>

    //       <Button

    //       onClick={()=>{
    //           handleSearch()
    //       }}
    //         color="red"
    //         size="sm"
    //         className="rounded-full h-[50px] text-center border-2"
    //       >
    //         {/* <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           fill="none"
    //           viewBox="0 0 24 24"
    //           stroke-width="2"
    //           stroke="currentColor"
    //           className="w-6 h-6   "
    //         >
    //           <path
    //             stroke-linecap="round"
    //             stroke-linejoin="round"
    //             d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
    //           />
    //         </svg> */}
    //         search
    //       </Button>
    //     </div>
    //   </div>

    // </div>
  );
};

export default SearchSection;
