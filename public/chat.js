

let findUrlParams=new URLSearchParams(document.location.search.substring(1));
const username=findUrlParams.get("username");
const roomname=findUrlParams.get("roomname");

const socket=io();

const chatTextForm=document.getElementById("chatTextForm");

socket.emit("user-join",{
    username:username,
    room:roomname
});


socket.on('user-joined',data=>{
    const chatHistory=document.querySelector(".chatHistory");

    let userjoinDiv=document.createElement('div');
    userjoinDiv.classList.add("float-right");
    userjoinDiv.classList.add("chatTextWrapper");
    userjoinDiv.classList.add("bg-info");
    userjoinDiv.innerHTML=`${data}`

    chatHistory.appendChild(userjoinDiv);

})

// show all user on sidebar

socket.on("show_all_user",data=>{
    const ChatUser=document.querySelector(".ChatUser");
    ChatUser.innerHTML=data
        
})

// show room name

socket.on("roomname",room=>{
const showRoomName=document.getElementById("showRoomName");
showRoomName.innerHTML=room;
})






// total user

socket.on("totalUser",data=>{   
    let totalUser=document.getElementById("totalUser");

    totalUser.innerHTML=data;

})





chatTextForm.addEventListener("submit",e=>{
    e.preventDefault();

    let inputText=e.target[0].value;    
    let date=new Date();
    let curHour=date.getHours();

    let curMinute=date.getMinutes();
    let ampm;

    if(curHour>12){
        ampm="pm"
    }
    else{
        ampm="am"
    }
        socket.emit("chatMessage",{
            time:`${curHour}: ${curMinute} ${ampm}`,
            text:inputText
        });

        let chatMessageHistory=document.querySelector(".chatHistory");

    let chatTextWrapper=document.createElement("div");

    chatTextWrapper.classList.add("chatTextWrapper");
    chatTextWrapper.classList.add("float-left");
    chatTextWrapper.classList.add("bg-success")
    chatTextWrapper.innerHTML=`
    <div class="user_time">
    <span class="roboto">You : </span> <span class="text-light"> ( ${curHour}: ${curMinute} ${ampm} )</span>
</div>
<!-- user chat text -->
<div class="user_chat_text">
   ${inputText}
</div>
    `
    chatMessageHistory.appendChild(chatTextWrapper)

    e.target.reset();
});

// chat message from server to clinet

socket.on("message",data=>{
    let chatMessageHistory=document.querySelector(".chatHistory");

    let chatTextWrapper=document.createElement("div");

    chatTextWrapper.classList.add("chatTextWrapper");
    chatTextWrapper.classList.add("float-right");
    chatTextWrapper.classList.add("bg-warning")
    chatTextWrapper.innerHTML=`
    <div class="user_time">
    <span class="roboto text-dark">${data.username}</span> <span class="text-secondary">${data.time}</span>
</div>
<!-- user chat text -->
<div class="user_chat_text">
   ${data.text}
</div>
    `
    chatMessageHistory.appendChild(chatTextWrapper)

    let chatTextForm=document.querySelector("#chatTextForm");

    chatTextForm.scrollTop=chatMessageHistory.scrollTop;

})


// show chat sidebar

const show_chat_sidebar=document.getElementById("show_chat_sidebar");
const chatSidebar=document.getElementById("chatSidebar");
const chatHistoryWrapper=document.getElementById("chatHistoryWrapper");

let isClick=false;

show_chat_sidebar.addEventListener("click",e=>{
    isClick=!isClick;

    if(isClick){
       if(window.innerWidth > 567){
        chatSidebar.style.width=`20%`
        chatSidebar.style.transform="translateX(0%)"
        chatSidebar.style.opacity="1"
        chatHistoryWrapper.style.width=`80%`
       }
       else{

        chatSidebar.style.width=`60%`
        chatSidebar.style.transform="translateX(0%)"
        chatSidebar.style.opacity="1"
        chatHistoryWrapper.style.width=`40%`
       }
   

       }
   
        else{
            if(window.innerWidth > 567){
                chatSidebar.style.width=`20%`
                chatSidebar.style.transform="translateX(0%)"
                chatSidebar.style.opacity="1"
                chatHistoryWrapper.style.width=`80%`
            }
            else{
                chatSidebar.style.width=`0%`
                chatHistoryWrapper.style.width=`100%`
                chatSidebar.style.transform="translateX(-100%)"
                chatSidebar.style.opacity="0"
            }
         
        }
})


