

module.exports=(io)=>{

    io.on('connection',(socket)=>{
        
        socket.on('private_message',(id,data)=>{
                console.log(id)
                console.log(data)
        })
        socket.on('disconnect',(e)=>{

        })

        socket.on('join_room',()=>{
            console.log(' ____ joined in the room')
        })
    })


}
