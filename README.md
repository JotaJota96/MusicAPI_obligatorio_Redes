# Laboratorio 1 - Catálogo de música

**Integrantes del equipo**
- Lucas Garrido
- Facundo Camilo
- Juan Alvarez


## 
## Propuesta
Se desea montar una plataforma en la que se registren listas de canciones con determinada información. Se considera la opción de montar la aplicación en un servidor central, el cual recibirá datos y los retornará a los clientes en bruto, sin agregarle una envoltura de presentación. Los clientes serán los encargados de procesar estos datos y darles un formato agradable y útil.
Investigar el modo de implementar una web API (REST), e intentar llevar a cabo la puesta a punto de un entorno de desarrollo.
Principalmente se busca generar un primer contacto con las herramientas, lenguajes y desafíos del desarrollo web.

**Modelo:**
- Género: El género debe tener un nombre único en el sistema, el cual debe contener por lo menos 3 letras.
- Artista: El artista debe contar con un nombre, a su vez se puede agregar información que sea de interés para el usuario, como el rol que cumple, si toca algún instrumento, nacionalidad, fecha de nacimiento, etc.
- Disco: El disco debe tener un título, año de lanzamiento, artista, género y un listado de canciones.
- Canción: Los campos de interés son nombre, duración, un puntaje de 1 a 5 y opcionalmente un enlace a un archivo para ser reproducida.
- Lista: Una lista tendrá un nombre y estará vinculada con cualquiera de las entidades antes mencionadas, (Género, Artista, Disco, Canción), le corresponderá a un usuario y podrá ser compartida con otros usuarios.
- Usuario: Los usuarios se identificarán en el sistema mediante un nickname y podrán tener listas.

Funciones a implementar:
En el servidor se desea contar con funciones de CRUD para todas las entidades del modelo, género, artista, disco y canción.

## 
## ¿Qué es una API REST?
El término REST (Representational State Transfer) se originó en el año 2000, descrito en la tesis de Roy Fielding, padre de la especificación HTTP. Un servicio REST no es una arquitectura software, sino un conjunto de restricciones con las que se puede crear un estilo de arquitectura de software, la cual puede ser usada para crear aplicaciones web respetando el protocolo HTTP.
Hoy en día la mayoría de las empresas utilizan API REST para crear servicios. Esto se debe a que es un estándar lógico y eficiente para la creación de servicios web. Por ejemplo, los sistemas de identificación de Facebook o la autenticación en los servicios de Google.
Según Fielding las restricciones que definen a un sistema RESTful son:
- Cliente-servidor: esta restricción mantiene al cliente y al servidor débilmente acoplados. Esto quiere decir que el cliente no necesita conocer los detalles de implementación del servidor  y el servidor se “despreocupa” de cómo son usados los datos que envía al cliente.
- Sin estado: Cada petición que recibe el servidor debería ser independiente, es decir, no es necesario mantener sesiones.
- Cacheable: La infraestructura de red debe soportar una caché de varios niveles. Este almacenamiento evitará repetir varias conexiones entre el servidor y el cliente para recuperar un mismo recurso.
- Interfaz uniforme: Define una interfaz genérica para administrar cada interacción que se produzca entre el cliente y el servidor de manera uniforme, lo cual simplifica y separa la arquitectura. Esta restricción indica que cada recurso del servicio REST debe tener una única dirección URI.
- Sistema de capas: el servidor puede disponer de varias capas para su implementación. Esto ayuda a mejorar la escalabilidad, el rendimiento y la seguridad.

Las API REST permiten manipular recursos haciendo uso de los verbos HTTP, como lo son:
- GET: para consultar y leer.
- POST: para crear.
- PUT: para editar.
- DELETE: para eliminar.

La información retornada al realizar estas peticiones sobre los recursos, deben ser en formato XML o JSON, ya que es el lenguaje de intercambio de información más usado.
Algunos de los frameworks más usados con los que se pueden implementar APIs son: JAX-RS y Spring Boot para Java, Django REST framework para Python, Laravel para PHP, o Restify para NodeJS.

## 
## Node JSNode JS
Node.js es un entorno en tiempo de ejecución multiplataforma, de código abierto, para la capa del servidor (pero no limitándose a ello) basado en el lenguaje de programación ECMAScript, asíncrono, con I/O de datos en una arquitectura orientada a eventos y basado en el motor V8 de Google. Fue creado con el enfoque de ser útil en la creación de programas de red altamente escalables, como por ejemplo, servidores web. Fue creado por Ryan Dahl en 2009 y su evolución está apadrinada por la empresa Joyent, que además tiene contratado a Dahl en plantilla.
Node JS es similar en su propósito a Twisted o Tornado de Python, Perl Object Environment de Perl, libevent o libev de C, EventMachine de Ruby, vibe.d de D y Java EE de Java existe Apache MINA, Netty, Akka, Vert.x, Grizzly o Xsocket. Al contrario que la mayoría del código JavaScript, no se ejecuta en un navegador, sino en el servidor. Node JS implementa algunas especificaciones de CommonJS. Node.JS incluye un entorno REPL para depuración interactiva. 

## 
## Entorno de desarrollo
Para el desarrollo del proyecto se ha trabajado en el sistema operativo Windows 10, utilizado el editor de texto Visual Studio Code, el entorno de ejecución NodeJS, y Postman, un software para realizar pruebas con peticiones HTTP. Para la persistencia de los datos se ha decidido utilizar el motor de bases de datos PostgreSQL.

