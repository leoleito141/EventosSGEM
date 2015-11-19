'use strict';

angular.module('eventosSGEM')
  .controller('PerfilComiteCtrl',['$scope','$state','$stateParams','dataFactory','dataTenant', 'objetos',
                            function($scope, $state,$stateParams, dataFactory, dataTenant, objetos) {
   
	  $scope.tenant = dataTenant.nombre_url;
	  console.log(objetos.getObjeto());
	  
	  $scope.cargarDatos = function(){
		  var existe = false;
		  
		  if((objetos.getObjeto() != null)&&(objetos.getObjeto().coidgo !=null)){
			  $scope.comite = objetos.getObjeto();
		  }else{
			
			  dataFactory.obtenerComite(dataTenant.tenantId,$stateParams.comiteId)
			  .success(function (response, status, headers, config) {
		      	  existe = true;
				  $scope.comite = response;
				  $scope.rutaLogo = $scope.comite.logo.ruta.substr($scope.comite.logo.ruta.indexOf("resources")) ;
	      	  }).catch(function(error) {
		      		if(error.status = 404){
		      			$scope.mensajeValidacion = "Error al obtener comites olimpico, no existe el comite.";
		      		}else{
		      			$scope.mensajeValidacion = "Error en el servidor. Contacte con soporte";
		      		}
	      	  });
			  		 
			  
		  }
		  
		  // voy a buscar las novedades de ese comite
		  if(existe){
			  
//			  dataFactory.obtenerComite(dataTenant.tenantId,$stateParams.comiteId)
//			  .success(function (response, status, headers, config) {
//	             
//				  $scope.comite = response;
//				  
//	      	  }).catch(function(error) {
//		      		existe = false;
//		      		if(error.status = 404){
//		      			$scope.mensajeValidacion = "Error al obtener comites olimpico, no existe el comite.";
//		      		}else{
//		      			$scope.mensajeValidacion = "Error en el servidor. Contacte con soporte";
//		      		}
//	      	  });
				  
		  }
	  }
	  

	  

  }]);
