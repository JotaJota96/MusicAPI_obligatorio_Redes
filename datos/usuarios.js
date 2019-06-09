
const objetoModelo = {
    nickname: 'nickname',
    nombre: 'usuario',
    apellido: 'apellido',
    email: 'email'
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// dado un objeto, devuelve true si sus claves son iguales a la del objeto modelo
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

// dado un objeto, deuelve true si las keys de este pertenecen a las del objeto modelo
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
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function obtenerSentenciaSelectTodos(){
    return "SELECT * FROM usuarios"
}

function obtenerSentenciaSelectEspecifico(id){
    return "SELECT * FROM usuarios WHERE nickname = '" + id + "'"
}

function obtenerSentenciaInsert(o){
    // retorna la consulta INSERT para el objeto u (usuario)
    // se asume que el objeto es de tipo usuario
    var ret = "INSERT INTO usuarios (nickname, nombre, apellido, email) VALUES (";
    ret += "'" + o.nickname + "', ";
    ret += "'" + o.nombre + "', ";
    ret += "'" + o.apellido + "', ";
    ret += "'" + o.email + "') returning *";
    return ret;
}

function obtenerSentenciaUpdate(o, id){
    // obtiene las keys a actualizar
    var oKeys = Object.keys(o);

    var ret = "UPDATE usuarios SET "

    // recorre las keys a actualizar y dependiendo de cual sea, agrega los datos a la consulta
    for (var i = 0; i < oKeys.length; i++) {
        switch (oKeys[i]){
            case "nickname":
                ret += "nickname = '" + o.nickname + "'";
                break;
            case "nombre":
                ret += "nombre = '" + o.nombre + "'";
                break;
            case "apellido":
                ret += "apellido = '" + o.apellido + "'";
                break;
            case "email":
                ret += "email = '" + o.email + "'";
                break;
            default:
                break;            
        }
        // si no es la ultima iteracion del for, agrega una coma
        if (i+1 < oKeys.length){
            ret += ", ";
        }
    }
    ret += "WHERE nickname = '" + id + "' returning *"
    return ret;
}

function obtenerSentenciaDelete(id){
    return "DELETE FROM usuarios WHERE nickname = '" + id + "' returning *"
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

exports.objetoValido = objetoValido;
exports.camposValido = camposValido;
exports.obtenerSentenciaSelectTodos = obtenerSentenciaSelectTodos;
exports.obtenerSentenciaSelectEspecifico = obtenerSentenciaSelectEspecifico;
exports.obtenerSentenciaInsert = obtenerSentenciaInsert;
exports.obtenerSentenciaUpdate = obtenerSentenciaUpdate;
exports.obtenerSentenciaDelete = obtenerSentenciaDelete;

