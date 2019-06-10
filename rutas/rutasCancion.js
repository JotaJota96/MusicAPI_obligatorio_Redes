// framework express
var express = require('express'), bodyParser = require('body-parser');

// para manejar las rutas
var rutas = express.Router();

//para  leer JOSN del cuerpo de las peticiones
rutas.use(bodyParser.json());

// para verificar datos y ejecutar consultas
const canciones = require("./../datos/canciones")
const SQL = require('./../datos/conexcionPostgresSQL')


// al recibir un GET para /canciones
rutas.get("/canciones", function (req, res, next) {
    // obtiene la consulta SQL
    var consulta = canciones.obtenerSentenciaSelectTodos()

    // consulta a la base de datos
    SQL.ejecutarConsulta(consulta)
    .then(resultadoDeConsulta=>{ // si la consulta fue exitosa se ejecuta esta parte
        res.send(resultadoDeConsulta)
    })
    .catch(err=>{ // si hubo un error se ejecuta esta parte
        res.status(500).send(err)
    })
});


// al recibir un GET para un usuario especifico
rutas.get("/canciones/:id1/:id2", function (req, res, next) {
    // devuelve el json del canciones con id solicitado

    // obtiene la consulta SQL
    var consulta = canciones.obtenerSentenciaSelectEspecifico(req.params.id1, req.params.id2);
    
    // consulta a la base de datos
    SQL.ejecutarConsulta(consulta)
    .then(resultadoDeConsulta=>{ // si la consulta fue exitosa se ejecuta esta parte
        if (resultadoDeConsulta.length !== 0){ // si la consulta da algun resultado
            res.send(resultadoDeConsulta);
        }else{  // si la consulta no da ningun resultado
            res.status(404).send({ error : 'cancion no encontrada' });
        }
    })
    .catch(err=>{ // si hubo un error se ejecuta esta parte
        res.status(500).send(err)
    })
});


// al pedir crear un usuario nuevo
rutas.post("/canciones", function (req, res, next) {
    // si el JSON recibido es correcto se agrega el usuario

    // verifica que los datos recibidos son validos
    if (canciones.objetoValido(req.body)){

        // obtiene la consulta SQL
        var consulta = canciones.obtenerSentenciaInsert(req.body);
        
        // consulta a la base de datos
        SQL.ejecutarConsulta(consulta)
        .then(resultadoDeConsulta=>{ // si la consulta fue exitosa se ejecuta esta parte
            if (resultadoDeConsulta.length !== 0){ // si la consulta da algun resultado
                res.send(resultadoDeConsulta);
            }else{  // si la consulta no da ningun resultado
                res.status(404).send({ error : 'cancion no encontrada' });
            }
        })
        .catch(err=>{ // si hubo un error se ejecuta esta parte
            res.status(500).send(err)
        })
    }else{
        res.status(404).send({ "error" : 'los datos recibidos no forman una cancion' });
    }
});


// al querer actualizar un usuario
rutas.put("/canciones/:id1/:id2", function (req, res, next) {
    // verifica que los datos recibidos son validos
    if (canciones.camposValido(req.body)){
        
        // obtiene la consulta SQL
        var consulta = canciones.obtenerSentenciaUpdate(req.body, req.params.id1, req.params.id2);
        
        // consulta a la base de datos
        SQL.ejecutarConsulta(consulta)
        .then(resultadoDeConsulta=>{ // si la consulta fue exitosa se ejecuta esta parte
            if (resultadoDeConsulta.length !== 0){ // si la consulta da algun resultado
                res.send(resultadoDeConsulta);
            }else{  // si la consulta no da ningun resultado
                res.status(404).send({ error : 'cancion no encontrada' });
            }
        })
        .catch(err=>{ // si hubo un error se ejecuta esta parte
            res.status(500).send(err)
        })
    }else{
        res.status(404).send({ "error" : 'No se pudo actualizar la cancion' });
    }
});



// al solicitar eliminar un usuario
rutas.delete("/canciones/:id1/:id2", function (req, res, next) {
// devuelve el json del usuario con id solicitado
    // obtiene la consulta SQL
    var consulta = canciones.obtenerSentenciaDelete(req.params.id1, req.params.id2)
    
    // consulta a la base de datos
    SQL.ejecutarConsulta(consulta)
    .then(resultadoDeConsulta=>{ // si la consulta fue exitosa se ejecuta esta parte
        if (resultadoDeConsulta.length !== 0){ // si la consulta da algun resultado
            res.send(resultadoDeConsulta);
        }else{  // si la consulta no da ningun resultado
            res.status(404).send({ error : 'cancion no encontrada' });
        }
    })
    .catch(err=>{ // si hubo un error se ejecuta esta parte
        res.status(500).send(err)
    })
});


module.exports = rutas;
