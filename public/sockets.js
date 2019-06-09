var socket = io();

socket.on('LOAD_FILES', function(){
    loadFiles();
});

socket.on('BLOCK_CELL', data => {
    blockSelfCell(data.cell);
});

socket.on('RELEASE_CELL', data => {
    releaseSelfCell(data.cell);
});

socket.on("EDIT_CELL", data => {
    editSelfCell(data.cell, data.data);
});

function startEdit(filename){
    socket.emit("JOIN_ON", filename);
}

function blockCell(cell){
    socket.emit("BLOCK_CELL", {
        file: selected,
        cell
    });
}

function releaseCell(cell)
{
    socket.emit("RELEASE_CELL", {
        file: selected,
        cell
    });
}

function editFile(cell, data){
    socket.emit("EDIT_CELL", {
        file: selected,
        cell,
        data
    });
}