##Español

Puedes probar la aplicación en: http://psi7.herokuapp.com

###Justificación
Este proyecto surge como trabajo para la asignatura "Seguridad en Sistemas Informáticos y en Internet" del Grado en Ingeniería Informática - Ingeniería del Software de la Universidad de Sevilla.

###Tecnologías
En este proyecto he usado las siguientes tecnologías: 

* <b>MongoDB</b>: como base de datos de la aplicación.
* <b>NodeJS</b>: para la implementación del servidor.
* <b>AngularJS</b>: para el cliente.
* <b>HTML</b>: para las vistas.

###Casos de uso
En estas aplicación podemos:

* Generar claves RSA de 512, 1024 o 2048 bits.
* Almacenar el par de claves en el servidor(por comodidad para el usuario).
* Firmar mensajes con la clave privada generada, bien copiándola o bien consultándola en la base de datos con el identificador indicado.
* Verificar la firma del mensaje con la clave pública (sólo se permite si la clave está almacenada en el servidor).

###Estructura del proyecto
El proyecto está estructurado de la siguiente forma:

* <b>public</b>: carpeta con todos los ficheros proporcionados al cliente.
  * <b>css</b>: carpeta con las hojas de estilo.
    * bootstrap.css
	* bootstrap-theme.css
	* bootstrapv2.1.1.css
	* jmlp.css
	* jmlpTFG.css
  * <b>images<b/>: carpeta con las imágenes usadas en la aplicación.
    * favicon.png
  * <b>js</b>: carpeta con los controladores de AngularJS y la librería jsrsasign
    * jsrsasign
	* aplicacion.js
	* docs.min.js
	* firma.js
	* generacionDeClaves.js
	* verificacion.js
  * application.html
  * firma.html
  * generacionDeClaves.html
  * index.html
  * main.js
  * verificacion.html
* package.json: dependencias de nuestro proyecto Node.js.
* Procfile: archivo necesario para el despliegue en Heroku.
* README.md: este fichero.
* server.js: archivo para la creación del servidor.
	
_____________________________________________________________________________________________

@ Juan Manuel López Pazos, 2014

##English

You can try the app in: http://psi7.herokuapp.com

###Justification
This project was born as a deliverable for the "Seguridad en Sistemas Informáticos y en Internet" subject in "Grado en Ingeniería Informática - Ingeniería del Software" offered by Universidad de Sevilla.

###Technologies
In this project I have used the following technologies: 

* <b>MongoDB</b>: as the database to storage the application data.
* <b>NodeJS</b>: for the server implementation.
* <b>AngularJS</b>: for the client side.
* <b>HTML</b>: for client templates.

###User cases
In this application you can:

* Generate 512, 1024 or 2048 bits RSA Keys.
* Store the key pair in the data base giving an identificator(only if you want for your comfort).
* Sign messages with the generated private key, copying the private key or retrieving it from de data base with the given identificator.
* Verify the message sign with the public key (currently it's possible only if you have stored the key pair in the database).

###Project structure
The project is structured as follows:

* <b>public</b>: static files sent to client.
  * <b>css</b>: application stylesheets.
    * bootstrap.css
	* bootstrap-theme.css
	* bootstrapv2.1.1.css
	* jmlp.css
	* jmlpTFG.css
  * <b>images<b/>: application images.
    * favicon.png
  * <b>js</b>: AngularJS controllers and jsrsasign library.
    * jsrsasign
	* aplicacion.js
	* docs.min.js
	* firma.js
	* generacionDeClaves.js
	* verificacion.js
  * application.html
  * firma.html
  * generacionDeClaves.html
  * index.html
  * main.js
  * verificacion.html
* package.json: our Node.js project dependencies.
* Procfile: required file by Heroku for the deployment.
* README.md: the file you're reading.
* server.js: file for the server creation.

_____________________________________________________________________________________________

@ Juan Manuel López Pazos, 2014