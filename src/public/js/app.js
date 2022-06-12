const socket = new WebSocket(`ws://${window.location.host}`);
const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#message");
const nickForm = document.querySelector("#nick");

function makeMessage(type,payload){
    const msg = {type,payload};
    return JSON.stringify(msg);
}

socket.addEventListener("open", ()=>{
    console.log("connected to server");
})

socket.addEventListener("message",(message)=>{
    const li = document.createElement("li");
    li.innerHTML = message.data;
    messageList.append(li);
})

socket.addEventListener("close",()=>{
    console.log("disconnected from server");
})

function handleSubmit(event){
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(makeMessage("new_message",input.value));
    input.value="";
}

function handleNickSubmit(e){
    e.preventDefault();
    const input = nickForm.querySelector("input");
    socket.send(makeMessage("nickname",input.value));
    input.value="";
}

messageForm.addEventListener("submit",handleSubmit);
nickForm.addEventListener("submit",handleNickSubmit);