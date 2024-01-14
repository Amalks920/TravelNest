import { useState } from "react";
import XXLDialog from "../../../components/modals/XXLDialog";
import { Field } from "formik";
import { Select, Button, Spinner } from "@material-tailwind/react";
import { FormInput } from "../../../components/form/FormInput";
import DatePicker from "../../../components/form/DatePicker";
import { useParams } from "react-router-dom";
import useGetAHotel from "../hooks/useGetAHotel";
import { IMAGE_BASE_URL } from "../../../data/constants";
import RoomSection from "./RoomSection";
import PriceCard from "./PriceCard";
import CheckInCheckOutModal from "./CheckInCheckOutModal";
import { useSelector } from "react-redux";
import { selectRooms } from "../services/roomsSlice";

const SingleHotel = () => {
  const [size, setSize] = useState(null);
  const [imagesToPass, setImages] = useState([]);
  const [isAccordionOpen, setIsAccordionOpen] = useState(-1);
  const [price, setPrice] = useState(0);
  const roomss = useSelector(selectRooms);

  const { hotel_id } = useParams();
  const { hotel, isError, isFetching, isLoading, isSuccess } =
    useGetAHotel(hotel_id);

  if (isLoading || isFetching) return <h1><Spinner className="h-12 w-12" /></h1>;
  console.log(hotel);
  const { hotelName, images, description, amenities } = hotel?.response[0];

  const rooms = hotel?.response[1];
  console.log(rooms);

  // const [open, setOpen] = useState(false);

  return (
    <>
      {/* <PriceCard className={''}/> */}

      <XXLDialog
        className="overflow-hidden sticky !w-[80vw]"
        size={size}
        imagesToDisplayOnModal={imagesToPass}
        setSize={setSize}
      />
      {/* 
      modal for asking checkin checkout
      */}
      <CheckInCheckOutModal hotel_id={hotel_id} />

      <div className="grid grid-cols-12 grid-rows-[100px,200px,200px,auto,auto] pb-14  w-[100%] min-h-[100vh] mt-16  gap-2 px-9 shadow-2xl">
        <div className="row-span-1 col-start-1 md:col-start-2 col-span-12">
          <h2 className="font-bold mt-11 ms-2 text-[1rem] sm:text-2xl">{hotelName}</h2>
        </div>
        <div
          onClick={() => {
            setImages(images.slice(0, 6));
            setSize("xxl");
          }}
          className="row-span-1 md:row-span-2 col-span-12 md:col-start-2 md:col-end-8 border-2 shadow-md cursor-pointer"
        >
          <img
            src={`${IMAGE_BASE_URL}/${images[1]} `}
            className="w-full h-full rounded-md"
            alt=""
          />
        </div>
        <div
          className={`md:block grid row-span-1 col-span-2 border-2 bg-cover bg-no-repeat shadow-md rounded-md`}
          style={{
            backgroundImage: `url(${IMAGE_BASE_URL}/${rooms[0]?.rooms[0]?.images[0]} )`,
          }}
        >
          {/* <img
            className="w-[100%] h-[100%]"
            src={`${IMAGE_BASE_URL}/${rooms[0].rooms[0].images[0]} `}
            alt=""
          /> */}
        </div>
        <div
          className={`row-span-1 col-span-2 border-2 shadow-md rounded-md`}
          style={{
            backgroundImage: `url(${IMAGE_BASE_URL}/${rooms[0]?.rooms[0]?.images[0]} )`,
          }}
        >
        </div>
        <div
          className={`row-span-1 col-start-8 col-end-10 border-2 shadow-md rounded-md`}
          style={{
            backgroundImage: `url(${IMAGE_BASE_URL}/${rooms[0]?.rooms[0]?.images[0]} )`,
          }}
        >
        </div>
        <div
          className={`row-span-1 col-span-2 border-2 shadow-md rounded-md`}
          style={{
            backgroundImage: `url(${IMAGE_BASE_URL}/${rooms[0]?.rooms[0]?.images[0]} )`,
          }}
        >
        </div>

        <div className="flex flex-col  row-span-2  md:col-start-2 md:col-span-7 col-span-12 shadow-md">
          <div className=" h-fit ">
            <h2 className="text-2xl font-bold p-4"></h2>
          </div>
          <div className=" h-fit font-medium  text-left ps-3 leading-8">
            {description}
          </div>
          <div className=" h-fit ">{amenities}</div>
          <div className=" h-fit ">
            <h1 className="font-bold text-2xl  mt-20 ms-5">Choose Your Room</h1>

            {!roomss && <h1>RoomsList Empty</h1>}
            {roomss &&
              roomss?.map((room, index) => {
                return (
                  <div
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
        <div className="row-span-1 md:block hidden border-2 col-span-3  border-t-2   rounded-lg">
          <PriceCard price={price} className={""} />
        </div>
      </div>
    </>
  );
};

export default SingleHotel;
