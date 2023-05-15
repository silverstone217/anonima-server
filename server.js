const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const PORT = process.env.PORT || 5001;

const route = require('./router');
const { addUser, findUsers, removeUser } = require('./users');

app.use(cors());
app.use (route);

const server = http.createServer(app);

const io = new Server(server, { cors:{
    origin: "*",
    methods: ["GET", "POST"],
    },
});

//rooms settings
io.on('connection', (socket)=>{

    // join room
    socket.on('join', ({name, room})=>{

        socket.join(room);

        const  {user } = addUser({name, room});

        socket.emit('message', {
           
            data: {user: "admin", message: ` ${user.name} be gentle and have fun!`},
        });

        socket.broadcast.to(user.room).emit('message', {
            data: {user: "admin", message:`${user.name} has joined`}
        });
    })
    //send the message
    socket.on("sendMessage", ({message, params})=>{
        const user = findUsers(params);
        if(user){
            io.to(user.room).emit('message', {
                data: { user , message }
            });
        }
        //console.log({message, params})
    });

    socket.on("leaveRoom", ({params})=>{
        const user = removeUser(params);
        if(user){
            const {room, name} = user;

            io.to(room).emit('message', {
                data: { user : "admin" , message:`${name} has left the chat` }
            });
        }
        //console.log({message, params})
    });

    // get all rooms
    //const allRooms = io.sockets.adapter.rooms;

    //allRooms && (console.log(allRooms))
    
   /* if(allRooms){
        const rooms = Object.keys(allRooms)
        console.log({rooms})
        }*/

    // disconnect from the server
    io.on('disconnect', ()=>{
        console.log('Disconnected');
    });
})


server.listen(PORT, ()=> console.log('listening on port: ', PORT));

