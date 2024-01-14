import { Button, Checkbox } from "@material-tailwind/react";
import { useRef, useState } from "react";
import { IMAGE_BASE_URL } from "../../../data/constants";
import { RoomDetailsModal } from "./RoomDetailsModal";
import { useDispatch, useSelector } from "react-redux";
import { removeUnCheckedRoomId, selectCheckedRoomById, selectCheckedRooms, selectIsModalOpen, selectNoOfRooms, updateHotelId, updateIsModalOpen, updatePrice, updateRoomId } from "../services/priceSlice";
import { InputModal } from "./InputModal";

const SingleRoomComponent = ({
  id,
  hotel_id,
  images,
  description,
  bathRoomType,
  location,
  rate,
  amenities,
  index,
  setImages,
  setSize,
}) => {
  const [viewDetailsModal, setViewDetailsModal] = useState(false);
  const [room, setRoom] = useState([]);
  const isModalOpen=useSelector(selectIsModalOpen)
  const noOfRooms=useSelector(selectNoOfRooms)
  const isRoomCheckedOrNot=useSelector((state)=>selectCheckedRoomById(state,id))
  const selectedRoom=useSelector(selectCheckedRooms)
  const dispatch=useDispatch()

  return (
    <>
      {/* <RoomDetailsModal
        viewDetailsModal={viewDetailsModal}
        setViewDetailsModal={setViewDetailsModal}
        room={room}
      /> */}

{console.log(id,description)}
    
       <InputModal inputModalOpen={isModalOpen} id={id} description={description}/>
      
      <div className="border-2 grid grid-rows-[auto,auto,auto] grid-cols-4">
        <div className="col-span-1 border-2 flex justify-center">
          <Checkbox 
            checked={isRoomCheckedOrNot?.id===id}
            onClick={(e) => {  
              if(isRoomCheckedOrNot?.id!=id){
                console.log('sldjlsdjldsdskjdslkjsl')
                console.log(id)
                dispatch(updatePrice(rate))
                dispatch(updateRoomId(id))
                dispatch(updateHotelId(hotel_id))
                dispatch(updateIsModalOpen(!isModalOpen))
              }else{
                dispatch(removeUnCheckedRoomId(id))
              }
             
              // setChecked(!checked);
              // checked === true ? setInputModalOpen(!inputModalOpen) : null;
            }}
          />
        </div>

        <div
          onClick={() => {
            setSize("xxl");
            setImages(images.slice(0, 6));
          }}
          className="max-w-[100%] h-fit m-1 bg-cover rounded-xl col-span-2 border-2 "
          style={{ backgroundImage: `url(${IMAGE_BASE_URL}/${images[0]} )` }}
        >
          <div className="relative  bg-fixed  h-[100px] min-w-fit border-2 border-black"></div>
        </div>

        <div className="col-span-full max-w-[100%] border-2">    
            <h2 className="text-[0.9rem] text-center m-3 font-bold">Description</h2>
            <div className="m-3 ms-6">{description}</div>
        </div>

        <div className="col-span-1 flex max-w-[100%]  border-2">    
          <h2 className="text-[0.9rem] w-1/2 text-center m-3 font-bold">Price</h2>
          <div className="m-3 ms-6 flex justify-center">{rate}</div>
      </div>

        <div className="col-span-3 flex max-w-[100%]  border-2">     
          <h2 className="text-[0.9rem] w-1/2 text-center m-3 font-bold">Bathroom Type</h2>
          <div className="m-3 ms-6 flex justify-center">{bathRoomType}</div>
      </div>
      </div>
      {/* <div className="border-2 flex justify-between p-5">
        <div className="mt-7  border-2">
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
          className="max-w-[25%] h-full bg-cover rounded-lg  border-2"
          style={{ backgroundImage: `url(${IMAGE_BASE_URL}/${images[0]} )` }}
        >
          <div className="relative  h-[100px] min-w-[400px] border-2"></div>
        </div>

        <div className="  border-2">
          <p className="max-w-[25%]  text-center">{}</p>
        </div>

        <div className=" pt-7 border-2">
        </div>

        <div className=" pt-7 border-2">
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

      </div> */}
    </>
  );
};

export default SingleRoomComponent;
