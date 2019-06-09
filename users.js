

const users = [];

function addUser(user){
    users.push(user);
}

function removeAddUser(userId){
    users.filter(i => {
        user.id != userId
    });
}

function getUsers(){
    return users;
}


module.exports = {
    addUser,
    removeAddUser,
    getUsers
}
