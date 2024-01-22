import { useSelector } from "react-redux";
import useGetProfileDetails from "../hooks/useGetProfileDetails";
import { selectUserId } from "../../authentication/services/loginSlice";

const UserDetails = () => {
  const user_id = useSelector(selectUserId);

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

  console.log(walletInfo, userInfo);
  return (
    <div className="flex lg:flex-row flex-col   flex-grow ">
      <div className="lg:w-[25%] lg:min-h-[100vh] flex justify-center pt-8 lg:border-2 ">
        <div className=" lg:w-[250px] w-[150px] h-[150px] xl:h-[200px] xl:w-[200px] lg:h-[250px] rounded-full  shadow-md bg-blue-gray-50">
          {" "}
        </div>
      </div>

      <div className="lg:w-[75%]  h-[100vh] grid grid-flow-row grid-cols-2 lg:mx-[100px]  rounded-md gap-5 lg:mt-0 lg:px-0 px-6">
        {/* <div className="lg:col-span-1  col-span-full lg:h-[150px] h-[100px]  flex w-full shadow-xl rounded-sm lg:mt-0 mt-8 border-2">
          <div className="flex justify-around items-center h-full w-full">
            <h2 className="font-bold">Wallet Balance</h2>
            <h2>{walletInfo?.amount}</h2>
          </div>
        </div> */}

        <div className="lg:col-span-1  col-span-full lg:h-[150px] h-[100px]  flex w-full shadow-sm border rounded-sm lg:mt-0 mt-8">
          <div className="flex justify-around items-center h-full w-full">
            <h2 className="font-bold">Wallet Balance</h2>
            <h2 className="font-bold">₹ {walletInfo?.amount}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
