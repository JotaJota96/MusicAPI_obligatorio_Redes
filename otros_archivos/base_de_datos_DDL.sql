-- usuarios(nickName)
CREATE TABLE usuarios(
	nickName VARCHAR(30) PRIMARY KEY,
	nombre VARCHAR(30),
	apellido VARCHAR(30),
	email VARCHAR(50)
);


-- artistas(nombre, nacionalidad, instrumento)
CREATE TABLE artistas(
	nombre VARCHAR(30) PRIMARY KEY, 
	nacionalidad VARCHAR(30), 
	instrumento VARCHAR(30)
);

-- generos(nombre)
CREATE TABLE generos(
	nombre VARCHAR(30) PRIMARY KEY,
	CHECK (nombre LIKE '___%')
);

-- discos(titulo, anio, nombreGenero, nombreArtista)
CREATE TABLE discos(
	titulo VARCHAR(30) PRIMARY KEY, 
	anio INTEGER NOT NULL, 
	nombreGenero VARCHAR(30),
	nombreArtista VARCHAR(30),
	FOREIGN KEY (nombreGenero) REFERENCES generos(nombre),
	FOREIGN KEY (nombreArtista) REFERENCES artistas(nombre)
);


-- canciones(tituloDisco, nombre, duracion, enlace)
-- 	FK = tituloDisco
CREATE TABLE canciones(
	tituloDisco VARCHAR(30), 
	nombre VARCHAR(30), 
	duracion VARCHAR(5), -- mm:ss
	enlace VARCHAR(200),
	PRIMARY KEY (tituloDisco, nombre),
	FOREIGN KEY (tituloDisco) REFERENCES discos(titulo)
);


--//////////////////////////////////////////////////////////////////////////////////////////
-- listas(nickName, nombreLista, tipo)
-- 	FK = nickName
-- tipo =  ('ARTISTAS', 'CANCIONES', 'DISCOS', 'GENEROS')
CREATE TABLE listas(
	nickName  VARCHAR(30), 
	nombreLista VARCHAR(30), 
	tipo VARCHAR(30),
	PRIMARY KEY (nickName, nombreLista),
	FOREIGN KEY (nickName) REFERENCES usuarios(nickName),
	CHECK (tipo IN ('ARTISTAS', 'CANCIONES', 'DISCOS', 'GENEROS'))
);

-- listasDeCanciones(nickName, nombreLista, nombreCancion)
-- 	FK = (nickName, nombreLista), nombreCancion
CREATE TABLE listasDeCanciones(
	nickName  VARCHAR(30), 
	nombreLista VARCHAR(30), 
	tituloDisco VARCHAR(30),
	nombreCancion VARCHAR(30),
	PRIMARY KEY (nickName, nombreLista, tituloDisco, nombreCancion),
	FOREIGN KEY (nickName, nombreLista) REFERENCES listas(nickName, nombreLista),
	FOREIGN KEY (tituloDisco, nombreCancion) REFERENCES canciones(tituloDisco, nombre)
);

-- listasDeDiscos(nickName, nombreLista, tituloDisco)
-- 	FK = (nickName, nombreLista), tituloDisco
CREATE TABLE listasDeDiscos(
	nickName  VARCHAR(30), 
	nombreLista VARCHAR(30), 
	tituloDisco VARCHAR(30),
	PRIMARY KEY (nickName, nombreLista, tituloDisco),
	FOREIGN KEY (nickName, nombreLista) REFERENCES listas(nickName, nombreLista),
	FOREIGN KEY (tituloDisco) REFERENCES discos(titulo)
);

-- listasDeArtistas(nickName, nombreLista, nombreArtista)
-- 	FK = (nickName, nombreLista), nombreArtista
CREATE TABLE listasDeArtistas(
	nickName  VARCHAR(30), 
	nombreLista VARCHAR(30), 
	nombreArtista VARCHAR(30),
	PRIMARY KEY (nickName, nombreLista, nombreArtista),
	FOREIGN KEY (nickName, nombreLista) REFERENCES listas(nickName, nombreLista),
	FOREIGN KEY (nombreArtista) REFERENCES artistas(nombre)
);

-- listasDeGeneros(nickName, nombreLista, nombreGenero)
-- 	FK = (nickName, nombreLista), nombreGenero
CREATE TABLE listasDeGeneros(
	nickName  VARCHAR(30), 
	nombreLista VARCHAR(30), 
	nombreGenero VARCHAR(30),
	PRIMARY KEY (nickName, nombreLista, nombreGenero),
	FOREIGN KEY (nickName, nombreLista) REFERENCES listas(nickName, nombreLista),
	FOREIGN KEY (nombreGenero) REFERENCES generos(nombre)
);





