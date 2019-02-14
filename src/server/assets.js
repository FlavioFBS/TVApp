/**
 * Archivo para manipular las funciones que se usaran (como helpers)
*/

const fs = require('fs');


//lectura estatica de archivos base (index.html, app.js, app.css)
module.exports.leer =function leer(url, callback) {
    fs.readFile('./public/'+url, (err, data) => {
        if (err) {
            return callback(err)
        }
        //res.end(data.toString())
        callback(err, data.toString())
    })
}

