var angularClave = angular.module('datos', []);

function mainController($scope, $http) {

    $scope.datos = {}
    /*$scope.algoritmos = [
        { name : "Seleccione un algoritmo"},
        { name : "SHA1withRSA"},
        { name : "SHA224withRSA"},
        { name : "SHA256withRSA"},
        { name : "SHA384withRSA"},
        { name : "SHA512withRSA"},
        { name : "MD5withRSA"},
        { name : "RIPEMD160withRSA"}
    ];*/

    //$scope.datos.algoritmo = $scope.algoritmos[0];


    $scope.verificarConUsuario = function(){
        $("#firmaOK").hide();
        $("#firmaFAIL").hide();
        $("#unknownUser").hide();

        var hayErrores = false;
        var $algoritmo    = $("#algoritmo");
        var $mensaje      = $("#mensaje1");
        var $firma        = $("#firma1");
        var $usuario      = $("#usuario");

        var algoritmo = $algoritmo.val();
        var mensaje   = $mensaje.val();
        var firma     = $firma.val();
        var usuario   = $usuario.val();

        if(algoritmo == "#"){
            $("#errorHashing").show();
            hayErrores = true;
        }else{
            $("#errorHashing").hide();
        }
        if(mensaje.length == 0){
            $("#errorMensaje1").show();
            hayErrores = true;
        }else{
            $("#errorMensaje1").hide();
        }
        if(firma.length == 0){
            $("#errorFirma1").show();
            hayErrores = true;
        }else{
            $("#errorFirma1").hide();
        }
        if(usuario.length == 0){
            $("#errorUsuario").show();
            hayErrores = true;
        }else{
            $("#errorUsuario").hide();
        }
        if(!hayErrores){
            $http.get('/api/verificarConUsuario/' + $scope.usuario + "/" + $scope.mensaje1 + "/" +  $scope.firma1 + "/" + algoritmo)
               .success(function(data) {
                   if(data == "OK"){
                       //alert("Firma verificada correctamente.");
                       $("#firmaOK").show();
                   }else if(data == "FAIL"){
                       //alert("Firma incorrecta.");
                       $("#firmaFAIL").show();
                   }else if(data == "UNKNOWNUSER"){
                       $("#unknownUser").show();
                       //alert("El usuario introducido no existe en la bd.");
                   }
               })
               .error(function(data) {
                   console.log('Error: ' + data);
               }
            );
        }
    };

    /*
    $scope.verificarSinUsuario = function(){

        $("#firmaOK").hide();
        $("#firmaFAIL").hide();
        $("#unknownUser").hide();

        var hayErrores = false;
        var $algoritmo    = $("#algoritmo");
        var $mensaje      = $("#mensaje2");
        var $firma        = $("#firma2");
        var $clavePublica = $("#clavePublica");

        var algoritmo    = $algoritmo.val();
        var mensaje      = $mensaje.val();
        var firma        = $firma.val();
        var clavePublica = $clavePublica.val();

        if(algoritmo == "#"){
            $("#errorHashing").show();
            hayErrores = true;
        }else{
            $("#errorHashing").hide();
        }
        if(mensaje.length == 0){
            $("#errorMensaje2").show();
            hayErrores = true;
        }else{
            $("#errorMensaje2").hide();
        }
        if(firma.length == 0){
            $("#errorFirma2").show();
            hayErrores = true;
        }else{
            $("#errorFirma2").hide();
        }
        if(clavePublica.length == 0){
            $("#errorClavePublica").show();
            hayErrores = true;
        }else{
            $("#errorClavePublica").hide();
        }
        if(!hayErrores){
            alert("Mandamos la peticion");

            alert("Clave publica: " + $scope.clavePublica);
            alert("Mensaje: " + $scope.mensaje2);
            alert("Firma: " + $scope.firma2);
            alert("Algoritmo: " + algoritmo);
            $http.post('/api/verificarSinUsuario', $scope.datos)
               .success(function(data) {
                   if(data == "OK"){
                       //alert("Firma verificada correctamente.");
                       $("#firmaOK").show();
                   }else if(data == "FAIL"){
                       //alert("Firma incorrecta.");
                       $("#firmaFAIL").show();
                   }else{
                       alert(data);
                   }
               })
               .error(function(data) {
                   console.log('Error: ' + data);
               }
            );
        }else{
            $("html, body").animate({scrollTop:"500px"});
        }
    };*/
}