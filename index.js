// framework express
var express = require('express'), bodyParser = require('body-parser');
var app = express();
var sql = require('./datos/conexcionPostgresSQL')
sql.cargarDatosDeConexcion();

const rutasDeUsuario = require("./rutas/rutasUsuario")

// puerto en el que esuchara el server
const numPuerto = 8080;

// inicia la escucha
app.listen(numPuerto, function () {
    console.log("Servidor iniciado en puerto " + numPuerto);
});


// al recibir un GET para /
app.get("/", function (req, res, next) {
    res.send('¡Bienvenido!')
});


app.use(rutasDeUsuario);




/*
https://www.youtube.com/watch?v=RqQ1d1qEWlE
https://www.nodehispano.com/2012/06/manejo-de-rutas-con-express-framework-para-nodejs/
*/

