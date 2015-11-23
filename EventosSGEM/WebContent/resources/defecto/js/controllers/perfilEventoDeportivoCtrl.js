'use strict';

angular.module('eventosSGEM')
  .controller('PerfilEventoDeportivoCtrl', ['$scope','$state','$stateParams','dataFactory','dataTenant', 'objetos',
                                     function ($scope, $state, $stateParams , dataFactory, dataTenant, objetos) {
 
	  const masculino = "Masculino";
	  const femenino = "Femenino";
	  
	  $scope.nombreTenant = dataTenant.nombre_url;
	  $scope.tenantID = dataTenant.tenantId;
	  	 
	  $scope.cargarDatos = function(){			  
		  
		  if((objetos.getObjetos() != null)&&(objetos.getObjetos().length >= 1) ){
			  $scope.deportes = objetos.getObjetos();
			  $scope.nombreDeporte = $stateParams.nombreDeporte;
			  
			  discriminarPorSexo($scope.deportes);
//			  $scope.rutaFoto = $scope.comite.logo.ruta.substr($scope.comite.logo.ruta.indexOf("resources"));
			  listarDeportistasPorEventoDeportivo(dataTenant.tenantId,$scope.nombreDeporte);
		  }else{			
			  dataFactory.listarDisciplinasDeporte(dataTenant.tenantId,$stateParams.nombreDeporte)
			  .success(function (response, status, headers, config) {
				  $scope.deportes = response;
				  $scope.nombreDeporte = $stateParams.nombreDeporte;
				  
				  discriminarPorSexo($scope.deportes);
//				  $scope.rutaFoto = $scope.comite.logo.ruta.substr($scope.comite.logo.ruta.indexOf("resources"));
				  listarDeportistasPorEventoDeportivo(dataTenant.tenantId,$scope.nombreDeporte);
	      	  }).catch(function(error) {
	      		  $scope.mensajeValidacion = "Error al obtener disciplinas para el evento deportivo :"+ $scope.nombreDeporte;
	      	  });			  
		  }
		  
	  };
	
	  
	  function listarDeportistasPorEventoDeportivo(tenantID,nombreDeporte){
		  dataFactory.listarDeportistasPorEventoDeportivo(tenantID,nombreDeporte)
		  .success(function (response, status, headers, config) {
			  $scope.deportistas = response;
//			  $scope.rutaFoto = $scope.comite.logo.ruta.substr($scope.comite.logo.ruta.indexOf("resources"));
      	  }).catch(function(error) {
      		  $scope.mensajeValidacion = "Error al obtener deportistas para el evento deportivo :"+ $scope.nombreDeporte;
      	  });	
	  }
	  
	  function discriminarPorSexo(deportes){
		  $scope.deportesFemeninos = [];
		  $scope.deportesMasculinos = [];
		  
		  for(var i = 0; i < deportes.length ; i++){
			if(deportes[i].sexo == masculino){
				$scope.deportesMasculinos.push(deportes[i]);
			}else{
				$scope.deportesFemeninos.push(deportes[i]);
			}
		  }
		  
	  }
	  
	  $scope.irDisciplina = function(nombreDisciplina,sexo){		  
		  $state.go('perfilDisciplina.paso1',{tenant: $scope.nombreTenant, nombreDeporte : $scope.nombreDeporte, nombreDisciplina : nombreDisciplina, sexo : sexo });
	  }
	  
  }]);
