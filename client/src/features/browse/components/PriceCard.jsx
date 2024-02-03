import DatePicker from "../../../components/form/DatePicker";
import { Button, Input, Option, Select } from "@material-tailwind/react";
import {
  selectPrice,
  selectNoOfRooms,
  selectTotalPrice,
  selectCheckedRooms,
  updateCheckIn,
  updateCheckOut,
  selectHotelId,
  selectTotalNumberOfRoom,
  selectCheckIn,
  selectCheckOut,
  selectRoomType,
  updateNoOfRooms,
  updatePrice,
} from "../services/priceSlice";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import useHandlePayment from "../hooks/useHandlePayment";
import { useGetWalletAmountQuery, usePaymentMutation } from "../services/paymentApiSlice";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import { isMatch } from "react-day-picker";
import {
  selectRole,
  selectToken,
  selectUserId,
} from "../../authentication/services/loginSlice";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { updateCheckOutDetails } from "../../walletPayment/service/walletCheckOutSlice";

const PriceCard = ({ rate ,roomType,hotel_id,room_id}) => {
  const selectedCheckInDate = useSelector(selectCheckIn);
  const selectedCheckOutDate = useSelector(selectCheckOut);

  const totalPrice = useSelector(selectTotalPrice);
  const price = useSelector(selectPrice);
  const roomDetails = useSelector(selectCheckedRooms);
 // const hotel_id = useSelector(selectHotelId);
  const totalNoRooms = useSelector(selectTotalNumberOfRoom);
  const user_id=useSelector(selectUserId)

  const [payment, { isError, isLoading, isSuccess, error }] =
    usePaymentMutation();

const {data:wallet,isSuccess:isSuccessWallet}=useGetWalletAmountQuery({user_id})

console.log(wallet)


  const [checkInDate, setCheckInDate] = useState(selectedCheckInDate);
  const [checkOutDate, setCheckOutDate] = useState(selectedCheckOutDate);
  const [noOfRooms, setNoOfRooms] = useState('');
  const role = useSelector(selectRole);
  const token = useSelector(selectToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  useEffect(()=>{
    dispatch(updatePrice(rate*Number(noOfRooms)))
  },[noOfRooms])

  // useEffect(()=>{
  //   dispatch(updateNoOfRooms(Number(noOfRooms)));
  // },[noOfRooms])

  const handlePayment = async (id) => {
    try {
      const stripe = await loadStripe(
        "pk_test_51McT8uSJpQVF6jBTNlHodKtVtviDTJ5I2ApQv9ag4Nr4iwvzERcDxveeDcbIWA8TYpPIM2XqbYqSjAtlUfa7kldc00nshn8huB"
      );
      stripe.redirectToCheckout({
        sessionId: id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={{
        checkInDate: selectedCheckInDate,
        checkOutDate: selectedCheckOutDate,
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        setFieldValue,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <div className="grid grid-flow-row grid-cols-[auto,auto]  sticky m-3 top-0 w-full   rounded-lg ">
          <div className="col-span-2 p-2">
            <h2 className="p-3 font-bold text-[1.6rem]">₹ {rate}</h2>
          </div>
          <div className="col-span-2">
            {isError && (
              <h2 className="text-red-600 ps-5 text-[1rem]">please select</h2>
            )}

            <DatePicker
              datePassed={selectedCheckInDate}
              setDate={setCheckInDate}
              name="checkInDate"
              label={"Check in"}
              
              
            />
            <div className="mt-4">
              <DatePicker
                datePassed={selectedCheckOutDate}
                //  setDate={setCheckOutDate}
                name="checkOutDate"
                label={"Check out"}
              />
            </div>
            <div className="mt-4 px-1">
             <select
              value={noOfRooms} 
              onChange={e => setNoOfRooms(e.target.value)} 
              className="bg-white w-full h-[40px] px-3 border-[1.3px] border-gray-400 rounded-lg">
              <option value="" disabled>0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
             </select>

            </div>

            <Button
              onClick={async () => {
                if (token && role === "user") {
                
                  const roomDetails=[{id:room_id,roomType:roomType,noOfRooms:noOfRooms,price:price}]
                   console.log(roomDetails)
                  const response = await payment({
                    roomDetails,
                    totalPrice:price,
                    checkInDate: selectedCheckInDate,
                    checkOutDate: selectedCheckOutDate,
                    hotel_id,
                    totalNoRooms:noOfRooms
                  });
                  console.log(response);
                  console.log('respooonnnnnseee')
             
                  dispatch(updateCheckIn(checkInDate));
                  dispatch(updateCheckOut(checkOutDate));
                  handlePayment(response.data.id);
       
                } else {
                  navigate("/login");
                }

                // if (isError) return console.log(error);
              }}
              className="w-full mt-4"
            >
              Pay Using Card
            </Button>
            <h2
              onClick={() => {
                dispatch(
                  updateCheckOutDetails({
                    checkInDate: selectedCheckInDate,
                    checkOutDate: selectedCheckOutDate,
                    roomDetails:roomDetails,
                    totalPrice:totalPrice,
                    totalNoRooms:totalNoRooms,
                    hotel_id:hotel_id
                  })
                );
              }}
              className="text-center mt-2 text-[0.9rem] text-red-500 cursor-pointer capitalize"
            >
              {console.log(wallet?.response[0]?.amount,totalPrice)}
              {roomDetails?.length!==0  && wallet?.response[0]?.amount>totalPrice  ?
                <Link to={"/wallet-payment-page"}>other payment options</Link>:null
                
           
                }
            </h2>
            <div className="mt-6 flex flex-col justify-between mx-3">
              <div className="w-full mt-6 flex  justify-between mx-3">
                <p className="font-bold">Price</p>
                <p className="me-3 font-bold">₹ {price}</p>
              </div>

              {roomDetails.map(({ noOfRooms, price, roomType }, index) => {
                return (
                  <div className="w-full mt-6  flex  justify-between mx-3">
                    <p className="font-bold">{roomType}</p>
                    <p className="me-3 font-bold text-left">
                      ₹ {price + " " + "x" + " " + noOfRooms}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* <div className="col-span-2 flex flex-col gap-4">
            <h1 className="ms-3 font-bold">Wallet Balance :</h1>
              <Button className="w-full">Pay using Wallet</Button>
          </div> */}

        </div>
      )}
    </Formik>
  );
};

export default PriceCard;
