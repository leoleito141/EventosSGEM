'use strict';

angular.module('pruebaAngularApp')
  .controller('LoginCtrl', ['$scope','$auth','$state','dataFactory', function ($scope, $auth, $state, dataFactory) {

	 
   $scope.usuario={};//Informacion del usuario para loguear pasada desde login.html
   		
   $scope.loginUser = function () {
     
       var datos = $scope.usuario;

       $auth.login({
           email: datos.email,
           password: btoa(datos.password) // base 64
       })
       .then(function (data){
            console.log(data); 
            console.log(status); 
            console.log($auth.getPayload()); 
            console.log($auth.getToken()); 
            $scope.usrLogin.email = $scope.usuario.email;
            $scope.usuario.password="";
 
            var payLoad = $auth.getPayload();
           
            $state.transitionTo("altaEvento", { tenant: payLoad.tenantid });
             

           
        })
        .catch(function(response){
            // Si ha habido errores llegamos a esta parte
        	console.log(response); 
        });
   		};
    

	 


  }]);
