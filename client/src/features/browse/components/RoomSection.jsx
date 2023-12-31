import { IMAGE_BASE_URL } from "../../../data/constants";
import { Button } from "@material-tailwind/react";

const RoomSection = ({isAccordionOpen,roomType,rooms,setImages,setSize}) => {
    console.log(rooms)
    console.log(isAccordionOpen)
  return (
    <div className="flex flex-col  shadow-md border-2  m-4">
      <div className="w-full h-[50px] pt-3 ps-3">
        <h1 className="font-bold">{roomType}</h1>
        </div>
        <div className={`flex flex-col justify-between min-h-[200px] ${!isAccordionOpen?'hidden':''}`}>

            {
                rooms?.map(({images,description,bathRoomType,location},index)=>{

                
                return <div className="border-2 flex justify-between p-5">
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
                <div className="border-2 ">
                    <p className="max-w-[25%]  text-center">{}</p>
                </div>
                <div className="border-2 pt-7">{bathRoomType}</div>
                <div className="border-2 pt-7">
                    <Button size="sm">View More</Button>
                </div>
            </div>
            })
            }


        </div>
    </div>
  );
};

export default RoomSection;
