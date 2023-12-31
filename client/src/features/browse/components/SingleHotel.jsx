import { useState } from "react";
import XXLDialog from "../../../components/modals/XXLDialog";
import { Field } from "formik";
import { Select,Button } from "@material-tailwind/react";
import { FormInput } from "../../../components/form/FormInput";
import DatePicker from "../../../components/form/DatePicker";
import { useParams } from "react-router-dom";
import useGetAHotel from "../hooks/useGetAHotel";
import { IMAGE_BASE_URL } from "../../../data/constants";

const SingleHotel = () => {
  const [size, setSize] = useState(null);
  const {hotel_id}=useParams()
  const{
    hotel,
    isError,
    isFetching,
    isLoading,
    isSuccess 
  }=useGetAHotel(hotel_id)
  
  if(isLoading) return <h1>Loading..</h1>
  console.log(hotel)
  const {hotelName,images}=hotel?.response[0]
  console.log(images)
  return (
    <>
      <XXLDialog className="overflow-hidden sticky" size={size} setSize={setSize} />
      <div className="grid grid-cols-6 grid-rows-[100px,200px,200px,auto,auto] shadow-2xl w-[80%] min-h-[100vh] border-2 gap-3">
      <div className="row-span-1 col-span-6 border-2">
        <h1 className="font-bold mt-10 ms-5">{'hotelName'}</h1>
      </div>
        <div
          onClick={() => {
            setSize("xxl");
          }}
          className="row-span-2 col-span-4 border-2"
        >
          <img src={`${IMAGE_BASE_URL}/${images[1]} `} className="w-full h-full" alt="" />
        </div>
        <div className="row-span-2 col-span-2 border-2"></div>
        {/* <div className="row-span-1 col-span-1 border-2"></div>
        <div className="row-span-1 col-span-1 border-2"></div>
        <div className="row-span-1 col-span-1 border-2"></div> */}

        <div className="row-span-2 col-span-4 border-2"></div>
        <div className="row-span-2 col-span-2 shadow-2xl rounded-lg">
          <div className="flex flex-col ">
            <div className="border-2 h-[400px]">
                <h1 className="text-left font-bold mt-6 ms-4 text-xl"></h1>
            <div className="border-2 p-12">
            <DatePicker label={'Check in'}/>
            <DatePicker label={'Check out'}/>
            <Button className="w-full mt-2" color="red">Reserve</Button>
            </div>
            
            </div>
          
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleHotel;
