import { Button } from "@material-tailwind/react";
import { IMAGE_BASE_URL } from "../../../data/constants";
import { Link } from "react-router-dom";


const HotelListSection=({hotel})=>{

    return (

     

        <div className="">
        {/* <div className="min-h-[100px] border-2 mb-3 ">

        </div> */}
        <div className="grid grid-flow-row grid-cols-[35%,10%,55%] mb-14 h-[300px] m-[5%] shadow-2xl p-2 "
        >


            <div className="border-2  max-h-[300px] bg-no-repeat bg-cover rounded-sm"
        style={{backgroundImage:`url(${IMAGE_BASE_URL}/${hotel?.images[1]})`}}
            >
                {/* <img src={`${IMAGE_BASE_URL}/${hotel?.images[0]}`} alt="" /> */}
            </div>
            

            <div className="border-2 flex flex-col gap-1 px-1  ">
                {
                    hotel?.images.slice(0,3).map((image,index)=>{
                        return <div key={index} className="h-1/3 pb-3 overflow-scroll bg-cover bg-no-repeat rounded-sm" style={{backgroundImage:`url(${IMAGE_BASE_URL}/${image})`}}></div>
                    })
                }
            </div>
            <div className="border-2 p-5 flex flex-col justify-between flex-grow-0">
                <div>
               <h2 className="text-xl  text-[1rem]">{hotel?.hotelName}</h2>
               <p className="text-[0.9rem] mt-2 ps-1 font-light">{hotel?.location}</p>
               </div>

                <div className=" flex justify-end">
                    <div className="font-bold text-[0.9rem]">{'₹ '+999}</div>
               {/* <h2 className="text-xl ">{hotel?.hotelName}</h2>
               <p className="text-xl mt-2 ps-1 ">{hotel?.location}</p> */}
               </div>
                <div className="flex justify-between">
                    <div className="max-w-[200px] overflow-hidden text-[0.7rem]">{hotel?.description.slice(0,10)}</div>
                    <div>
                   <Link to={`/hotel-details/${hotel?._id}`}><Button size="sm" className="bg-white border-2 border-gray-600 px-4 py-2 text-gray-500 font-light text-[0.6rem]">view details</Button></Link> 

                    </div>
                    {/* <div>
                        <Button className="bg-green-700 px-4 py-2 text-white">view details</Button>
                    </div> */}
               </div>
            </div>
        </div>
        </div>
       
    )
}

export default HotelListSection;