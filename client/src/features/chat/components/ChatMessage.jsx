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
      {/* ${user_id!==sender._id?'bg-blue-gray-50':'bg-gray-300 '} */}
          <div className={`col-span-1 

           mb-3 rounded-s-lg`}></div>      
            <div className={`col-span-1 p-3    mb-3 rounded-e-lg`}>
              <h2 className={`text-center ${role==='owner'?'text-[0.7rem]':'text-[0.8rem]'}`}>{updatedAt}</h2>
              <h2 className={`font-bold  p-1 capitalize ${role==='owner'?'text-[0.9rem]':'text-[1.1rem]'}`}>{sender.username} <span className="text-[0.6rem] font-extralight"></span></h2>
              <h2 className={` p-1 ${role==='owner'?'text-[0.8rem]':'text-[1.1rem]'}`}>{text}</h2>
              {/* <h2 className="text-[0.7rem] p-1">Read By</h2> */}
            </div>
            </>
            })
            }
            
          </div>
        </div> 
       
    )
}

export default ChatMessage;