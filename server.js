const express=require("express");

const app=express();

const http=require("http");

const expressServer=http.createServer(app);

let path=require("path");

app.use(express.static(path.join(__dirname,"client")))


const {userJoin,getCurrentUser,totalUser,showAlluser, findIndex,
    deleteUsers,showUserByRoom} =require("./util");



let {Server}=require("socket.io");


let io=new Server(expressServer);

io.on("connection",socket=>{

       

        socket.on("user-join",({username,room})=>{
            userJoin(socket.id,username,room);

            socket.join(room);
            socket.broadcast.to(room).emit("user-joined",`${username} has joined`);

                io.sockets.to(room).emit("roomname",room)
                // let specitficRoomAllUser=Array.from(io.sockets.adapter.rooms.get(room))
           
           
                    let users=showUserByRoom(room)

                    console.log(users)
                 
            io.sockets.to(room).emit("show_all_user",users);


            socket.on("chatMessage",data=>{
          

                socket.broadcast.to(room).emit("message",{
                    time:data.time,
                    text:data.text,
                    username:getCurrentUser(socket.id)
                })
            })  
            let roomSize;
            if(io.sockets.adapter.rooms.get(room)){
                roomSize=io.sockets.adapter.rooms.get(room).size
            }
            else{
                roomSize=0;
            }

           
        
            // total user
            io.sockets.to(room).emit("totalUser",roomSize);

            // when disconnect

                socket.on("disconnect",e=>{
                    socket.broadcast.to(room).emit("user-joined",`${username} has left`);

                    // delete user

                    let index= findIndex(socket.id);
                        deleteUsers(index);

                            // total user
                            let roomSize;
                            if(io.sockets.adapter.rooms.get(room)){
                                roomSize=io.sockets.adapter.rooms.get(room).size
                            }
                            else{
                                roomSize=0;
                            }
                        io.sockets.to(room).emit("totalUser",roomSize);
                          
                            // console.log(specitficRoomAllUser)
                            
                            let users=showUserByRoom(room)
                    
                 
                            io.sockets.to(room).emit("show_all_user",users);
                })





        });
      
        


})

let port=process.env.port || 3000;
expressServer.listen(port,e=>{
    console.log(`Server running @ ${port}`);
})