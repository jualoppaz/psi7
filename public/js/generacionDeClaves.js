var angularClave = angular.module('datos', []);

function mainController($scope, $http) {
    $scope.datos = {};

    $scope.subirClaves = function(){
        window.alert("Paso x el js");

        var hayErrores = false;
        var $usuario = $("#usuario");

        var usuario = $usuario.val();

        if(usuario.length == 0){
            $("#errorUsuario").show();
            hayErrores = true;
        }else{
            $("#errorUsuario").hide();
        }
        if(!hayErrores){
            $http.post('/api/claves', $scope.datos)
                .success(function(data) {
                    if(data == "El usuario ya existe"){
                        $("#errorUsuarioYaExiste").show();
                        $scope.datos.usuario.value = "";
                    }else{
                        $("#subidaOK").show();
                        $scope.datos = {};
                        $("#privadaAux").val("");
                        $("#publicaAux").val("");
                    }
                })
                .error(function(data) {
                    console.log('Error:' + data);
                }
            );
        }
    };
}