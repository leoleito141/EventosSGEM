'use strict';

angular.module('eventosSGEM')
  .controller('competenciaCtrl', ['$scope','dataFactory','$state','dataTenant', function ($scope,dataFactory,$state,dataTenant) {
	  
	  $scope.competencia={};
	  
	  $scope.deportes = {};
	  
	  $scope.disciplinas = {};
	  
	  $scope.rondas = {};
	  
	  
	  
	  
	  $scope.obtenerDeportes = function(sexo) {
		    
		  console.log(dataTenant.tenantId);
		  console.log(sexo);
		  
		  dataFactory.listarDeportes(dataTenant.tenantId,sexo)
		  .success(function (response, status, headers, config) {
              console.log(response);
              console.log(status);
              console.log(headers);
              console.log(config);
              
              $scope.deportes = response;
              
              $scope.selectDeportes = $scope.deportes[0];

      	}).error(function(error) {
      		console.log(error);
      		alert("Error al listar deportistas");
      	});
      
	  };
	  
	  $scope.obtenerDisciplina = function(sexo, selectDeportes) {
		    
		  console.log(dataTenant.tenantId);
		  console.log(sexo);
		  console.log(selectDeportes);
		  
		  
		  
		  dataFactory.listarDisciplinas(dataTenant.tenantId,sexo,selectDeportes)
		  .success(function (response, status, headers, config) {
              console.log(response);
              console.log(status);
              console.log(headers);
              console.log(config);
              
              $scope.disciplinas = response;
              
              $scope.selectDisciplinas = $scope.disciplinas [0];

      	}).error(function(error) {
      		console.log(error);
      		alert("Error al listar deportistas");
      	});
      
	  };  
	  
	  $scope.obtenerRondas = function(sexo, selectDeportes,selectDisciplinas) {
		    
		  console.log(dataTenant.tenantId);
		  console.log(sexo);
		  console.log(selectDeportes);
		  
		  
		  
		  dataFactory.listarRondas(dataTenant.tenantId,sexo,selectDeportes,selectDisciplinas)
		  .success(function (response, status, headers, config) {
              console.log(response);
              console.log(status);
              console.log(headers);
              console.log(config);
              
              $scope.rondas = response;
              
              $scope.selectRondas = $scope.rondas [0];

      	}).error(function(error) {
      		console.log(error);
      		alert("Error al listar deportistas");
      	});
      
	  };  
	  
	  
	  
	  
	  $scope.obtenerDeportistas = function(sexo, selectDeportes,selectDisciplinas) {
		    
		  console.log(dataTenant.tenantId);
		  console.log(sexo);
		  console.log(selectDeportes);
		  
		  dataFactory.listarDeportistasEventoDeportivo(dataTenant.tenantId,sexo,selectDeportes,selectDisciplinas)
		  .success(function (response, status, headers, config) {
              console.log(response);
              console.log(status);
              console.log(headers);
              console.log(config);
              
              $scope.rondas = response;
              
              $scope.selectRondas = $scope.rondas [0];

      	}).error(function(error) {
      		console.log(error);
      		alert("Error al listar deportistas");
      	});
      
	  };  
	  
	  
  }]);