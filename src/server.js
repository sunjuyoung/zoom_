import express from "express";
import http from "http";
import WebSocket from "ws";

const app = express();


app.set("view engine", "pug");
app.set("views", __dirname + "/views");

//public 경로가 우리 src폴더에 있는 public폴더 라고 정의
app.use('/public', express.static(__dirname + "/public"));

app.get("/", (req,res)=> res.render("home"));
app.get("/*", (req,res)=> res.redirect("/"));


const handleListen = ()=> console.log("Listening on http://localhost:3000");
const server  = http.createServer(app);
const wss = new WebSocket.Server({ server });

const sockets = [];

wss.on("connection",(socket)=>{
    sockets.push(socket);
    socket["nickname"] = "Anonymous";
    console.log("connected to Browser");
    socket.on("close",()=> console.log("Disconnected from browser"));
    socket.on("message", (msg)=>{
        const message = JSON.parse(msg);
        switch (message.type) {
            case "new_message":
                sockets.forEach(aSocket=>aSocket.send(`${socket.nickname}: ${message.payload}`));
            case "nickname":
                socket["nickname"] = message.payload;
        }
      
    });
});

server.listen(3000,handleListen);
