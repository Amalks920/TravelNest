import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { selectRole, selectToken, selectUserId, selectUserName } from "../../authentication/services/loginSlice";
//import socket from "../../../utils/socket";
import { select } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import ChatMessage from "./ChatMessage";
import Archived from "./Archived";
import MessageInput from "./MessageInput";
import io from "socket.io-client";


const Chat = () => {
    const role=useSelector(selectRole)
    const {owner_id}=useParams()
    const user_id=useSelector(selectUserId);
    const username=useSelector(selectUserName)
    const navigate = useNavigate()
    const [socket,setSocket]=useState(null)
    const isMounted = useRef(true); // Initialize as true

    const [recipientId,setRecipientId]=useState(null);
    
  //  socket.on('users',(users)=>{
  //   users.forEach((user)=>{
  //     console.log(user)
  //   })
  //  })
      // socket.on('session',({sessionID,user_id})=>{
      //   socket.auth={sessionID};
      //   localStorage.setItem("sessionID", sessionID);
      //   socket.user_id=user_id

      // })
// 
      // socket.on('private_message_response',(data)=>{
      //   console.log(data)
      // });
  

 

//     useEffect(()=>{
  
//       const socket = io("http://localhost:5000", {
//         query: {
//           userId: user_id,
//         },
//       });
 
//  setSocket(socket)
    

 

//     // Handle joining the room if needed
//     // socket.emit('join_room', { hotel_id: hotel_id, user_id: user_id });

//     return () => {
//       console.log('disconnected')
//       return socket && socket.close()
//     }


//     },[socket]);

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

      // socket.emit('private_message',{message:message,user_id:1})

    }

  return (
    <div className="grid grid-cols-[25%,50%,25%] grid-rows-1 h-[83vh] -mt-32 w-full">
      <div className="row-span-1 col-span-1 border-2 flex flex-col">
      <Archived setRecipientId={setRecipientId}/>
        
      </div>

      <div className="row-span-1 col-span-1 border-y-2 flex flex-col">
        <div className={`${role==='user'?'h-[100px]':'h-[60px]'} border-b-2 flex justify-between`}>
          <div></div>
           <button className={`border-2 border-black w-[100px] m-4 rounded-full text-[0.8rem] font-bold `}>Hide Details</button> 
        </div>

        <div className=" flex-grow border-b-2 overflow-scroll">
          <ChatMessage recipient_id={role==='user'?owner_id:recipientId}/>
        </div>

        <div className="m-4">
      <MessageInput recipientId={role==='user'?owner_id:recipientId} senderId={user_id}/>
        </div>

      </div>

      <div className="row-span-1 col-span-1 border-2 flex flex-col">
        <div className="h-[60px] border-2"></div>
      </div>
    </div>
  );
};

export default Chat;
