import { useSelector } from "react-redux";
import useGetProfileDetails from "../hooks/useGetProfileDetails";
import { selectUserId } from "../../authentication/services/loginSlice";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const UserDetails = () => {
  const user_id = useSelector(selectUserId);
  const [isWalletHistoryHidden,setIsWalletHistoryHidden]=useState(true)

  const {
    userInfo,
    isUserInfoError,
    isUserInfoSuccess,
    isUserInfoLoading,
    isUserInfoUnInitialized,

    walletInfo,
    isWalletError,
    isWalletLoading,
    isWalletFetching,
    isWalletUninitialized,
  } = useGetProfileDetails(user_id);

 
//  return (
//     <div className="flex lg:flex-row flex-col   flex-grow ">
//       <div className="lg:w-[25%] lg:min-h-[100vh] flex justify-center pt-8 lg:border-2 ">
//         <div className=" lg:w-[250px] w-[150px] h-[150px] xl:h-[200px] xl:w-[200px] lg:h-[250px] rounded-full  shadow-md bg-blue-gray-50">
//           {" "}
//         </div>
//       </div>

//       <div className="lg:w-[75%]  h-fit grid grid-flow-row grid-cols-2 lg:mx-[100px]  rounded-md gap-5 lg:mt-0 lg:px-0 px-6">
//         {/* <div className="lg:col-span-1  col-span-full lg:h-[150px] h-[100px]  flex w-full shadow-xl rounded-sm lg:mt-0 mt-8 border-2">
//           <div className="flex justify-around items-center h-full w-full">
//             <h2 className="font-bold">Wallet Balance</h2>
//             <h2>{walletInfo?.amount}</h2>
//           </div>
//         </div> */}

//         <div className="lg:col-span-1  col-span-full lg:h-[150px] h-[100px]  flex w-full shadow-sm rounded-sm lg:mt-0 mt-8">
//           <div className="flex justify-around items-center h-full w-full">
//             {/* <h2 className="font-bold">user name</h2>
//             <div className="flex">
//               <h2 className="">{userInfo?.username}</h2>
//               <PencilIcon width={12} className="cursor-pointer me-6 ms-5" />
//             </div> */}
//           </div>
//         </div>
//         <div className="lg:col-span-1  col-span-full lg:h-[150px] h-[100px]  flex w-full shadow-sm  rounded-sm lg:mt-0 mt-8">
//           <div className="flex justify-around items-center h-full w-full">
//             {/* <h2 className="font-bold">user name</h2>
//             <div className="flex">
//               <h2 className="">{userInfo?.username}</h2>
//               <PencilIcon width={12} className="cursor-pointer me-6 ms-5" />
//             </div> */}
//           </div>
//         </div>
//         <div className="lg:col-span-1  col-span-full lg:h-[150px] h-[100px]  flex w-full shadow-sm border rounded-sm lg:mt-0 mt-8">
//           <div className="flex justify-around items-center h-full w-full">
//             <h2 className="font-normal uppercase">user name</h2>
//             <div className="flex">
//               <h2 className="">{userInfo?.username}</h2>
//               <PencilIcon width={12} className="cursor-pointer me-6 ms-5" />
//             </div>
//           </div>
//         </div>

//         <div className="lg:col-span-1  col-span-full lg:h-[150px] h-[100px]  flex w-full shadow-sm border rounded-sm lg:mt-0 mt-8">
//           <div className="flex justify-around items-center h-full w-full">
//             <h2 className="font-normal uppercase">user Email</h2>
//             <div className="flex">
//               <h2 className="">{userInfo?.email}</h2>
//               <PencilIcon width={12} className="cursor-pointer me-6 ms-5" />
//             </div>
//           </div>
//         </div>

//         <div className="lg:col-span-1  col-span-full lg:h-[150px] h-[100px]  flex w-full shadow-sm border rounded-sm lg:mt-0 mt-8">
//           <div className="flex justify-around items-center h-full w-full">
//             <h2 className="font-normal uppercase">user phone</h2>
//             <div className="flex">
//               <h2 className="">{userInfo?.phone}</h2>
//               <PencilIcon width={12} className="cursor-pointer me-6 ms-5" />
//             </div>
//           </div>
//         </div>
        
//         <div className="lg:col-span-1  col-span-full lg:h-[150px] h-[100px]  flex w-full shadow-sm border rounded-sm lg:mt-0 mt-8">
//           <div className="flex justify-around items-center h-full w-full">
//             <h2 className="font-normal uppercase">user phone</h2>
//             <div className="flex">
//               <h2 className="">{userInfo?.phone}</h2>
//               <PencilIcon width={12} className="cursor-pointer me-6 ms-5" />
//             </div>
//           </div>
//         </div>


//         <div className="lg:col-span-1  col-span-full lg:h-[150px] h-[100px]  flex w-full shadow-sm border rounded-sm lg:mt-0 mt-8">
//           <div className="flex justify-around items-center h-full w-full">
//             <h2 className="font-normal uppercase">Wallet Balance</h2>
//             <h2 className="font-bold">₹ {walletInfo?.amount}</h2>
      
//           </div>
          
//         </div>
//       </div>
//     </div>
//   )

return (
  <div className=" w-full min-h-[100vh] flex flex-col items-center justify-start pt-[100px] flex-grow">
       <div className=" w-[50%] h-[400px] flex flex-col">
          <div className="flex  w-full h-1/4 bg-gray-900 rounded-md ">
            <div className="w-1/3">
              <div className="w-[110px] h-[110px]  shadow-2xl  rounded-full top-4  left-9 relative bg-white"></div>
            </div>
         
            <div className=" flex-grow">
              <div className="flex justify-left items-center h-full">
                <h2 className="text-white text-[1.6rem] capitalize font-bold">Hi,{userInfo?.username}</h2>
              </div>
            </div>
          </div>

    {/* Account Details */}
          <div className="flex  w-full flex-grow ">
            <div className="w-full border-2 ps-[7%] shadow-2xl  grid grid-rows-[60px,60px,60px,60px,60px] grid-cols-3 pt-14">
              <h2 className="text-[1.4rem] mb-7 row-span-1 col-span-full">Account Details</h2>
              {/* <div className="flex justify-between me-16 mb-5"> */}
                <div className="col-span-1 row-span-1"><h2>Email</h2></div>
                <div className="col-span-1 row-span-1"><h2>{userInfo?.email}</h2></div>
                <div className="col-span-1 row-span-1"> <PencilIcon width={17} className="cursor-pointer me-6 ms-5" /></div>

                <div className="col-span-1 row-span-1"><h2>Phone</h2></div>
                <div className="col-span-1 row-span-1"><h2>{userInfo?.phone}</h2></div>
                <div className="col-span-1 row-span-1"> <PencilIcon width={17} className="cursor-pointer me-6 ms-5" /></div>

                <div className="col-span-1 row-span-1"><h2>Username</h2></div>
                <div className="col-span-1 row-span-1"><h2>{userInfo?.username}</h2></div>
                <div className="col-span-1 row-span-1"> <PencilIcon width={17} className="cursor-pointer me-6 ms-5" /></div>      

                
                <div className="col-span-1 row-span-1"><h2>Wallet Balance</h2></div>
                <div className="col-span-1 row-span-1"><h2>₹ {walletInfo?.amount}</h2></div>
                <div className="col-span-1 row-span-1"><Link to={`/wallet-history/${walletInfo?._id}`}><Button size="sm">view history</Button></Link></div>
            </div>
           
           
          </div>

          {/* Personal Details */}

          
       </div>
  </div>
)



};

export default UserDetails;
