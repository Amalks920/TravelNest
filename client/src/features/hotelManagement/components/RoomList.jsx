import { Card, Typography,Button } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { useGetRoomsQuery } from "../services/roomsApiSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addRooms } from "../services/hotelListSlice";
import { Link } from "react-router-dom";
const TABLE_HEAD = ["SL NO", "Room Type", "No of Rooms", "View More"];
 
const TABLE_ROWS = [
  {
    name: "John Michael",
    job: "Manager",
    date: "23/04/18",
  },
  {
    name: "Alexa Liras",
    job: "Developer",
    date: "23/04/18",
  },
  {
    name: "Laurent Perrier",
    job: "Executive",
    date: "19/09/17",
  },
  {
    name: "Michael Levi",
    job: "Developer",
    date: "24/12/08",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
  },
];


const RoomList=()=>{

    const {_id}=useParams() 
    const dispatch=useDispatch()
    const {data:rooms,isLoading,isSuccess,isError,error}=useGetRoomsQuery({_id});

    isSuccess && console.log(rooms)
    useEffect(()=>{
      isSuccess && dispatch(addRooms(rooms.response))
    },[isSuccess])

    return (
      //   <Card className="h-full w-full overflow-scroll">
      //   <table className="w-full min-w-max table-auto text-left">
      //     <thead>
      //       <tr>
      //         {TABLE_HEAD.map((head) => (
      //           <th
      //             key={head}
      //             className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
      //           >
      //             <Typography
      //               variant="small"
      //               color="blue-gray"
      //               className="font-normal leading-none opacity-70"
      //             >
      //               {head}
      //             </Typography>
      //           </th>
      //         ))}
      //       </tr>
      //     </thead>
      //     <tbody>
      //       {TABLE_ROWS.map(({ name, job, date }, index) => {
      //         const isLast = index === TABLE_ROWS.length - 1;
      //         const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
   
      //         return (
      //           <tr key={name}>
      //             <td className={classes}>
      //               <Typography
      //                 variant="small"
      //                 color="blue-gray"
      //                 className="font-normal"
      //               >
      //                 {name}
      //               </Typography>
      //             </td>
      //             <td className={classes}>
      //               <Typography
      //                 variant="small"
      //                 color="blue-gray"
      //                 className="font-normal"
      //               >
      //                 {job}
      //               </Typography>
      //             </td>
      //             <td className={classes}>
      //               <Typography
      //                 variant="small"
      //                 color="blue-gray"
      //                 className="font-normal"
      //               >
      //                 {date}
      //               </Typography>
      //             </td>
      //             <td className={classes}>
      //               <Typography
      //                 as="a"
      //                 href="#"
      //                 variant="small"
      //                 color="blue-gray"
      //                 className="font-medium"
      //               >
      //                 Edit
      //               </Typography>
      //             </td>
      //           </tr>
      //         );
      //       })}
      //     </tbody>
      //   </table>
      // </Card>
      <>
           <h1 className="text-center text-2xl relative -top-28 left-[50%]">Rooms</h1>
      <Card className="bg-white w-full h-fit m-28">
   
        <table className="w-full min-w-max table-auto text-left">
          <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-black bg-gray-800 text-white font-bold p-4"
              >
                <Typography
                  variant="small"
                  color="white"
                  className="font-normal leading-none opacity-70 text-center"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
          </thead>

          <tbody>
          {rooms?.response.map(({ roomType,count }, index) => {
            const isLast = index === TABLE_ROWS.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
            return (
              <tr key={index} className="text-center">
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {index+1}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {roomType}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {count}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    <Link className="text-[0.7rem] text-blue-400">View More Details</Link>
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
        </table>
      </Card>
      </>
    )
}

export default RoomList;