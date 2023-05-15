let users= [];
const { trimStr} = require('./utils');

const findUsers = (user)=>{
    const userName = trimStr(user.name);
    const roomName = trimStr(user.room);
    //console.log(user, roomName, userName);

    return users.find(
        (u)=> trimStr(u.name) === userName && trimStr(u.room) === roomName
        );
}


const addUser = (user)=>{

    const isExist = findUsers(user);

    !isExist && users.push(user);
    const currentUser = isExist || user;
    

    return {isExist: !!isExist, user: currentUser}
}

const removeUser = (user)=>{
    const found = findUsers(user);
    
    if (found) {
        users.filter(({ room, name}) => room === found.room && name === found.name)
    }

    return found;
}

module.exports = { addUser, findUsers, removeUser };