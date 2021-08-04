const users=[];

function userJoin(id,username,room){
    let user={id,username,room}
    users.push(user);
    return user;
}

function getCurrentUser(id){
   let username=users.find(user=>user.id===id);

   return username.username;
}

function totalUser(){
    return users.length;
}

function showAlluser(){
    return users.map(user=>{
        return `
        <li class="nav-item text-white h4"><i class="fas fa-user-alt    "></i> ${user.username}</li>
        `
    }).join()
}

function findIndex(socketId){
    return users.findIndex(user=>user.id===socketId)
}

function deleteUsers(index){
    users.splice(index,1);
}

function showUserByRoom(room) {
    
  let result=users.filter(user=>user.room===room)

  return result.map(user=>{
      return `
      <li>${user.username}</li>
      `
  }).join("");
    
  }


module.exports={
    userJoin,
    getCurrentUser,
    totalUser,
    showAlluser,
    findIndex,
    deleteUsers,
    showUserByRoom
};