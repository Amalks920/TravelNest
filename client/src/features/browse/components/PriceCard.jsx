import DatePicker from "../../../components/form/DatePicker";
import { Button } from "@material-tailwind/react";
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

const PriceCard = ({ open, setOpen }) => {
  const selectedCheckInDate = useSelector(selectCheckIn);
  const selectedCheckOutDate = useSelector(selectCheckOut);

  const totalPrice = useSelector(selectTotalPrice);
  const roomDetails = useSelector(selectCheckedRooms);
  const hotel_id = useSelector(selectHotelId);
  const totalNoRooms = useSelector(selectTotalNumberOfRoom);
  const user_id=useSelector(selectUserId)

  const [payment, { isError, isLoading, isSuccess, error }] =
    usePaymentMutation();

const {data:wallet,isSuccess:isSuccessWallet}=useGetWalletAmountQuery({user_id})

console.log(wallet)


  const [checkInDate, setCheckInDate] = useState(selectedCheckInDate);
  const [checkOutDate, setCheckOutDate] = useState(selectedCheckOutDate);

  const role = useSelector(selectRole);
  const token = useSelector(selectToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        <div className="grid grid-rows-[300px,100px] grid-cols-[auto,auto] mt-14 sticky m-3 top-0 w-full   rounded-lg ">
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

            <Button
              onClick={async () => {
                if (token && role === "user") {
                  const response = await payment({
                    roomDetails,
                    totalPrice,
                    checkInDate: selectedCheckInDate,
                    checkOutDate: selectedCheckOutDate,
                    hotel_id,
                    totalNoRooms,
                  });
                  console.log(response);
                  // if (isSuccess) {
                  dispatch(updateCheckIn(checkInDate));
                  dispatch(updateCheckOut(checkOutDate));
                  handlePayment(response.data.id);
                  // }
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
                <p className="me-3 font-bold">₹ {totalPrice}</p>
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
