// framework express
var express = require('express'), bodyParser = require('body-parser');

// para manejar las rutas
var rutas = express.Router();

//para  leer JOSN del cuerpo de las peticiones
rutas.use(bodyParser.json());

// para verificar datos y ejecutar consultas
const discos = require("./../datos/discos")
const SQL = require('./../datos/conexcionPostgresSQL')

// al recibir un GET para /generos
rutas.get("/discos", function (req, res, next) {
    // obtiene la consulta SQL
    var consulta = discos.obtenerSentenciaSelectTodos()

    // consulta a la base de datos
    SQL.ejecutarConsulta(consulta)
    .then(resultadoDeConsulta=>{ // si la consulta fue exitosa se ejecuta esta parte
        res.send(resultadoDeConsulta)
    })
    .catch(err=>{ // si hubo un error se ejecuta esta parte
        res.status(500).send(err)
    })
});


// al recibir un GET para un generos especifico
rutas.get("/discos/:id", function (req, res, next) {
    // devuelve el json del generos con id solicitado

    // obtiene la consulta SQL
    var consulta = discos.obtenerSentenciaSelectEspecifico(req.params.id);
    
    // consulta a la base de datos
    SQL.ejecutarConsulta(consulta)
    .then(resultadoDeConsulta=>{ // si la consulta fue exitosa se ejecuta esta parte
        if (resultadoDeConsulta.length !== 0){ // si la consulta da algun resultado
            res.send(resultadoDeConsulta);
        }else{  // si la consulta no da ningun resultado
            res.status(404).send({ error : 'disco no encontrado' });
        }
    })
    .catch(err=>{ // si hubo un error se ejecuta esta parte
        res.status(500).send(err)
    })
});


// al pedir crear un disco nuevo
rutas.post("/discos", function (req, res, next) {
    // si el JSON recibido es correcto se agrega el genero

    // verifica que los datos recibidos son validos
    if (discos.objetoValido(req.body)){

        // obtiene la consulta SQL
        var consulta = discos.obtenerSentenciaInsert(req.body);
        
        // consulta a la base de datos
        SQL.ejecutarConsulta(consulta)
        .then(resultadoDeConsulta=>{ // si la consulta fue exitosa se ejecuta esta parte
            if (resultadoDeConsulta.length !== 0){ // si la consulta da algun resultado
                res.send(resultadoDeConsulta);
            }else{  // si la consulta no da ningun resultado
                res.status(404).send({ error : 'disco no encontrado' });
            }
        })
        .catch(err=>{ // si hubo un error se ejecuta esta parte
            res.status(500).send(err)
        })
    }else{
        res.status(404).send({ "error" : 'los datos recibidos no forman un disco' });
    }
});


// al querer actualizar un disco
rutas.put("/discos/:id", function (req, res, next) {
    // verifica que los datos recibidos son validos
    if (discos.camposValido(req.body)){
        
        // obtiene la consulta SQL
        var consulta = discos.obtenerSentenciaUpdate(req.body, req.params.id);
        
        // consulta a la base de datos
        SQL.ejecutarConsulta(consulta)
        .then(resultadoDeConsulta=>{ // si la consulta fue exitosa se ejecuta esta parte
            if (resultadoDeConsulta.length !== 0){ // si la consulta da algun resultado
                res.send(resultadoDeConsulta);
            }else{  // si la consulta no da ningun resultado
                res.status(404).send({ error : 'disco no encontrado' });
            }
        })
        .catch(err=>{ // si hubo un error se ejecuta esta parte
            res.status(500).send(err)
        })
    }else{
        res.status(404).send({ "error" : 'No se pudo actualizar el disco' });
    }
});



// al solicitar eliminar un disco
rutas.delete("/discos/:id", function (req, res, next) {
// devuelve el json del disco con id solicitado
    // obtiene la consulta SQL
    var consulta = discos.obtenerSentenciaDelete(req.params.id)
    
    // consulta a la base de datos
    SQL.ejecutarConsulta(consulta)
    .then(resultadoDeConsulta=>{ // si la consulta fue exitosa se ejecuta esta parte
        if (resultadoDeConsulta.length !== 0){ // si la consulta da algun resultado
            res.send(resultadoDeConsulta);
        }else{  // si la consulta no da ningun resultado
            res.status(404).send({ error : 'disco no encontrado' });
        }
    })
    .catch(err=>{ // si hubo un error se ejecuta esta parte
        res.status(500).send(err)
    })
});


module.exports = rutas;
