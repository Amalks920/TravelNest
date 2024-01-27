import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { selectToken, selectUserId, selectUserName } from "../../authentication/services/loginSlice";
import socket from "../../../utils/socket";
import { select } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import ChatMessage from "./ChatMessage";


const Chat = () => {
    const [message,setMessage]=useState('')
    const {hotel_id}=useParams()
    const user_id=useSelector(selectUserId);
    const token=useSelector(selectToken)
    const username=useSelector(selectUserName)
    const navigate = useNavigate()
    const isMounted = useRef(true); // Initialize as true

  //  socket.on('users',(users)=>{
  //   users.forEach((user)=>{
  //     console.log(user)
  //   })
  //  })
      socket.on('session',({sessionID,user_id})=>{
        socket.auth={sessionID};
        localStorage.setItem("sessionID", sessionID);
        socket.user_id=user_id

      })

      socket.on('private_message_response',(data)=>{
        console.log(data)
      });
  

 

    useEffect(()=>{
  
        const sessionID = localStorage.getItem("sessionID");
    // Set up Socket.IO connection with token-based authentication
    if (sessionID) {
     
      socket.auth = { sessionID,username };
      socket.connect();
    }

 

    // Handle joining the room if needed
    // socket.emit('join_room', { hotel_id: hotel_id, user_id: user_id });

    return () => {

      if (!isMounted.current) {
      console.log('diconnected')
      // Disconnect when component unmounts
      socket.disconnect();
      }
    };

    //  socket.emit('join_room',{hotel_id:hotel_id,user_id:user_id})


    },[navigate]);

    useEffect(() => {
      // Set isMounted to false when the component is unmounted
      return () => {
        isMounted.current = false;
      };
    }, []);

    const handleMessage=()=>{

      // socket.onAny((event,...args)=>{
      //   console.log(event,args)
      // })

      socket.emit('private_message',{message:message,user_id:1})

    }

  return (
    <div className="grid grid-cols-[25%,50%,25%] grid-rows-1 h-[83vh] -mt-32 w-full">
      <div className="row-span-1 col-span-1 border-2 flex flex-col">
        <div className="h-[60px] border-b-2  flex justify-left items-center">
          <h2 className="font-bold text-[1.3rem] ms-5">Archived</h2>
        </div>
      </div>

      <div className="row-span-1 col-span-1 border-y-2 flex flex-col">
        <div className="h-[60px] border-b-2 flex justify-between">
          <div></div>
          <button className="border-2 border-black w-[100px] m-3 rounded-full text-[0.8rem] font-bold">Hide Details</button>
        </div>

        <div className=" flex-grow border-b-2 overflow-scroll">
          <ChatMessage/>
        </div>

        <div className="m-4">

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5" 
            stroke="currentColor"
            className={`w-7 h-7 relative left-[90%] top-11 cursor-pointer ${message.length===0?'hidden':'block'}`}
            onClick={(e)=>{
              handleMessage()
            }}
          >
  <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>

          <input
          onChange={(e)=>{
            setMessage(e.target.value)
          }}
            type="text"
            className="border-2  w-full h-[60px] rounded-full ps-7 text-sm"
            placeholder="type message here"
          />
        </div>
      </div>
      <div className="row-span-1 col-span-1 border-2 flex flex-col">
        <div className="h-[60px] border-2"></div>
      </div>
    </div>
  );
};

export default Chat;
