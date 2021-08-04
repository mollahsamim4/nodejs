const joinChat=document.getElementById("joinChat");

const usernameErr=document.querySelector(".usernameErr")
const roomnameErr=document.querySelector(".roomnameErr")


function checkUsernameValid(username){
    if(username==""){
        usernameErr.style.display="block";
        usernameErr.innerHTML="Input field must not be empty";
    }
    else{
        usernameErr.style.display="none";
    }
}
function checkRoomname(roomname){
    if(roomname==""){
        roomnameErr.style.display="block";
        roomnameErr.innerHTML="Please select Any room";
    }
    else{
        roomnameErr.style.display="none";
    }
}




joinChat.onsubmit=e=>{
    let username=e.target.elements.username.value
    let roomname=e.target.elements.roomname.value;
    checkUsernameValid(username);
    checkRoomname(roomname);
    
    if(username !=="" && roomname !==""){
   return true;
    }
    else{
      return false;
    }
}