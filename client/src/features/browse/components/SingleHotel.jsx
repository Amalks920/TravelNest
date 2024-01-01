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
      <div className="grid grid-cols-6 grid-rows-[100px,200px,200px,auto,auto] pb-14 shadow-2xl w-[80%] min-h-[100vh] mt-16 border-2 gap-3 px-9">
        <div className="row-span-1 col-span-6 border-2">
          <h2 className="font-bold mt-10 ms-5">{hotelName}</h2>
        </div>
        <div
          onClick={() => {
            setImages(images.slice(0, 6));
            setSize("xxl");
          }}
          className="row-span-2 col-span-4 border-2"
        >
          <img
            src={`${IMAGE_BASE_URL}/${images[1]} `}
            className="w-full h-full rounded-md"
            alt=""
          />
        </div>
        <div
          className={`row-span-1 col-span-2 border-2 bg-cover bg-no-repeat`}
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
          className={`row-span-1 col-span-2 border-2 `}
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

        <div className="flex flex-col  row-span-2 col-span-4 border-2">
          <div className=" h-fit ">
            <h2 className="text-2xl font-bold p-4">{hotelName}</h2>
          </div>
          <div className=" h-fit p-5 font-medium">{description}</div>
          <div className=" h-fit ">{amenities}</div>
          <div className=" h-fit  p-5">
            <h1>Rooms</h1>

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
        <div className="row-span-2 col-span-2 shadow-2xl border-t-2   rounded-lg">
          {/* <div className="flex flex-col ">
            <div className="border-2 h-[400px]">
              <h1 className="text-left font-bold mt-6 ms-4 text-xl"></h1>
              <div className="border-2 p-12">
                <DatePicker label={"Check in"} />
                <DatePicker label={"Check out"} />
                <Button className="w-full mt-2" color="red">
                  Reserve
                </Button>
              </div>
            </div>
          </div> */}
          <PriceCard className={""} />
        </div>
      </div>
    </>
  );
};

export default SingleHotel;
