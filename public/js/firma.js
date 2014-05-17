var angularClave = angular.module('datos', []);

function mainController($scope, $http) {
    $scope.consultarClave = function(usuario){

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
            $http.get('/api/clavePrivadaDeUnUsuario/' + $scope.usuario)
                .success(function(data) {
                    $("#clavePrivadaConsultada").show();
                    $scope.datos = data;
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                }
            );
        }
    };
}