import { useState } from "react";
import { IMAGE_BASE_URL } from "../../../data/constants";
import { Button, Checkbox } from "@material-tailwind/react";
import { InputModal } from "./InputModal";
import { RoomDetailsModal } from "./RoomDetailsModal";

const RoomSection = ({isAccordionOpen,roomType,rooms,setImages,setSize}) => {

  // const [inputModalOpen,setInputModalOpen]=useState(false)
  
  // const [checked,setChecked]=useState(false)

  const [viewDetailsModal, setViewDetailsModal] = useState(false);
  const [room,setRoom]=useState([])
  return (
<>
<RoomDetailsModal viewDetailsModal={viewDetailsModal} setViewDetailsModal={setViewDetailsModal} room={room}/>
    {/* <InputModal  inputModalOpen={inputModalOpen} setInputModalOpen={setInputModalOpen}/> */}
    <div className="flex flex-col  shadow-md border-2  m-4">
      <div className="w-full h-[50px] pt-3 ps-3">
        <h1 className="font-bold">{roomType}</h1>
        </div>
        <div className={`flex flex-col justify-between min-h-[200px] ${!isAccordionOpen?'hidden':''}`}>

            {
                rooms?.map(({images,description,bathRoomType,location,rate,amenities},index)=>{


                return <div className="border-2 flex justify-between p-5">
                  <div className="mt-7">
                    <Checkbox onClick={()=>{
                      setChecked(!checked)
                      checked===true?setInputModalOpen(!inputModalOpen):null
                    }}/>
                  </div>
                <div onClick={()=>{
                    setSize('xxl')
                    setImages(images.slice(0,6))
                }}
                  className="max-w-[25%] h-full bg-cover rounded-lg"
                style={{backgroundImage:`url(${IMAGE_BASE_URL}/${images[0]} )`}}
                    
                >
                   
                  <div className="relative  h-[100px] min-w-[400px]"> 

                    </div>  
                  
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
                    onClick={()=>{
                      setRoom({
                        images,
                        description,
                        bathRoomType,
                        location,
                        rate,
                        amenities
                      })
                      setViewDetailsModal(!viewDetailsModal)
                     
                    }}
                     size="sm">View More</Button>
                </div>
            </div>
            })
            }


        </div>
    </div>
</>
  );
};

export default RoomSection;
