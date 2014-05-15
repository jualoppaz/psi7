//public/main.js

var angularUser = angular.module('claves', []);

function mainController($scope, $http) {
	$scope.parDeClaves = {};

	$scope.crearParDeClaves = function(){
        window.alert("Paso x el main");
		$http.post('/api/claves', $scope.parDeClaves)
			.success(function(data) {
				$scope.parDeClaves = {};
				console.log(data);
				window.alert("Claves registradas correctamente.");
			})
			.error(function(data) {
				console.log('Error:' + data);
			});
	};
}
