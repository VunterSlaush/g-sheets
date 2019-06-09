
const express = require("express");
const router = express.Router();
const fs = require("fs");
const STORAGE_PATH = "./storage";


const creator = () => {
    // LEER TODOS LOS ARCHIVOS DE STORAGE Y MANDARLOS AL CLIENTE 
    router.get("/", (req, res) => {
        fs.readdir(STORAGE_PATH, function (err, files) {
            if (err)
                res.send(409);
            res.json(files)
        });
    });

    return router;
}



module.exports = creator;