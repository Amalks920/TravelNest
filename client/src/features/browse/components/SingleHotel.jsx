import { useState } from "react";
import XXLDialog from "../../../components/modals/XXLDialog";
import { Field } from "formik";
import { Select, Button } from "@material-tailwind/react";
import { FormInput } from "../../../components/form/FormInput";
import DatePicker from "../../../components/form/DatePicker";
import { useParams } from "react-router-dom";
import useGetAHotel from "../hooks/useGetAHotel";
import { IMAGE_BASE_URL } from "../../../data/constants";
import RoomSection from "./RoomSection";
import PriceCard from "./PriceCard";

const SingleHotel = () => {
  const [size, setSize] = useState(null);
  const [imagesToPass, setImages] = useState([]);
  const [isAccordionOpen, setIsAccordionOpen] = useState(-1);
  const [price,setPrice]=useState(0);

  const { hotel_id } = useParams();
  const { hotel, isError, isFetching, isLoading, isSuccess } =
    useGetAHotel(hotel_id);

  if (isLoading || isFetching) return <h1>Loading..</h1>;
  console.log(hotel);
  const { hotelName, images, description, amenities } = hotel?.response[0];

  const rooms = hotel?.response[1];
  console.log(rooms);
  return (
    <>
      {/* <PriceCard className={''}/> */}

      <XXLDialog
        className="overflow-hidden sticky !w-[80vw]"
        size={size}
        imagesToDisplayOnModal={imagesToPass}
        setSize={setSize}
      />
      
      <div className="grid grid-cols-12 grid-rows-[100px,200px,200px,auto,auto] pb-14  w-[100%] min-h-[100vh] mt-16  gap-3 px-9">
        <div className="row-span-1 col-start-2 col-span-6 border-2">
          <h2 className="font-bold mt-10 ms-5">{hotelName}</h2>
        </div>
        <div
          onClick={() => {
            setImages(images.slice(0, 6));
            setSize("xxl");
          }}
          className="row-span-2 col-start-2 col-end-8 border-2 "
        >
          <img
            src={`${IMAGE_BASE_URL}/${images[1]} `}
            className="w-full h-full rounded-md"
            alt=""
          />
        </div>
        <div
          className={`row-span-1 col-span-4 border-2 bg-cover bg-no-repeat`}
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
          className={`row-span-1 col-span-4 border-2 `}
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

        <div className="flex flex-col  row-span-2  col-start-2 col-span-7  border-2">
          <div className=" h-fit ">
            <h2 className="text-2xl font-bold p-4">{hotelName}</h2>
          </div>
          <div className=" h-fit p-5 font-medium">{description}</div>
          <div className=" h-fit ">{amenities}</div>
          <div className=" h-fit ">
            <h1 className="font-bold text-2xl ms-5">Choose Your Room</h1>

            {!rooms && <h1>RoomsList Empty</h1> }
            {rooms && rooms?.map((room, index) => {
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
        <div className="row-span-1 border-2 col-span-3  border-t-2   rounded-lg">

          <PriceCard price={price} className={""} />
        </div>
      </div>
    </>
  );
};

export default SingleHotel;
