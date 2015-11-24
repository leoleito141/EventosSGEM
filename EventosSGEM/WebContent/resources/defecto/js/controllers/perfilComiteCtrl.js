'use strict';

angular.module('eventosSGEM')
  .controller('PerfilComiteCtrl',['$scope','$state','$stateParams','dataFactory','dataTenant', 'objetos',
                            function($scope, $state, $stateParams, dataFactory, dataTenant, objetos) {
   
	  $scope.tenant = dataTenant.nombre_url;
		  
	  $scope.cargarDatos = function(){		
		  
		  if((objetos.getObjeto() != null)&&(objetos.getObjeto().codigo !=null)){
			  $scope.comite = objetos.getObjeto();
			  $scope.rutaLogo = $scope.comite.logo.ruta.substr($scope.comite.logo.ruta.indexOf("resources"));
			  listarDeportistas(dataTenant.tenantId,parseInt($stateParams.comiteId));
			  obtenerNovedades(dataTenant.tenantId,parseInt($stateParams.comiteId));
		  }else{			
			  dataFactory.obtenerComite(dataTenant.tenantId,$stateParams.comiteId)
			  .success(function (response, status, headers, config) {
				  $scope.comite = response;
				  $scope.rutaLogo = $scope.comite.logo.ruta.substr($scope.comite.logo.ruta.indexOf("resources"));
				  listarDeportistas(dataTenant.tenantId,parseInt($stateParams.comiteId));
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
	  
	  	function listarDeportistas(tenantID,comiteID){  
		  
			dataFactory.listarDeportistasPorComite(tenantID,comiteID)
			.success(function (response, status, headers, config) {
			     
				  $scope.deportistas = response;
				  
				  /// se ordenan los deportistas alfabeticamente por su apellido
		      		 for(var i=0;i<($scope.deportistas.length-1);i++){
				            for(var j=i+1;j<$scope.deportistas.length;j++){
				                if($scope.deportistas[i].apellido>$scope.deportistas[j].apellido){
				                    //Intercambiamos valores
				                    var variableauxiliar=$scope.deportistas[i];
				                    $scope.deportistas[i]=$scope.deportistas[j];
				                    $scope.deportistas[j]=variableauxiliar;
				                    
				                }
				            }
				        }
		      		 
				  /*** adaptar a rutas relativas ***/
		      	  for(var i = 0;i < $scope.deportistas.length; i++){
		      		 var ruta = $scope.deportistas[i].foto.ruta.substr($scope.deportistas[i].foto.ruta.indexOf("resources"));
		      		 $scope.deportistas[i].foto.ruta = ruta;
		      	  }
			}).catch(function(error) {
				$scope.mensajeValidacion = "Error en el servidor obteniendo deportistas. Contacte con soporte";
			});
			  
		}
	  
		function obtenerNovedades(tenantID,comiteID){  
			  
			dataFactory.getNovedadesComite(tenantID,comiteID)
			.success(function (response, status, headers, config) {
			     
				  $scope.novedades = response;
				  
			}).catch(function(error) {
				$scope.mensajeValidacion = "Error en el servidor obteniendo novedades. Contacte con soporte";
			});
			  
		}

  }]);
