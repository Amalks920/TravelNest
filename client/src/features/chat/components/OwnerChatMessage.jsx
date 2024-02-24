import { useSelector } from "react-redux";
import { useGetMessagesQuery } from "../services/chatApiSlice";
import { selectRole, selectUserId } from "../../authentication/services/loginSlice";
import { useEffect, useRef, useState } from "react";
import { setDay } from "date-fns";
import { formatDate, formatTime } from "../../../utils/formatDate";


const OwnerChatMessage=({recipient_id,socket,lastMessage,setLastMessage})=>{

  const user_id=useSelector(selectUserId)
  const role=useSelector(selectRole)

    const {data:messages,isError,isFetching,isLoading,isSuccess,refetch}=useGetMessagesQuery({recipient_id,user_id})
  console.log(messages)


  useEffect(()=>{
   
    const lastMessageIsFromOtherUser= messages?.length && messages[messages?.length-1].sender?._id != user_id

    if(lastMessageIsFromOtherUser){
      socket.emit("markMessagesAsSeen", {
				conversationId: messages[messages?.length-1]?.conversationId,
				userId: messages[messages?.length-1].sender?._id,
			});
    }

  })

    // useEffect(()=>{
      socket?.on('newMessage',(message)=>{  
        refetch()
        
      // })
    })

    socket?.on('messageSeen',({conversationId})=>{
      console.log(conversationId,'conversationId')
    })
//     return (
//         <div className="flex flex-col mx-[10%] mt-[50px] min-h-full">
//           <div className="grid grid-flow-row grid-cols-[50px,auto]" >
            
// {  messages?.map(({text,sender,updatedAt},index)=>{
//   // const date = updatedAt?.toISOString()?.split('T')[0];
//   // const time = updatedAt?.toISOString()?.split('T')[1]?.split('.')[0]; 
// return <>
//       {/* ${user_id!==sender._id?'bg-blue-gray-50':'bg-gray-300 '} */}
//           <div className={`col-span-1 

//            mb-3 rounded-s-lg`}></div>      
//             <div className={`col-span-1 p-3    mb-3 rounded-e-lg`}>
//               <h2 className={`text-center ${role==='owner'?'text-[0.7rem]':'text-[0.8rem]'}`}>{updatedAt}</h2>
//               <h2 className={`font-bold  p-1 capitalize ${role==='owner'?'text-[0.9rem]':'text-[1.1rem]'}`}>{sender.username} <span className="text-[0.6rem] font-extralight"></span></h2>
//               <h2 className={` p-1 ${role==='owner'?'text-[0.8rem]':'text-[1.1rem]'}`}>{text}</h2>
//               {/* <h2 className="text-[0.7rem] p-1">Read By</h2> */}
//             </div>
//             </>
//             })
//             }

// {/* <div className={`col-span-1 

// mb-3 rounded-s-lg ${lastMessage==='' && 'hidden'}`}></div>      
//  <div className={`col-span-1 p-3    mb-3 rounded-e-lg ${lastMessage==='' && 'hidden'}`}>
//    <h2 className={`text-center ${role==='owner'?'text-[0.7rem]':'text-[0.8rem]'}`}>{'updatedAt'}</h2>
//    <h2 className={`font-bold  p-1 capitalize ${role==='owner'?'text-[0.9rem]':'text-[1.1rem]'}`}>{'sender.username'} <span className="text-[0.6rem] font-extralight"></span></h2>
//    <h2 className={` p-1 ${role==='owner'?'text-[0.8rem]':'text-[1.1rem]'}`}>{lastMessage}</h2>
  
//  </div> */}
            
//           </div>
//         </div> 
       
//     )

return (
  <div className="flex flex-col mx-[10%] mt-[50px] min-h-full ms-[20%]">
    <div className="grid grid-flow-row grid-cols-[38vw]" >
      
{  messages?.map(({text,sender,updatedAt,seen},index)=>{
// const date = updatedAt?.toISOString()?.split('T')[0];
// const time = updatedAt?.toISOString()?.split('T')[1]?.split('.')[0]; 
return <>
{/* ${user_id!==sender._id?'bg-blue-gray-50':'bg-gray-300 '} */}
{/* 
    <div className={`col-span-1 
     mb-3 rounded-s-lg`}></div>      
      <div className={`col-span-1 p-3    mb-3 rounded-e-lg  w-[100%] hover:shadow-md `}>
        <h2 className={`text-center text-[0.7rem] font-bold w-full`}>{formatDate( updatedAt)}</h2>
        <div className="flex">
        <h2 className={`font-bold  p-1 capitalize text-[0.9rem]`}>{sender.username} <span className="text-[0.6rem] font-extralight"></span></h2>
        <h3 className="text-[0.7rem] mt-3 ms-2">{formatTime( updatedAt)}</h3>
        </div>
        <h2 className={` p-1 text-[0.8rem] font-thin`}>{text}</h2>
        {seen && sender._id===user_id && <h2 className={` p-1 text-[0.8rem] font-thin`}>{'seen'}</h2>}
      </div> */}
                  <div className={`  flex my-4 ${sender?.role!='user' && 'justify-end'}`}>
              <div className={`${sender?.role=='user' ? ' bg-gray-50':'bg-black text-white' } px-10 flex gap-14  ${sender?.role=='user'?'rounded-bl-2xl rounded-e-2xl':'rounded-s-2xl rounded-br-2xl'} py-3 w-fit border-2 `}>
               <h2 className="text-[1rem]">{text}</h2> 
               <h2 className="text-[0.8rem] mt-1">{formatTime( updatedAt)}</h2>
                </div>
              
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

export default OwnerChatMessage;