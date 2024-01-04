import { Button, Checkbox } from "@material-tailwind/react";
import { useState } from "react";
import { IMAGE_BASE_URL } from "../../../data/constants";
import { RoomDetailsModal } from "./RoomDetailsModal";

const SingleRoomComponent = ({
  images,
  description,
  bathRoomType,
  location,
  rate,
  amenities,
  index,
  setImages,
  setSize
}) => {
  const [viewDetailsModal, setViewDetailsModal] = useState(false);
  const [room, setRoom] = useState([]);

  return (
    <>
      <RoomDetailsModal
        viewDetailsModal={viewDetailsModal}
        setViewDetailsModal={setViewDetailsModal}
        room={room}
      />
      <div className="border-2 flex justify-between p-5">
        <div className="mt-7">
          <Checkbox
            onClick={() => {
              setChecked(!checked);
              checked === true ? setInputModalOpen(!inputModalOpen) : null;
            }}
          />
        </div>
        <div
          onClick={() => {
            setSize("xxl");
            setImages(images.slice(0, 6));
          }}
          className="max-w-[25%] h-full bg-cover rounded-lg"
          style={{ backgroundImage: `url(${IMAGE_BASE_URL}/${images[0]} )` }}
        >
          <div className="relative  h-[100px] min-w-[400px]"></div>
        </div>
        <div className=" ">
          <p className="max-w-[25%]  text-center">{}</p>
        </div>
        <div className=" pt-7">
          {/* <p className="font-bold">bathroom type :</p>
                   <p className="text-center">{bathRoomType}</p> */}
        </div>
        <div className=" pt-7">
          <Button
            onClick={() => {
              setRoom({
                images,
                description,
                bathRoomType,
                location,
                rate,
                amenities,
              });
              setViewDetailsModal(!viewDetailsModal);
            }}
            size="sm"
          >
            View More
          </Button>
        </div>
      </div>
    </>
  );
};

export default SingleRoomComponent;
