
const express = require("express");
const routes = require("./routes");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const socketAdmin = require("./sockets")(io)

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(fileUpload());


app.get("/page", (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post("/upload", (req, res) => {
    req.files.file.mv(`storage/${req.files.file.name}`, err => {
        if (err) res.send(422)
        res.send(200)
        io.sockets.emit('LOAD_FILES');
    });    
});

app.use("/storage", express.static(__dirname + "/storage"));
app.use("/public", express.static(__dirname + "/public"));
app.use("/api", routes(io));
app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log("ERR", err);
  res.locals.message = err.message;
  res.locals.error = err;
  // render the error page
  res.status(err.status || 500).json({});
});


io.on('connection', socketAdmin);


http.listen(3000, function(){
    console.log('listening on *:3000');
});
