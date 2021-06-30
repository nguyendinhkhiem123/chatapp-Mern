let users = [];


function joinUser(id , name , userroom) {
    const user = { id , name , userroom };

    users.push(user);
    
    return user;
}

function getCurrentUser(id) {
    
    return users.filter((user) => user.id === id)
}


module.exports = {
    joinUser ,
    getCurrentUser
}