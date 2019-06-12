const express = require('express')
const { Client } = require('pg')
const fs = require('fs');

// informacion de conexcion a la base de datos
// el puerto por defecto es 5432, pero yo lo tengo en otro puerto
var connectionData;

function cargarDatosDeConexcion(){
    
    fs.readFile('./datos/datosDeConexcion.json', 'utf-8', (err, data) => {
        if(err) {
            console.log("Error al cargar los datos de conexion para la base de datos");
            console.log('error: ', err);
            console.log("El servidor se cerrara");
            process.exit();
        } else {
            //connectionData = data;
            connectionData =JSON.parse(data)
            console.log("Se han cargado los datos de conexcion a la base de datos");
            var consulta = "SELECT 'test de conexion'"
            ejecutarConsulta(consulta)
            .then((resultadoDeConsulta)=>{
                console.log("Se ha establecido conexion con la base de datos");
            })
            .catch((err)=>{
                console.log("No se ha podido establecer la conexion con la base de datos");
                console.log(err);
                console.log("El servidor se cerrara");
                process.exit();
            })
        }
    });
    /*
    {   
        user: 'postgres',
        host: 'localhost',
        database: 'musica',
        password: '1234',
        port: 5433
    }
    */
}

function ejecutarConsulta(sql){
    // recibe la consulta sql y devuelve una promesa
    // si la promesa es resuelta (resolve) se ejecutara el .then() desde donde se llamo esta funcion
    // si la promesa es rechazada (reject) se ejecutara el .catch() desde donde se llamo esta funcion
    
    // se crea la promesa y se define los valores que puede devolver
    return new Promise((resolve, reject)=>{
        // se manda a ejecutar la consulta y segun si es exitosa o no se ejecuta alguno de los callbacks
        ejecutarSQL(sql, resConsulta =>{
            // si es exitosa se ejecuta esto y responde el resultado de la consulta
            return resolve(resConsulta)
        }, errConsulta =>{
            // si es fallida se ejecuta esto otro y se retorna el error
            return reject(errConsulta)
        })
    })
}


// Recibe una consulta SQL y una respuesta a enviar
function ejecutarSQL(sql, OK, notOK){
    // conecta con la base de datos
    const client = new Client(connectionData)
    client.connect()
    // Envia la consulta
    client.query(sql)
        .then(response => { // si la consulta sale bien
            client.end()	// Finaliza la conexcion
            OK(response.rows)
        })
        .catch(err => {	// si algo sale mal
            client.end()	// Finaliza la conexcion
            notOK(err)
        })
}


/*
Codigo extraido de:
https://ed.team/blog/como-usar-bases-de-datos-postgres-con-nodejs
Promesas:
https://platzi.com/blog/que-es-y-como-funcionan-las-promesas-en-javascript/
*/


exports.cargarDatosDeConexcion = cargarDatosDeConexcion
exports.ejecutarConsulta = ejecutarConsulta
