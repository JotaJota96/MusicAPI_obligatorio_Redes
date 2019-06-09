// framework express
var express = require('express'), bodyParser = require('body-parser');

// para manejar las rutas
var rutas = express.Router();

//para  leer JOSN del cuerpo de las peticiones
rutas.use(bodyParser.json());

// para verificar datos y ejecutar consultas
const usuarios = require("./../datos/usuarios")
const SQL = require('./../datos/conexcionPostgresSQL')


// al recibir un GET para /usuarios
rutas.get("/usuarios", function (req, res, next) {
    // obtiene la consulta SQL
    var consulta = usuarios.obtenerSentenciaSelectTodos()

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
rutas.get("/usuarios/:id", function (req, res, next) {
    // devuelve el json del usuario con id solicitado

    // obtiene la consulta SQL
    var consulta = usuarios.obtenerSentenciaSelectEspecifico(req.params.id);
    
    // consulta a la base de datos
    SQL.ejecutarConsulta(consulta)
    .then(resultadoDeConsulta=>{ // si la consulta fue exitosa se ejecuta esta parte
        if (resultadoDeConsulta.length !== 0){ // si la consulta da algun resultado
            res.send(resultadoDeConsulta);
        }else{  // si la consulta no da ningun resultado
            res.status(404).send({ error : 'usuario no encontrado' });
        }
    })
    .catch(err=>{ // si hubo un error se ejecuta esta parte
        res.status(500).send(err)
    })
});


// al pedir crear un usuario nuevo
rutas.post("/usuarios", function (req, res, next) {
    // si el JSON recibido es correcto se agrega el usuario

    // verifica que los datos recibidos son validos
    if (usuarios.objetoValido(req.body)){

        // obtiene la consulta SQL
        var consulta = usuarios.obtenerSentenciaInsert(req.body);
        
        // consulta a la base de datos
        SQL.ejecutarConsulta(consulta)
        .then(resultadoDeConsulta=>{ // si la consulta fue exitosa se ejecuta esta parte
            if (resultadoDeConsulta.length !== 0){ // si la consulta da algun resultado
                res.send(resultadoDeConsulta);
            }else{  // si la consulta no da ningun resultado
                res.status(404).send({ error : 'usuario no encontrado' });
            }
        })
        .catch(err=>{ // si hubo un error se ejecuta esta parte
            res.status(500).send(err)
        })
    }else{
        res.status(404).send({ "error" : 'los datos recibidos no forman un usuario' });
    }
});


// al querer actualizar un usuario
rutas.put("/usuarios/:id", function (req, res, next) {
    // verifica que los datos recibidos son validos
    if (usuarios.camposValido(req.body)){
        
        // obtiene la consulta SQL
        var consulta = usuarios.obtenerSentenciaUpdate(req.body, req.params.id);
        
        // consulta a la base de datos
        SQL.ejecutarConsulta(consulta)
        .then(resultadoDeConsulta=>{ // si la consulta fue exitosa se ejecuta esta parte
            if (resultadoDeConsulta.length !== 0){ // si la consulta da algun resultado
                res.send(resultadoDeConsulta);
            }else{  // si la consulta no da ningun resultado
                res.status(404).send({ error : 'usuario no encontrado' });
            }
        })
        .catch(err=>{ // si hubo un error se ejecuta esta parte
            res.status(500).send(err)
        })
    }else{
        res.status(404).send({ "error" : 'No se pudo actualizar el usuario' });
    }
});



// al solicitar eliminar un usuario
rutas.delete("/usuarios/:id", function (req, res, next) {
// devuelve el json del usuario con id solicitado
    // obtiene la consulta SQL
    var consulta = usuarios.obtenerSentenciaDelete(req.params.id)
    
    // consulta a la base de datos
    SQL.ejecutarConsulta(consulta)
    .then(resultadoDeConsulta=>{ // si la consulta fue exitosa se ejecuta esta parte
        if (resultadoDeConsulta.length !== 0){ // si la consulta da algun resultado
            res.send(resultadoDeConsulta);
        }else{  // si la consulta no da ningun resultado
            res.status(404).send({ error : 'usuario no encontrado' });
        }
    })
    .catch(err=>{ // si hubo un error se ejecuta esta parte
        res.status(500).send(err)
    })
});


module.exports = rutas;
