'use strict';

angular.module('eventosSGEM')
  .controller('PerfilDisciplinaCtrl',['$scope','$state','$stateParams','dataFactory','dataTenant',
                            function($scope, $state, $stateParams, dataFactory, dataTenant) {
   
	  $scope.tenant = dataTenant.nombre_url;
	  $scope.nombreDeporte= $stateParams.nombreDeporte;
	  $scope.nombreDisciplina = $stateParams.nombreDisciplina;
	  $scope.sexo = $stateParams.sexo;
	  
	  $scope.listarCompetencias = function(){	
		  
		  dataFactory.listarCompetenciasPorDisciplina(dataTenant.tenantId,$scope.nombreDeporte,$scope.nombreDisciplina,$scope.sexo)
		  .success(function (response, status, headers, config) {
			  $scope.competencias = response;
      	  }).catch(function(error) {
      		  $scope.mensajeValidacion = "Error al obtener competencias para la disciplina:"+ $scope.nombreDisciplina;
      	  });
		  
	  };
	  
	  $scope.setCompetenciaSeleccionada = function(idCompetencia){ 
		  $scope.competenciaSeleccionada = idCompetencia;
	  };
	  
	  $scope.listarResultados = function(){	
		  
		  dataFactory.listarResultadosCompetencia(dataTenant.tenantId,$scope.competenciaSeleccionada)
		  .success(function (response, status, headers, config) {
			  $scope.resultados = response;
      	  }).catch(function(error) {
      		  $scope.mensajeValidacion = "Error al obtener resultados para la competencia nro.:"+ $scope.competenciaSeleccionada;
      	  });
		  
	  };
	 
	  
  }]);
