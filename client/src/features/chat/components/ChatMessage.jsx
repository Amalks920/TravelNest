import { useSelector } from "react-redux";
import { useGetMessagesQuery } from "../services/chatApiSlice";
import { selectRole, selectUserId } from "../../authentication/services/loginSlice";
import { useEffect } from "react";


const ChatMessage=({recipient_id,socket})=>{

  const user_id=useSelector(selectUserId)
  const role=useSelector(selectRole)

    const {data:messages,isError,isFetching,isLoading,isSuccess,refetch}=useGetMessagesQuery({recipient_id,user_id})
  console.log(messages)

    // useEffect(()=>{
      socket?.on('newMessage',(message)=>{  
        refetch()
      // })
    })

    return (
        <div className="flex flex-col mx-[10%] mt-[50px] min-h-full">
          <div className="grid grid-flow-row grid-cols-[50px,auto]" >
            
{  messages?.map(({text,sender,updatedAt},index)=>{
  // const date = updatedAt?.toISOString()?.split('T')[0];
  // const time = updatedAt?.toISOString()?.split('T')[1]?.split('.')[0]; 
return <>
      
          <div className={`col-span-1 ${user_id!==sender._id?'bg-blue-gray-50':'bg-red-400 text-white'} mb-3 rounded-s-lg`}></div>      
            <div className={`col-span-1 p-3   ${user_id!==sender._id?'bg-blue-gray-50':'bg-red-400 text-white'} mb-3 rounded-e-lg`}>
              <h2 className={`text-center ${role==='owner'?'text-[0.7rem]':'text-[1.2rem]'}`}>Jan 23,2023</h2>
              <h2 className={`font-bold  p-1 capitalize ${role==='owner'?'text-[0.9rem]':'text-[1.2rem]'}`}>{sender.username} <span className="text-[0.6rem] font-extralight">{updatedAt}</span></h2>
              <h2 className={` p-1 ${role==='owner'?'text-[0.8rem]':'text-[1.1rem]'}`}>{text}</h2>
              <h2 className="text-[0.7rem] p-1">Read By</h2>
            </div>
            </>
            })
            }
            
          </div>
        </div> 
       
    )
}

export default ChatMessage;