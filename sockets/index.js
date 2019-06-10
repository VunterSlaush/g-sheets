var globalIo;
var fs = require('fs')

const create = io => {
    globalIo = io;
    return initSocket;// The Metho who creates the instance socket method 
}

const initSocket = socket => {
    
    socket.on("JOIN_ON", data => {
        socket.join(data.filename);
        console.log("JOINING FILENAME ROOM:"+data.filename+" USER:"+ data.username);
        socket.to(data.filename).emit("JOIN_ON", data);
    });

    socket.on("BLOCK_CELL", data => {
        const file = data.file;
        const cell = data.cell;
        console.log("BLOCKING CELL:", cell, " ON FILE: ", file);
        socket.to(file).emit("BLOCK_CELL", data);
    });

    socket.on("RELEASE_CELL", data => {
        const file = data.file;
        const cell = data.cell;
        console.log("RELEASING CELL:", cell, " ON FILE: ", file);
        socket.to(file).emit("RELEASE_CELL", data);
    });

    socket.on("EDIT_CELL", data => {
        const file = data.file;
        const cell = data.cell;
        const value = data.data;
        console.log("EDITING CELL:", cell, " ON FILE: ", file, "WITH VALUE:", value);
        editFile(file, cell, value);
        socket.to(file).emit("EDIT_CELL", data);
    });
}

editFile = (filename, cell, value) => {
    let rawdata = fs.readFileSync("./storage/"+filename);
    let file = JSON.parse(rawdata);
    file[cell] = value;
    console.log("EDITED:", file);
    let data = JSON.stringify(file);
    fs.writeFileSync("./storage/"+filename, data);    
}

module.exports = create;