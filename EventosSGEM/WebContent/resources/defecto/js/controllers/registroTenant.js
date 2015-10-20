'use strict';

angular.module('pruebaAngularApp')
  .controller('RegistroTenantCtrl', ['$scope','$state','dataFactory','dataTenant', 
                                     function ($scope, $state, dataFactory,dataTenant) {

   console.log(dataTenant.tenantId);
   
   $scope.nombreTenant = dataTenant.nombre_url;
   $scope.usuario = {};
   
   $scope.altaUsuarioComun = function () {
    
      var usuario = $scope.usuario;
      usuario.tenantId = dataTenant.tenantId;
      usuario.tipoUsuario = "Comun";
      usuario.password = btoa(usuario.password);
      console.log("entre insertar" + usuario);

      dataFactory.altaUsuarioComun(usuario)
      	.success(function (response, status, headers, config) {
              console.log(response);
              console.log(status);
              console.log(headers);
              console.log(config);
              if(response){
	              event.preventDefault();
	        	  $state.go('tenantLogin');//$state.go just calls transitionTo with inherit and relative set to true. Almost no difference.
              }else{
            	  alert("Error al dar de alta");
              }
      	}).error(function(error) {
      		console.log(error);
      		alert("Error al dar de alta");
      	});
      
   	};
   

  }]);
