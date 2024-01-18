import { useState } from "react";

const Chat = () => {
    const [message,setMessage]=useState('')
  return (
    <div className="grid grid-cols-[25%,50%,25%] grid-rows-1 h-[83vh] -mt-32 w-full">
      <div className="row-span-1 col-span-1 border-2 flex flex-col">
        <div className="h-[100px] border-y-2 border-r-0 flex justify-left items-center">
          <h2 className="font-bold text-[1.3rem] ms-5">Archived</h2>
        </div>
      </div>
      <div className="row-span-1 col-span-1 border-2 flex flex-col">
        <div className="h-[100px] border-y-2"></div>
        <div className=" flex-grow border-b-2"></div>
        <div className="m-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5" 
            stroke="currentColor"
            className={`w-6 h-6 relative left-[670px] top-11 cursor-pointer ${message.length===0?'hidden':'block'}`}
              
          >
  <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>

          <input
          onChange={(e)=>{
            setMessage(e.target.value)
          }}
            type="text"
            className="border-2 border-black w-full h-[60px] rounded-full ps-7 text-xl"
            placeholder="type message here"
          />
        </div>
      </div>
      <div className="row-span-1 col-span-1 border-2 flex flex-col">
        <div className="h-[100px] border-2"></div>
      </div>
    </div>
  );
};

export default Chat;