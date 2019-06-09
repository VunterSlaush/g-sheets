const fs = require("fs");
const router = require("express").Router();

const isIndex = file => file === "index.js";
const isJS = file => file.substr(-3) === ".js";


function creator(io) {
    fs.readdirSync("./routes").forEach(file => {
        if (isJS(file) && !isIndex(file)) {
            const routeName = file.split(".")[0];
            const route = require("./" + file)(io);
            router.use(`/${routeName}`, route);
        }
    });
    return router;
}



module.exports = creator;
