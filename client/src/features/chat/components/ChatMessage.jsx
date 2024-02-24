import { useSelector } from "react-redux";
import { useGetMessagesQuery } from "../services/chatApiSlice";
import { selectRole, selectUserId, selectUserName } from "../../authentication/services/loginSlice";
import { useEffect, useRef, useState } from "react";
import { setDay } from "date-fns";
import { formatDate, formatTime } from "../../../utils/formatDate";


const ChatMessage=({recipient_id,socket,lastMessage,setLastMessage})=>{

  const user_id=useSelector(selectUserId)
  const role=useSelector(selectRole)
  const user=useSelector(selectUserName)
  

    const {data:messages,isError,isFetching,isLoading,isSuccess,refetch}=useGetMessagesQuery({recipient_id,user_id})
 
  
  useEffect(()=>{
   
    const lastMessageIsFromOtherUser= messages?.length && messages[messages?.length-1].sender?._id != user_id

    if(lastMessageIsFromOtherUser){
      socket.emit("markMessagesAsSeen", {
				conversationId: messages[messages?.length-1].conversationId,
				userId: messages[messages?.length-1].sender?._id,
			});
    }

  })

  socket?.on('messageSeen',({conversationId})=>{
    console.log(conversationId,'conversationId')
  })

    // useEffect(()=>{
      socket?.on('newMessage',(message)=>{  
        // console.log(message)
        // setLastMessage(message.text)
       refetch()
    
      // })
    })



    console.log(messages)
    return (
        <div className="flex flex-col mx-[10%] pe-[5%] mt-[50px] min-h-full mb-[10%]  h-fit">
          <div className="grid grid-flow-row grid-cols-[50px,30vw]  pb-[50px]" >
            
{  messages?.map(({text,sender,updatedAt,seen},index)=>{
  // const date = updatedAt?.toISOString()?.split('T')[0];
  // const time = updatedAt?.toISOString()?.split('T')[1]?.split('.')[0]; 
return <>
      {/* ${user_id!==sender._id?'bg-blue-gray-50':'bg-gray-300 '} */}
          <div className={`col-span-1 

           mb-3 rounded-s-lg`}></div> 


            <div className={` col-span-1 p-3    mb-3 rounded-e-lg  w-[100%] hover:shadow-md `}>
              <h2 className={`text-center text-[0.9rem] text-gray-700 font-bold  w-full`}>{formatDate( updatedAt)}</h2>
              <div className="flex mt-5">
              <h2 className={`font-bold  p-1 capitalize text-[1rem]`}>{sender.username} <span className="text-[0.6rem] font-extralight"></span></h2>
              <h3 className="text-[0.8rem] mt-3 ms-2 text-gray-500">{formatTime( updatedAt)}</h3>
              {seen && user_id===sender?._id && <h2 className={` p-1 text-[0.8rem] font-thin text-gray-800 ms-7 mt-2`}>{'seen'}</h2>}
              </div>
              <h2 className={` p-1 text-[1.1rem] font-thin text-gray-800`}>{text}</h2>
             
             
            </div>
            </>
            })
            }

{/* <div className={`col-span-1 

mb-3 rounded-s-lg ${lastMessage==='' && 'hidden'}`}></div>      
 <div className={`col-span-1 p-3    mb-3 rounded-e-lg ${lastMessage==='' && 'hidden'}`}>
   <h2 className={`text-center ${role==='owner'?'text-[0.7rem]':'text-[0.8rem]'}`}>{'updatedAt'}</h2>
   <h2 className={`font-bold  p-1 capitalize ${role==='owner'?'text-[0.9rem]':'text-[1.1rem]'}`}>{user} <span className="text-[0.6rem] font-extralight"></span></h2>
   <h2 className={` p-1 ${role==='owner'?'text-[0.8rem]':'text-[1.1rem]'}`}>{lastMessage}</h2>
  
 </div> */}
            
          </div>
        </div> 
       
    )
}

export default ChatMessage;