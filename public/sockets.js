var socket = io();
var usersInRoom = [];
var usersColors = {

}

socket.on('LOAD_FILES', function(){
    loadFiles();
});

socket.on('BLOCK_CELL', data => {
    blockSelfCell(data.cell, usersColors[data.username] || "blue");
});

socket.on('RELEASE_CELL', data => {
    releaseSelfCell(data.cell);
});

socket.on("EDIT_CELL", data => {
    editSelfCell(data.cell, data.data);
});

socket.on("JOIN_ON", data => { // HERE YOU RECEIVE THE USERS FROM THE ROOM
    usersColors[data.username] = // GENERATE RANDOM COLOR
    usersInRoom.push(data.username);
    renderUsersOnRoom(usersInRoom);
});

function startEdit(filename){
    socket.emit("JOIN_ON", {
        filename,
        username
    });
}

function blockCell(cell){
    socket.emit("BLOCK_CELL", {
        file: selected,
        cell,
        username
    });
}

function releaseCell(cell)
{
    socket.emit("RELEASE_CELL", {
        file: selected,
        cell,
        username
    });
}

function editFile(cell, data){
    socket.emit("EDIT_CELL", {
        file: selected,
        cell,
        data,
        username
    });
}