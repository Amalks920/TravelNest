import { PencilIcon } from "@heroicons/react/24/solid"
import { Input } from "@material-tailwind/react"
import { useEditRoomDescriptionMutation } from "../services/editRoomDetailsApiSlice"
import { InputModal } from "./InputModal"
import { useState } from "react"
import { RoomEditInput } from "./RoomEditInput"


const Row=({room})=>{
  const [inputModalOpen, setInputModalOpen] = useState(false);
  const [InputDetailsToPass, setInputDetails] = useState(null);

    return (
  <>
        {inputModalOpen && (
        <RoomEditInput
          inputModalOpen={inputModalOpen}
          setInputModalOpen={setInputModalOpen}
          InputDetailsToPass={InputDetailsToPass}
          _id={room?._id}
        />
      )}

      <div className="grid grid-rows-[auto,auto,auto,auto] gap-3 grid-flow-col  p-4">
      <div className=" flex justify-start items-center p-2">Description</div>
      <div className=" flex justify-start items-center p-2">Location</div>
      <div className=" flex justify-start items-center p-2">Description</div>
      <div className=" flex justify-start items-center p-2">
        upload images
      </div> 

      <div className="p-3  text-[0.9rem] ">
        {/* {isLoading ? (
          <Spinner className="h-6 w-6 relative left-16" />
        ) : (
          
        )} */}
       <h2 className="max-w-[500px]">{room?.description}</h2> 
      </div>
      <div className="p-3 text-[0.9rem]">{room?.location}</div>
      <div className="max-w-[500px] p-3 text-[0.9rem]">
        {''}
      </div>

      <div className="max-w-[500px] p-3 text-[0.9rem]">
        <Input size="sm" className="w-[50%]" type="file" accept="image/*" />
      </div>

      <div className=" flex justify-center">
        <PencilIcon
          onClick={() => {
            setInputModalOpen(true);
            setInputDetails({
              name: "description",
              label: "room description",
              type: "text",
              value: room?.description,
            });
          }}
          width={15}
          className="cursor-pointer me-6"
        />
      </div>
      <div className="flex justify-center">
        {/* <PencilIcon
          onClick={() => {
            setInputModalOpen(true);
            setInputDetails({
              name: "location",
              label: "Location",
              type: "text",
              value: hotel?.location,
            });
          }}
          width={15}
          className="cursor-pointer me-6"
        /> */}
      </div>
      <div className="flex justify-center">
        {/* <PencilIcon
          onClick={() => {
            setInputModalOpen(true);
            setInputDetails({
              name: "description",
              label: "description",
              type: "text",
              value: hotel?.description,
            });
          }}
          width={15}
          className="cursor-pointer me-6"
        /> */}
      </div>
      <div className="flex justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 mt-4 -ms-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
          />
        </svg>
      </div>
      
    </div>
  </>
    )
}

export default Row