const express = require('express');
const { get } = require('http');
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server , {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
});

const { joinUser , getCurrentUser } = require('./user');

// app.use(cors({origin: function(origin, callback){
// //     return callback(null, [origin]);
// //   },
// //   optionsSuccessStatus: 200,
// //   credentials: true}));
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });


io.on('connection' , (socket) =>{

    socket.on('join' , (data) =>{
        console.log(socket.id)
        const user = joinUser(socket.id , data.name , data.userroom);
        socket.join(data.useroom);

    })
    
     socket.on('client message' , (data) =>{
        console.log(socket.id);
        const user = getCurrentUser(socket.id);
        const date = new Date();
        let minute = '';
        if(date.getMinutes() < 10 ){
            minute = '0'+date.getMinutes(); 
        }
        else{
            minute = date.getMinutes().toString();
        }   
        io.in(user[0].userrom).emit('server message' ,{
            name : user[0].name,
            text : data.text,
            time : date.getHours() +':' +minute
        })
    })
    socket.on('disconnecting' ,  () =>{
        console.log('user đã hủy kết nối');
    });
})

app.get('/', (req , res) =>{
    res.send("hello nguyễn đình khiêm")
})

server.listen(4000 , () => console.log("đã chạy"));