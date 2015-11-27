'use strict';

angular.module('eventosSGEM')
  .controller('ListarEventosDeportivosCtrl', ['$scope','$state','dataFactory','dataTenant','objetos',
                                     function ($scope, $state, dataFactory, dataTenant,objetos) {
      
	  $scope.tenant = dataTenant.nombre_url;
	  
	  $scope.cargarDatos = function(){			  
		  		  
   			/*** Cargo Deportes ***/	      		
    		dataFactory.listarDeportesPorTenant(dataTenant.tenantId)
	      	.success(function (response, status, headers, config) {	              
	      		
	      		$scope.deportes = response;
	      		$scope.nombreDeportes = [];

	      		for(var i = 0; i< $scope.deportes.length ; i++){
	      			if($scope.nombreDeportes.indexOf($scope.deportes[i].nombreDeporte) == -1){
	      				$scope.nombreDeportes.push($scope.deportes[i].nombreDeporte);
	      			}
	      		}
	      		
	      		// se ordenan los deportes alfabeticamente
	      		$scope.nombreDeportes.sort();
	      		
	      		
	      	}).catch(function(error,status) {
	      		$scope.mensajeValidacion = "Error al obtener eventos deportivos.";
	      	});

	  };
	  
	  $scope.irPerfilEventoDeportivo = function(nombreDeporte){		  
		  console.log(nombreDeporte);
		  
		  objetos.setObjetos( buscarDeporteConDisciplinas(nombreDeporte) );
		  $state.go('perfilEventoDeportivo',{tenant: $scope.tenant, nombreDeporte : nombreDeporte });
	  };
	  
	  function buscarDeporteConDisciplinas(nombreDeporte){
		  var deportes = [];
		  for(var i = 0; i< $scope.deportes.length ; i++){
				if($scope.deportes[i].nombreDeporte == nombreDeporte){
					deportes.push($scope.deportes[i]);
      			}
		  }		  		  
		  return deportes;
	  }
  }]);
