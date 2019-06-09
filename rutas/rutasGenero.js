// framework express
var express = require('express'), bodyParser = require('body-parser');

// para manejar las rutas
var rutas = express.Router();

//para  leer JOSN del cuerpo de las peticiones
rutas.use(bodyParser.json());

// para verificar datos y ejecutar consultas
const generos = require("./../datos/generos")
const SQL = require('./../datos/conexcionPostgresSQL')

// al recibir un GET para /generos
rutas.get("/generos", function (req, res, next) {
    // obtiene la consulta SQL
    var consulta = generos.obtenerSentenciaSelectTodos()

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
rutas.get("/generos/:id", function (req, res, next) {
    // devuelve el json del generos con id solicitado

    // obtiene la consulta SQL
    var consulta = generos.obtenerSentenciaSelectEspecifico(req.params.id);
    
    // consulta a la base de datos
    SQL.ejecutarConsulta(consulta)
    .then(resultadoDeConsulta=>{ // si la consulta fue exitosa se ejecuta esta parte
        if (resultadoDeConsulta.length !== 0){ // si la consulta da algun resultado
            res.send(resultadoDeConsulta);
        }else{  // si la consulta no da ningun resultado
            res.status(404).send({ error : 'genero no encontrado' });
        }
    })
    .catch(err=>{ // si hubo un error se ejecuta esta parte
        res.status(500).send(err)
    })
});


// al pedir crear un genero nuevo
rutas.post("/generos", function (req, res, next) {
    // si el JSON recibido es correcto se agrega el genero

    // verifica que los datos recibidos son validos
    if (generos.objetoValido(req.body)){

        // obtiene la consulta SQL
        var consulta = generos.obtenerSentenciaInsert(req.body);
        
        // consulta a la base de datos
        SQL.ejecutarConsulta(consulta)
        .then(resultadoDeConsulta=>{ // si la consulta fue exitosa se ejecuta esta parte
            if (resultadoDeConsulta.length !== 0){ // si la consulta da algun resultado
                res.send(resultadoDeConsulta);
            }else{  // si la consulta no da ningun resultado
                res.status(404).send({ error : 'genero no encontrado' });
            }
        })
        .catch(err=>{ // si hubo un error se ejecuta esta parte
            res.status(500).send(err)
        })
    }else{
        res.status(404).send({ "error" : 'los datos recibidos no forman un artista' });
    }
});


// al querer actualizar un genero
rutas.put("/generos/:id", function (req, res, next) {
    // verifica que los datos recibidos son validos
    if (generos.camposValido(req.body)){
        
        // obtiene la consulta SQL
        var consulta = generos.obtenerSentenciaUpdate(req.body, req.params.id);
        
        // consulta a la base de datos
        SQL.ejecutarConsulta(consulta)
        .then(resultadoDeConsulta=>{ // si la consulta fue exitosa se ejecuta esta parte
            if (resultadoDeConsulta.length !== 0){ // si la consulta da algun resultado
                res.send(resultadoDeConsulta);
            }else{  // si la consulta no da ningun resultado
                res.status(404).send({ error : 'genero no encontrado' });
            }
        })
        .catch(err=>{ // si hubo un error se ejecuta esta parte
            res.status(500).send(err)
        })
    }else{
        res.status(404).send({ "error" : 'No se pudo actualizar el genero' });
    }
});



// al solicitar eliminar un genero
rutas.delete("/generos/:id", function (req, res, next) {
// devuelve el json del genero con id solicitado
    // obtiene la consulta SQL
    var consulta = generos.obtenerSentenciaDelete(req.params.id)
    
    // consulta a la base de datos
    SQL.ejecutarConsulta(consulta)
    .then(resultadoDeConsulta=>{ // si la consulta fue exitosa se ejecuta esta parte
        if (resultadoDeConsulta.length !== 0){ // si la consulta da algun resultado
            res.send(resultadoDeConsulta);
        }else{  // si la consulta no da ningun resultado
            res.status(404).send({ error : 'genero no encontrado' });
        }
    })
    .catch(err=>{ // si hubo un error se ejecuta esta parte
        res.status(500).send(err)
    })
});


module.exports = rutas;
