
const objetoModelo = {
    titulodisco: 'titulodisco',
    nombre: 'nombre',
    duracion: '0:00',
    enlace: 'enlace'
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
    return "SELECT * FROM canciones"
}

function obtenerSentenciaSelectEspecifico(id1,id2){
    return "SELECT * FROM canciones WHERE nombre = '" + id1 + "' AND titulodisco = '" + id2 + "' ";
}

function obtenerSentenciaInsert(o){
    // retorna la consulta INSERT para el objeto u (canciones)
    // se asume que el objeto es de tipo canciones
    var ret = "INSERT INTO canciones (titulodisco, nombre, duracion, enlace) VALUES (";
    ret += "'" + o.titulodisco + "', ";
    ret += "'" + o.nombre + "', ";
    ret += "'" + o.duracion + "', ";
    ret += "'" + o.enlace + "') returning *";
    return ret;
}

function obtenerSentenciaUpdate(o, id1, id2){
    // obtiene las keys a actualizar
    var oKeys = Object.keys(o);

    var ret = "UPDATE canciones SET "

    // recorre las keys a actualizar y dependiendo de cual sea, agrega los datos a la consulta
    for (var i = 0; i < oKeys.length; i++) {
        switch (oKeys[i]){
            case "titulodisco":
                ret += "titulodisco = '" + o.titulodisco + "'";
                break;
            case "nombre":
                ret += "nombre = '" + o.nombre + "'";
                break;
            case "duracion":
                ret += "duracion = '" + o.duracion + "'";
                break;
            case "enlace":
                ret += "enlace = '" + o.enlace + "'";
                break;
            default:
                break;            
        }
        // si no es la ultima iteracion del for, agrega una coma
        if (i+1 < oKeys.length){
            ret += ", ";
        }
    }
    ret += "WHERE nombre = '" + id1 + "' AND titulodisco = '" + id2 + "'returning *"
    return ret;
}

function obtenerSentenciaDelete(id1, id2){
    return "DELETE FROM canciones WHERE nombre = '" + id1 + "' AND titulodisco = '" + id2 + "' returning *"
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

exports.objetoValido = objetoValido;
exports.camposValido = camposValido;
exports.obtenerSentenciaSelectTodos = obtenerSentenciaSelectTodos;
exports.obtenerSentenciaSelectEspecifico = obtenerSentenciaSelectEspecifico;
exports.obtenerSentenciaInsert = obtenerSentenciaInsert;
exports.obtenerSentenciaUpdate = obtenerSentenciaUpdate;
exports.obtenerSentenciaDelete = obtenerSentenciaDelete;

