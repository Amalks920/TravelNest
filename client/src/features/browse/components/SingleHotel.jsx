import { useState } from "react";
import XXLDialog from "../../../components/modals/XXLDialog";
import { Field } from "formik";
import { Select, Button, Spinner } from "@material-tailwind/react";
import { FormInput } from "../../../components/form/FormInput";
import DatePicker from "../../../components/form/DatePicker";
import { Link, useParams } from "react-router-dom";
import useGetAHotel from "../hooks/useGetAHotel";
import { IMAGE_BASE_URL } from "../../../data/constants";
import RoomSection from "./RoomSection";
import PriceCard from "./PriceCard";
import CheckInCheckOutModal from "./CheckInCheckOutModal";
import { useSelector } from "react-redux";
import { selectRooms } from "../services/roomsSlice";
import { selectCheckIn, selectCheckOut } from "../services/priceSlice";
import ReviewSection from "./ReviewSection";

const SingleHotel = () => {
  const [size, setSize] = useState(null);
  const [imagesToPass, setImages] = useState([]);
  const [isAccordionOpen, setIsAccordionOpen] = useState(-1);
  const [price, setPrice] = useState(0);
  const roomss = useSelector(selectRooms);
  // const checkIn=useSelector(selectCheckIn);
  // const checkOut=useSelector(selectCheckOut)

  const { hotel_id } = useParams();
  const { hotel, isError, isFetching, isLoading, isSuccess, isUninitialized } =
    useGetAHotel(hotel_id);

    const isPageReady= isLoading || isFetching || isUninitialized

  if (isPageReady) return <h1><Spinner className="h-12 w-12" /></h1>;

  const { hotelName, images, description, amenities } = hotel?.response[0];

  const rooms = hotel?.response[1];
  const reviews=hotel?.response[2];
  
  return (
    <>
 

      <XXLDialog
        className="overflow-hidden sticky !w-[80vw]"
        size={size}
        imagesToDisplayOnModal={imagesToPass}
        setSize={setSize}
      />

      <CheckInCheckOutModal hotel_id={hotel_id} />
      

      <div className="grid grid-cols-12 grid-rows-[100px,200px,200px,auto,auto,auto] pb-14  w-[100%] min-h-[100vh] mt-16  gap-2 px-9 shadow-2xl">
        <div className="row-span-1 col-start-1 md:col-start-2 col-span-10 ">
          <h2 className="font-bold mt-11 ms-2 text-[1rem] sm:text-2xl">{hotelName}</h2>
          
        </div>
        <div
          onClick={() => {
            setImages(images.slice(0, 6));
            setSize("xxl");
          }}
          className="row-span-1 md:row-span-2 sm:row-span-2 xl:row-span-2 col-span-12 xl:col-start-2 xl:col-end-8 border-2 shadow-md cursor-pointer"
        >
          <img
            src={`${IMAGE_BASE_URL}/${images[1]} `}
            className="w-full h-full rounded-md"
            alt=""
          />
        </div>
        <div
          className={` hidden  2xl:grid row-span-1 col-span-2 border-2 bg-cover bg-no-repeat shadow-md rounded-md`}
          style={{
            backgroundImage: `url(${IMAGE_BASE_URL}/${rooms[0]?.rooms[0]?.images[0]} )`,
          }}
        >

        </div>
        <div
          className={`hidden 2xl:block row-span-1 col-span-2 border-2 shadow-md rounded-md`}
          style={{
            backgroundImage: `url(${IMAGE_BASE_URL}/${rooms[0]?.rooms[0]?.images[0]} )`,
          }}
        >
        </div>
        <div
          className={`hidden 2xl:block row-span-1 col-start-8 col-end-10 border-2 shadow-md rounded-md`}
          style={{
            backgroundImage: `url(${IMAGE_BASE_URL}/${rooms[0]?.rooms[0]?.images[0]} )`,
          }}
        >
        </div>
        <div
          className={`hidden 2xl:block row-span-1 col-span-2 border-2 shadow-md rounded-md`}
          style={{
            backgroundImage: `url(${IMAGE_BASE_URL}/${rooms[0]?.rooms[0]?.images[0]} )`,
          }}
        >
        </div>

        <div className="flex flex-col  row-span-2  md:col-start-2 md:col-span-7 col-span-12 shadow-md max-h-[100vh] overflow-scroll"
          
        >
          <div className=" h-fit ">
            <h2 className="text-2xl font-bold p-4"></h2>
          </div>
          <div className=" h-fit font-medium  text-left ps-3 text-[0.9rem] leading-8">
          <h2 className="font-bold text-xl  mb-4 ">About</h2>
            <h2 className="w-[80%]" >{description}</h2>
          </div>
          <div className=" h-fit font-medium  text-left ps-3 text-[0.9rem] leading-8 mt-8 ms-4">
          <button className="border-2 border-black px-3  text-[0.7rem] rounded-lg me-4"><Link to={'/chat'}>CHAT WITH OWNER</Link></button>
          </div>


          <div className=" h-fit ">{amenities}</div>
          <div className=" h-fit mt-12 ms-5">
            <h2 className="font-bold text-xl   mb-2">Choose Your Room</h2>

            {!roomss && <h1>RoomsList Empty</h1>}
            {roomss &&
              roomss?.map((room, index) => {
                return (
                  <div
                    className="flex  items-center"
                    key={index}
                    onClick={() => {
                      setIsAccordionOpen(index);
                    }}
                  >
                    <RoomSection
                      setImages={setImages}
                      setSize={setSize}
                      isAccordionOpen={isAccordionOpen === index}
                      roomType={room._id}
                      rooms={room.rooms}
                    />
                  </div>
                );
              })}
          </div>
        </div>
        <div className="row-span-1 md:block hidden border-2 col-span-3  border-t-2   rounded-lg ms-5">
          <PriceCard price={price} className={""} />
        </div>

        <div className="row-span-2 col-span-8  flex flex-col ms-[120px] mt-11 ">
        <h2 className="font-bold text-[1.2rem] pt-2 ps-5 mb-9">Reviews & Ratings</h2>         
          <ReviewSection reviews={reviews}/>   
        </div>
      </div>
    </>
  );
};

export default SingleHotel;
