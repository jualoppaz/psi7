//server.js

var express 	= require('express');
var app 		= express();
var path        = require("path");
var mongoose    = require('mongoose');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

var port = process.env.PORT || 5000;

if (process.env.MONGOHQ_URL){
    mongoose.connect(process.env.MONGOHQ_URL);
}else{
    mongoose.connect('mongodb://localhost:27017/claves');
}

// Configuración
app.configure(function() {
	app.use(express.static(__dirname + '/public'));		// Localización de los ficheros estáticos
	app.use(express.logger('dev'));						// Muestra un log de todos los request en la consola
	app.use(express.bodyParser());						// Permite cambiar el HTML con el método POST
	app.use(express.methodOverride());					// Simula DELETE y PUT
    app.use('/public/css', express.static(__dirname + '/public/css'));
    app.use('/public/js', express.static(__dirname + '/public/js'));
    app.use(express.favicon(path.join(__dirname, '/public/images/logo.png')));
});

app.get('*', function(req, res) {						// Carga una vista HTML simple donde irá nuesta Single App Page
	res.sendfile('./public/index.html');				// Angular Manejará el Frontend
});

app.get('/aplicacion', function(req, res) {
    res.sendfile('./public/aplicacion.html');
});

app.get('/api/verify', function (req, res) {
    var mensaje = req.body.mensaje;
    var firma = req.body.firma;

    console.log(username);
    console.log(message);
    console.log(signature);

    var verify = function (pubKey) {
        var response = {};
        if (pubKey) {
            var publicKey = r.KEYUTIL.getKey(pubKey);
            var sig = new r.Signature({"alg": "SHA256withRSA", "prov": "cryptojs/jsrsa"});
            sig.initVerifyByPublicKey(publicKey);
            sig.updateString(message);

            var isValid = sig.verify(signature);

            response = {"isValid": isValid};
        } else {
            response = {"error": true};
        }
        console.log(response);
        res.send(JSON.stringify(response));
    };
});

app.listen(port, function() {
	console.log('App listening on port ' + port);
});