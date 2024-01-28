import { useSelector } from "react-redux";
import { useGetMessagesQuery } from "../services/chatApiSlice";
import { selectRole, selectUserId } from "../../authentication/services/loginSlice";


const ChatMessage=({recipient_id})=>{

  const user_id=useSelector(selectUserId)
  const role=useSelector(selectRole)

    const {data:messages,isError,isFetching,isLoading,isSuccess,refetch}=useGetMessagesQuery({recipient_id,user_id})

    console.log(messages)
    console.log('messagees')
    return (
        <div className="flex flex-col mx-[10%] mt-[50px] min-h-full">
          <div className="grid grid-flow-row grid-cols-[50px,auto]" >
            
{  messages?.map(({text,sender,updatedAt},index)=>{
 
return <>
          <div className="col-span-1 hover:bg-blue-gray-50"></div>      
            <div className="col-span-1 p-3 hover:bg-blue-gray-50 ">
              <h2 className="text-center text-[0.9rem]">Jan 23,2023</h2>
              <h2 className="font-bold text-[1.1rem] p-1 capitalize">{sender.username} <span className="text-[0.6rem] font-extralight">{updatedAt}</span></h2>
              <h2 className="text-[1rem] p-1">{text}</h2>
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