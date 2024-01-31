import { useState } from "react"
import { useSendMessageMutation } from "../services/chatApiSlice"
import { useSelector } from "react-redux"
import { selectRole } from "../../authentication/services/loginSlice"


const MessageInput=({recipientId,senderId})=>{
    const [message,setMessage]=useState('')
      // sendMessage ot backend
      const [sendMessage,{isError,isLoading,isSuccess}]=useSendMessageMutation()
      const role=useSelector(selectRole)
    const handleMessage= async ()=>{
        setMessage('')
        console.log(recipientId,senderId,message)
        await sendMessage({recipientId,senderId,message})
      }




    return (
<>

<svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5" 
            stroke="currentColor"
            className={`w-7 h-7 relative ${role==='user'?'left-[90%]':'left-[80%]'} top-11 cursor-pointer ${message.length===0?'hidden':'block'}`}
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
            value={message}
            type="text"
            className={`border-2   rounded-full ps-7 text-sm ${role==='owner'?'w-[75%] h-[55px] ms-[10%]':'w-full h-[60px] '}`}
            placeholder="type message here"
          />
</>
    )
}


export default MessageInput;