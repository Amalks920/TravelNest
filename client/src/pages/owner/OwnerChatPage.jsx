import Chat from "../../features/chat/components/Chat";


const OwnerChatPage=({socket})=>{
    console.log('hhhhh')
console.log(socket)
    return (
        <Chat socket={socket}/>
    )
}

export default OwnerChatPage;