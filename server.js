//server.js

var express 	= require('express');
var app 		= express();
var path        = require("path");
var mongoose    = require('mongoose');
var r           = require('jsrsasign');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

var port = process.env.PORT || 5000;

if (process.env.MONGOHQ_URL){
    mongoose.connect(process.env.MONGOHQ_URL);
}else{
    mongoose.connect('mongodb://localhost:27017/psi7');
}

var Claves = mongoose.model('Claves', {
    usuario:      {type: String},
    clavePrivada: {type: String},
    clavePublica: {type: String}
});

// Configuración
app.configure(function() {
	app.use(express.static(__dirname + '/public'));		// Localización de los ficheros estáticos
	app.use(express.logger('dev'));						// Muestra un log de todos los request en la consola
	app.use(express.bodyParser());						// Permite cambiar el HTML con el método POST
	app.use(express.methodOverride());					// Simula DELETE y PUT
    app.use('/public/css', express.static(__dirname + '/public/css'));
    app.use('/public/js', express.static(__dirname + '/public/js'));
    //app.use(express.favicon(path.join(__dirname, '/public/images/favicon.png')));
});

app.get('/aplicacion', function(req, res) {
    res.sendfile('./public/aplicacion.html');
});

app.get('/api/claves', function(req, res) {
    Claves.find(function(err, datos) {
        if(err) {
            res.send(err);
        }
        res.json(datos);
    });
});

app.get('/api/clavePrivadaDeUnUsuario/:usuario', function(req, res) {
    Claves.findOne({usuario: req.params.usuario}, function(err, datos) {
        if(err) {
            res.send(err);
        }else{
            res.send(datos);
            console.log('GET /api/clavePrivadaDeUnUsuario/' + req.params.usuario);
        }
    });
});

app.post('/api/claves', function(req, res) {
    var user = Claves.find({usuario: req.body.usuario}, function(err, datos) {
        if(err) {
            res.send(err);
        }
        if(datos != ""){
            res.send("El usuario ya existe");
            console.log("El usuario ya existe.");
        }else{
            Claves.create({
                usuario:      req.body.usuario,
                clavePrivada: req.body.clavePrivada,
                clavePublica: req.body.clavePublica
            }, function(err, datos){
                if(err) {
                    res.send(err);
                }
                res.json(datos);
            });
        }
    });
});

app.get('/api/verificarConUsuario/:usuario/:mensaje1/:firma1/:algoritmo', function (req, res) {
    var mensaje    = req.params.mensaje1;
    var firma      = req.params.firma1;
    var usuario    = req.params.usuario;
    var algoritmo  = req.params.algoritmo;

    // Datos provisionales de prueba

    /*
    usuario = "juanma";
    mensaje = "Hola";
    algoritmo = "SHA1withRSA";
    firma = "20a3dd3bc08214c65e1c87f2a1afe4dfdd63e5b044c823513cf745c06bf54c18ec44e33cf219debbdafa05f8876c8f2ffdad7f15f5faca7f49b55132b47a0f51";
    */


    console.log("Mensaje recibido: " + mensaje);
    console.log("Firma recibida: " + firma);
    console.log("Usuario recibido: " + usuario);
    console.log("Algoritmo recibido: " + algoritmo);

    // Obtenemos la clave publica de la bd

    var getClavePublica = Claves.findOne({usuario: usuario}, 'clavePublica', function(err, datos) {
        if(err) {
            res.send(err);
        }else{
            if(datos){
                console.log("Resultado: " + datos.clavePublica);
                var publica = r.KEYUTIL.getKey(datos.clavePublica);

                console.log("Publica: " + publica);
                var sig = new r.Signature({"alg": algoritmo, "prov": "cryptojs/jsrsa"});
                sig.initVerifyByPublicKey(publica);
                sig.updateString(mensaje);

                var isValid = sig.verify(firma);
                if(isValid){
                    res.send("OK");
                }else{
                    res.send("FAIL");
                }
                //res.send(datos);
            }else{
                res.send("UNKNOWNUSER");
            }
        }
    });
});

/*
app.post('/api/verificarSinUsuario', function (req, res) {
    var clavePublica   = req.body.clavePublica;
    var mensaje        = req.body.mensaje2;
    var firma          = req.body.firma2;
    var algoritmo      = req.body.algoritmo;

    // Datos provisionales de prueba

    /*
     usuario = "juanma";
     mensaje = "Hola";
     algoritmo = "SHA1withRSA";
     firma = "20a3dd3bc08214c65e1c87f2a1afe4dfdd63e5b044c823513cf745c06bf54c18ec44e33cf219debbdafa05f8876c8f2ffdad7f15f5faca7f49b55132b47a0f51";


    console.log("Esta es la clave publica: " + clavePublica);
    console.log("Este es el mensaje: " + mensaje);
    console.log("Esta es la firma: " + firma);
    console.log("Este es el algoritmo: " + algoritmo);

    var publica = r.KEYUTIL.getKey(clavePublica);

    console.log("Publica: " + publica);
    var sig = new r.Signature({"alg": algoritmo, "prov": "cryptojs/jsrsa"});
    sig.initVerifyByPublicKey(publica);
    sig.updateString(mensaje);

    var isValid = sig.verify(firma);
    if(isValid){
        res.send("OK");
    }else{
        res.send("FAIL");
    }
});

*/

app.get('/', function(req, res) {						// Carga una vista HTML simple donde irá nuesta Single App Page
    res.sendfile('./public/index.html');				// Angular Manejará el Frontend
});

app.listen(port, function() {
	console.log('App listening on port ' + port);
});