### Instalación de Visual Studio Code
1. Descargar el instalador desde [https://code.visualstudio.com/download](https://code.visualstudio.com/download "https://code.visualstudio.com/download") .
2. Se ejecuta el instalador y se da Siguiente.
3. Se acepta el acuerdo de licencia y se da Siguiente.
4. Se selecciona la ruta de instalación y se da Siguiente.
5. Se elige el nombre de la carpeta del menú inicio y se da Siguiente.
6. Se seleccionan las tareas adicionales deseadas y se da Siguiente.
7. Se verifica la configuración seleccionada y se da Instalar.
8. Al finalizar la instalación se podrá optar por ejecutar el programa y se da Finalizar.

### Instalación de NodeJS
1. Antes de instalar NodeJS, se verifica que no esté instalado, para ello se ejecuta en una consola el comando:
 `node --version`
 Si el mensaje obtenido es de error, el NodeJS no se encuentra instalado y se deben seguir los siguientes pasos, de lo contrario, mostrará la versión del programa instalado y no es necesario instalarlo.
2. Descargar el instalador de la versión 10 desde [https://nodejs.org/es/](https://nodejs.org/es/ "https://nodejs.org/es/") .
3. Se ejecuta el instalador y se da Next.
4. Se aceptan los términos y condiciones y se da Next.
5. Se selecciona la ruta de instalación y se da Next
6. Se personaliza los elementos a instalar, en este caso se mantiene la configuración predeterminada y se da Next.
7. Se confirma que se desea iniciar el instalador dando en Install
8. Al finalizar la instalación  se da Finish.
9. Finalmente, repetimos el primer paso y esta vez se debe obtener un mensaje con la versión del programa instalado.
10. Una vez instalado NodeJS es necesario instalar su manejador de paquetes, para ello en una consola se ejecuta el comando 
 `npm install npm@latest –g`
 Esto descargara desde internet los paquetes necesarios.
11. Para verificar que npm se haya instalado correctamente se ejecuta:
 `npm –v`
 El mensaje obtenido debe ser la versión instalada.

### Instalación de Postman
1. Descargar el instalador desde [https://www.getpostman.com/downloads/](https://www.getpostman.com/downloads/ "https://www.getpostman.com/downloads/") .
2. Se ejecuta el instalador y se instala automáticamente.
3. Al pedir que se inicie sesión, se cierra la ventana ya que no es estrictamente necesario.
4. Se abre el programa y está listo para ser usado.

## 
## Acerca del software desarrollado
El servidor programado en JavaScript y ejecutado en NodeJS, es capaz de recibir y procesar peticiones GET, POST, PUT y DELETE sobre los recursos:
- /artistas
- /canciones
- /discos
- /generos
- /usuarios

Los datos obtenidos al realizar peticiones sobre dichos recursos serán:
- GET /*recurso*: Devolverá un listado completo del recurso solicitado.
- GET  /*recurso*/*id*: Devolverá los datos del recurso con el ID solicitado.
- POST/*recurso*: Creará el recurso con los datos enviados en el cuerpo (body) de la petición, y lo retornará en caso de ser exitosa.
- PUT /*recurso*/*id*: Actualizará el recurso con el ID especificado, actualizando los datos indicados en el cuerpo (body) de la petición.
- DELETE /*recurso*/*id*: Eliminará el recurso con el ID especificado.

## 
## Puesta en producción del servidor
Para realizar la puesta en producción del servidor se deberá contar con: NodeJS y PostgreSQL instalados, además del código JavaScript del servidor y las sentencias SQL de estructura y datos de prueba de la base de datos.
Una vez cumplidos estos requisitos, se procede con los siguientes pasos:
1. Utilizando algún cliente para PostgreSQL (como PGadmin) se crea una base de datos llamada “música”.
2. Dentro de la base de datos creada se ejecutan las sentencias del archivo “música.sql” (la base de datos contendrá las tablas y datos de prueba necesarios). Se puede cerrar el cliente utilizado.
3. Utilizando una consola, se debe posicionar en la carpeta del servidor (utilizando el comando cd)
4. Una vez en la carpeta del servidor se debe ejecutar el comando:
 `npm install`
 Este comando instalará los paquetes necesarios para la ejecución del servidor. Una vez haya terminado se puede cerrar la consola.
5. A continuación se deben configurar los datos de conexión a la base de datos, para ello se debe editar con un editor de texto el archivo llamado “datosDeConexion.json” que se encuentra en la carpeta “datos”.
 Se debe tener en cuenta que: 
 - “user” es el nombre del usuario de la base de datos que utilizara para realizar la conexión.
 - “password” es la contraseña de dicho usuario.
 - “host” es la dirección IP del servidor donde se ejecuta el servidor de bases de datos.
 - “port” es el puerto donde escucha el servidor de bases de datos.
 - “database” es el nombre de la base de datos a utilizar.
Al finalizar se debe guardar los cambios.
6. Finalmente, para iniciar el servidor se debe abrir una consola y ubicado en la carpeta del servidor ejecutar el comando:
 `node index.js`
 El servidor mostrará un mensaje de que inicia la escucha en el puerto 8080 y que ha cargado los datos de conexión a la base de datos.

## 
## Administración remota del servidor
En el caso de que la aplicación servidor sea ejecutada en un sistema operativo Linux, se puede hacer uso de la conexión remota SSH, la cual permite tener acceso al servidor mediante una consola de comandos.
En el caso de ser ejecutada sobre un servidor Windows, se puede hacer uso de las herramientas RSAT de administración remota.

## 
## Variantes del proyecto
Por motivos de plazos y superposición con otros proyectos del equipo, no ha sido posible plantear una solución a la variante del desarrollo del sistema en modalidad P2P. Entendemos que para realizar esta implementación sería necesario una mayor investigación, mayor planificación, definición de protocolos, y pruebas más extensas, lo que conlleva un mayor tiempo de desarrollo.