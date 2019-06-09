// framework express
var express = require('express'), bodyParser = require('body-parser');
var rutas = express.Router();
const usuarios = require("./../datos/usuarios")
const SQL = require('./../datos/conexcionPostgresSQL')
//para  leer JOSN del cuerpo de las peticiones
rutas.use(bodyParser.json());


// al recibir un GET para /usuarios
rutas.get("/usuarios", function (req, res, next) {
    // consulta a la base de datos y dependiendo de lo que devuelva retorna la informacion o un error
    
    var consulta = usuarios.obtenerSentenciaSelectTodos()

    SQL.ejecutarConsulta(consulta)
    .then(resultadoDeConsulta=>{
        res.send(resultadoDeConsulta)
    })
    .catch(err=>{
        res.status(500).send(err)
    })
});


// al recibir un GET para un usuario especifico
rutas.get("/usuarios/:id", function (req, res, next) {
    // devuelve el json del usuario con id solicitado

    var consulta = usuarios.obtenerSentenciaSelectEspecifico(req.params.id);
    
    // realiza la consulta y puede ser exitosa o fallida
    SQL.ejecutarConsulta(consulta)
    .then(resultadoDeConsulta=>{    // si es exitosa
        if (resultadoDeConsulta.length !== 0){ // si la consulta da un resultado
            res.send(resultadoDeConsulta);
        }else{  // si la consulta no da ningun resultado
            res.status(404).send({ error : 'usuario no encontrado' });
        }
    })
    .catch(err=>{   // si no es exitosa porque ocurrio un error al realizarl
        res.status(500).send(err)
    })
});


// al pedir crear un usuario nuevo
rutas.post("/usuarios", function (req, res, next) {
    // si el JSON recibido es correcto se agrega el usuario
    // si se obtiene undefined es que no se pudo agregar
    if (usuarios.objetoValido(req.body)){

        var consulta = usuarios.obtenerSentenciaInsert(req.body);
        SQL.ejecutarConsulta(consulta)
        .then(resultadoDeConsulta=>{    // si es exitosa
            if (resultadoDeConsulta.length !== 0){ // si la consulta da un resultado
                res.send(resultadoDeConsulta);
            }else{  // si la consulta no da ningun resultado
                res.status(404).send({ error : 'usuario no encontrado' });
            }
        })
        .catch(err=>{   // si no es exitosa porque ocurrio un error al realizarl
            res.status(500).send(err)
        })
    }else{
        res.status(404).send({ "error" : 'los datos recibidos no forman un usuario' });
    }
});


// al querer actualizar un usuario
rutas.put("/usuarios/:id", function (req, res, next) {
    if (usuarios.camposValido(req.body)){
        var consulta = usuarios.obtenerSentenciaUpdate(req.body, req.params.id);
        SQL.ejecutarConsulta(consulta)
        .then(resultadoDeConsulta=>{    // si es exitosa
            if (resultadoDeConsulta.length !== 0){ // si la consulta da un resultado
                res.send(resultadoDeConsulta);
            }else{  // si la consulta no da ningun resultado
                res.status(404).send({ error : 'usuario no encontrado' });
            }
        })
        .catch(err=>{   // si no es exitosa porque ocurrio un error al realizarl
            res.status(500).send(err)
        })
    }else{
        res.status(404).send({ "error" : 'No se pudo actualizar el usuario' });
    }
});



// al solicitar eliminar un usuario
rutas.delete("/usuarios/:id", function (req, res, next) {
// devuelve el json del usuario con id solicitado
    // obtiene la consulta para eliminar al usuario
    var consulta = usuarios.obtenerSentenciaDelete(req.params.id)
    
    // realiza la consulta y puede ser exitosa o fallida
    SQL.ejecutarConsulta(consulta)
    .then(resultadoDeConsulta=>{    // si es exitosa
        if (resultadoDeConsulta.length !== 0){ // si la consulta da un resultado
            res.send(resultadoDeConsulta);
        }else{  // si la consulta no da ningun resultado
            res.status(404).send({ error : 'usuario no encontrado' });
        }
    })
    .catch(err=>{   // si no es exitosa porque ocurrio un error al realizarl
        res.status(500).send(err)
    })
});


module.exports = rutas;
