'use strict';

angular.module('eventosSGEM')
  .controller('PerfilComiteCtrl',['$scope','$state','$stateParams','dataFactory','dataTenant', 'objetos',
                            function($scope, $state, $stateParams, dataFactory, dataTenant, objetos) {
   
	  $scope.tenant = dataTenant.nombre_url;
//	  console.log(objetos.getObjeto());
	  
	  $scope.cargarDatos = function(){
		  var existe = false;
		  
		  if((objetos.getObjeto() != null)&&(objetos.getObjeto().codigo !=null)){
			  existe = true;
			  $scope.comite = objetos.getObjeto();
			  $scope.rutaLogo = $scope.comite.logo.ruta.substr($scope.comite.logo.ruta.indexOf("resources"));
			  obtenerNovedades(dataTenant.tenantId,parseInt($stateParams.comiteId));
		  }else{			
			  dataFactory.obtenerComite(dataTenant.tenantId,$stateParams.comiteId)
			  .success(function (response, status, headers, config) {
		      	  existe = true;
				  $scope.comite = response;
				  $scope.rutaLogo = $scope.comite.logo.ruta.substr($scope.comite.logo.ruta.indexOf("resources"));
				  obtenerNovedades(dataTenant.tenantId,parseInt($stateParams.comiteId));
	      	  }).catch(function(error) {
		      		if(error.status = 404){
		      			$scope.mensajeValidacion = "Error al obtener comites olimpico, no existe el comite.";
		      		}else{
		      			$scope.mensajeValidacion = "Error en el servidor. Contacte con soporte";
		      		}
	      	  });
			  		 
			  
		  }
	  	}  
	  
		
		function obtenerNovedades(tenantID,comiteID){  
			  
			dataFactory.getNovedadesComite(tenantID,comiteID)
			.success(function (response, status, headers, config) {
			     
				  $scope.novedades = response;
				  
			}).catch(function(error) {
				$scope.mensajeValidacion = "Error en el servidor. Contacte con soporte";
			});
			  
		}
	
	  

	  

  }]);
