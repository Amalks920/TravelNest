import Chat from "../../features/chat/components/Chat";
import OwnerChat from "../../features/chat/components/OwnerChat";


const OwnerChatPage=({socket})=>{
    console.log('hhhhh')
console.log(socket)
    return (
       // <Chat socket={socket}/>
       <OwnerChat socket={socket}/>
    )
}

export default OwnerChatPage;