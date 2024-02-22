import { useSelector } from "react-redux";
import { useGetConversationsQuery } from "../services/chatApiSlice";
import { selectRole, selectUserId } from "../../authentication/services/loginSlice";
import { Spinner } from "@material-tailwind/react";
import ChatList from "./ChatList";

const Archived = ({setRecipientId}) => {
  const user_id = useSelector(selectUserId);
  const role=useSelector(selectRole)
  const {
    data: conversations,
    isError,
    isFetching,
    isLoading,
    isSuccess,
  } = useGetConversationsQuery({ user_id });


 if(isLoading || isFetching) return <Spinner/>
console.log(conversations)
  return (
    <>
      <div className="h-[60px] border-b-2  flex justify-left items-center">
        <h2 className="font-bold text-[1.3rem] ms-5 p-4">Archived</h2>
      </div>

      <div className="flex flex-col m-5 justify-left items-center
       py-3 px-2 gap-2 hover:bg-blue-gray-50 hover:cursor-pointer
        rounded-lg overflow-scroll">
 {conversations.map((conversation,index)=>{
  return <div onClick={
    ()=>{
      setRecipientId(conversation?.participants[0]._id)
  }} className="w-full" key={index} ><ChatList  username={conversation?.participants[0]?.username} text={conversation?.lastMessage?.text}/></div>
 }) }
        {/* <h2 className="capitalize text-[1.1rem] font-extralight">{conversations[0]?.participants[0]?.username}</h2>
        <h2 className="capitalize text-[0.9rem] font-extralight">{conversations[0]?.lastMessage?.text}</h2>
        <h2 className="capitalize text-[0.7rem] font-extralight">{conversations[0]?.updatedAt}</h2> */}
      </div>
     
    </>
  );
}

export default Archived;
