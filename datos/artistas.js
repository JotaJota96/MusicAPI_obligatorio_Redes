const objetoModelo = {
    nombre: 'nombre',
    nacionalidad: 'nacionalidad',
    instrumento: 'instrumento'
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function objetoValido(objAValidar){
    // retorna true si el objeto es de tipo usuario
    // funcion extraida de: (aunque no funcionaba pero la arregle)
    // https://www.todojs.com/comparacion-objetos-javascript/

    // para cada objeto, guarda un array cuyos elementos sera el nombre de los atributos del objeto (key)
    var aKeys = Object.keys(objAValidar).sort();
    var bKeys = Object.keys(objetoModelo).sort();

    // si la cantidad de keys es diferente, no se trara del mismo tipo objeto
    if (aKeys.length !== bKeys.length) {
        return false;
    }
    // esto no se bien que hace, creo que concatena los nombres de las keys y las compara, pero no le hayo sentido
    if (aKeys.join('') !== bKeys.join('')) {
        return false;
    }

    // recorre las keys comparandolas, si alguna no coincide retorna false
    for (var i = 0; i < aKeys.length; i++) {
        if ( aKeys[i]  !== bKeys[i]) {
            return false;
        }
    }
    // si llego hasta aca, las keys coincidian y devuelve true
    return true;
}

function camposValido(objAValidar){
    // para cada objeto, guarda un array cuyos elementos sera el nombre de los atributos del objeto (key)
    var aKeys = Object.keys(objAValidar).sort();
    var bKeys = Object.keys(objetoModelo).sort();

    // si el objeto recibido no tiene keys, retorna false
    if (aKeys.length == 0){
        return false
    }

    // para cada key del objeto a verificar, se busca que coincida con el objeto de usuarios
    for (var i = 0; i < aKeys.length; i++) {
        var b = false; // iterara mientras no encuentre coincidencia
        for (var j = 0; b == false && j < bKeys.length; j++) {
            if ( aKeys[i] == bKeys[j]) { // si encuentra coincidencia
                b = true;
            }
        }
        if (b == false){ // si recorrio todas las keys y no encontro coincidencia para alguna, retorna false
            return false
        }
    }
    return true;
}

function obtenerSentenciaSelectTodos(){
    return "SELECT * FROM artistas"
}

function obtenerSentenciaSelectEspecifico(id){
    return "SELECT * FROM artistas WHERE nombre = '" + id + "'"
}

function obtenerSentenciaInsert(o){ 
    // retorna la consulta INSERT para el objeto u (usuario)
    // se asume que el objeto es de tipo usuario
    var ret = "INSERT INTO artistas (nombre, nacionalidad, instrumento) VALUES (";
    ret += "'" + o.nombre + "', ";
    ret += "'" + o.nacionalidad + "', ";
    ret += "'" + o.instrumento + "') returning *";
    return ret;
}

function obtenerSentenciaUpdate(o, id){
    // obtiene las keys a actualizar
    var oKeys = Object.keys(o);

    var ret = "UPDATE artistas SET "

    // recorre las keys a actualizar y dependiendo de cual sea, agrega los datos a la consulta
    for (var i = 0; i < oKeys.length; i++) {
        switch (oKeys[i]){
            case "nombre":
                ret += "nombre = '" + o.nombre + "'";
                break;
            case "nacionalidad":
                ret += "nacionalidad = '" + o.nacionalidad + "'";
                break;
            case "instrumento":
                ret += "instrumento = '" + o.instrumento + "'";
                break;
            default:
                break;            
        }
        // si no es la ultima iteracion del for, agrega una coma
        if (i+1 < oKeys.length){
            ret += ", ";
        }
    }
    ret += "WHERE nombre = '" + id + "' returning *"
    return ret;
}

function obtenerSentenciaDelete(id){
    return "DELETE FROM artistas WHERE nombre = '" + id + "' returning *"
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

exports.objetoValido = objetoValido;
exports.camposValido = camposValido;
exports.obtenerSentenciaSelectTodos = obtenerSentenciaSelectTodos;
exports.obtenerSentenciaSelectEspecifico = obtenerSentenciaSelectEspecifico;
exports.obtenerSentenciaInsert = obtenerSentenciaInsert;
exports.obtenerSentenciaUpdate = obtenerSentenciaUpdate;
exports.obtenerSentenciaDelete = obtenerSentenciaDelete;

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
