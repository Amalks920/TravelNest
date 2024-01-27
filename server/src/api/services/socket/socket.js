const redisDb=require('../../../config/redisConfig')
const redis=require('./redisQueries')
const uuid = require('uuid');

module.exports = (io) => {


    io.use((socket, next) => {
     const sessionID=socket.handshake.auth.sessionID;
     if(sessionID){
      redis.findSession(`session:${sessionID}`, (error, sessionData) => {
        if (error) {

          console.error('Error retrieving session from Redis:', error);
        } else {
         
          if (sessionData) {
            socket.sessionID=sessionID
            socket.userID=sessionData.user_id
            socket.username=sessionData.username
            console.log('Session found in Redis:', sessionData);
            return next()
          } else {
            // Session does not exist in Redis
            console.log('Session not found in Redis');
          }
        }
      });
     }

     const username=socket.handshake.auth.username;
     console.log(username)
     if(!username){
      return next(new Error('invalid username'))
     }

     socket.sessionID= uuid.v4();
     socket.user_id=username;
     
     next();
      });

  io.on("connection", (socket) => {
    socket.on(`join_room`, (data) => {
      console.log(data)
      const { hotel_id, user_id } = data;
      console.log(user_id)
      socket.join(user_id);
    });

    io.on('connection',(socket)=> {
      socket.emit('session',{
        sessionID:socket.sessionID,
        user_id:socket.user_id
      })

    })


    io.on('connection',(socket)=>{

      socket.on("private_message", (data) => {
        const {user_id,message}=data
        console.log(data)
        // socket.to(user_id).to(socket.user_id).emit('private_message',{
        //   message,
        //   from:socket.user_id,
        //   user_id,
        // })


        // socket.emit('private_message_response', {
        //   message: 'Private message sent successfully',
        //   from: socket.user_id,
        //   to:
        
        // });
      });




    });

    io.on('connection',(socket)=>{
      socket.on("disconnect", async () => {
        const matchingSockets = await io.in(socket.userID).allSockets();
        const isDisconnected = matchingSockets.size === 0;
        if (isDisconnected) {
          // notify other users
          socket.broadcast.emit("user disconnected", socket.userID);
          // update the connection status of the session
          redis.saveSession(socket.sessionID, {
            userID: socket.userID,
            username: socket.username,
            connected: false,
          });
        }
      });
    })


    socket.onAny((event, ...args) => {
        console.log(event, args);
      });

    socket.on("disconnect", (e) => {});
  });
};
