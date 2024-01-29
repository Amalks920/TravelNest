import { Spinner } from "@material-tailwind/react";
import { useGetAHotelForUserQuery } from "../../browse/services/getAHotelForUserApiSlice";
import { IMAGE_BASE_URL } from "../../../data/constants";


const PaymentDetails=({hotel_id,checkInDate,checkOutDate,totalNoRooms,roomDetails})=>{
    console.log(roomDetails)
    const {data:hotel,isError,isFetching,isLoading,isSuccess,isUninitialized}=useGetAHotelForUserQuery({hotel_id})
    console.log(hotel)
    if(isLoading)  return <Spinner/>
    return (
        <div className="my-8 flex flex-col gap-5">
            <div className="flex justify-between items-center border-b-2 pb-5 px-7 m-3">
            <h2 className="font-bold text-[1.2rem]">{hotel?.response[0]?.hotelName}</h2>  
            <img className="rounded-md" src={`${IMAGE_BASE_URL+hotel?.response[0]?.images[2]}`} alt="" width={250}/>
            </div>

            <div className="flex justify-between items-center border-b-2 pb-5 px-7 m-3">

                <div className="flex flex-col gap-3">
                    <h2 className="uppercase font-medium">Check In</h2>
                    <h2 className="">{checkInDate}</h2>
                </div>
                <div className="flex flex-col gap-3">
                    <h2 className="uppercase">Check out</h2>
                    <h2 className="">{checkOutDate}</h2>
                </div>
                <div className="flex flex-col justify-center">
                    <h2>{totalNoRooms} Rooms | </h2>
                </div>
              
            </div>

            <div className="flex flex-col justify-center  gap-5">
                <div className="flex justify-between">
                <h2 className="uppercase font-bold w-1/3 text-center">{'room Category'}</h2>
                            <h2 className="uppercase font-bold  w-1/3 text-center">{'price'}</h2>
                            <h2  className="uppercase font-bold  w-1/3 text-center">{'noOfRooms'}</h2>   
                </div>
                {
                    roomDetails.map(({roomType,price,noOfRooms},index)=>{
                        return( 
                        <div className="flex justify-between ">
                            <h2 className="uppercase w-1/3  text-center">{roomType}</h2>
                            <h2 className="w-1/3 text-center">{price}</h2>
                            <h2 className="w-1/3 text-center">{noOfRooms} </h2>
                            </div>
                        )
                    })
                }
            </div>
        
        </div>
        
    )
}

export default PaymentDetails;