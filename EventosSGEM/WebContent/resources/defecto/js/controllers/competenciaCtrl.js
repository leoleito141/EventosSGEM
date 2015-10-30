'use strict';

angular.module('eventosSGEM')
  .controller('competenciaCtrl', ['$scope','dataFactory','$state','dataTenant', function ($scope,dataFactory,$state,dataTenant) {
	  
	  $scope.competencia={};
	  
	  $scope.deportes = {};
	  
	  $scope.disciplinas = {};
	  
	  $scope.rondas = {};
	  
	  $scope.deportistas = {};
	  
	  
	  $scope.openInicio = function($eventInicio) {
		    $scope.statusInicio.opened = true;
		  };

	  $scope.openFin = function($eventFin) {
		    $scope.statusFin.opened = true;
		  };
	   
	  $scope.statusInicio = {
			    opened: false
			  };
	  
	  $scope.statusFin = {
			    opened: false
			  };
	  
	  $scope.dateOptions = {
			    formatYear: 'yy',
			    startingDay: 1
			  };
	  
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
              
              $scope.deportistas = response;
              
              $scope.selectDeportistas = $scope.deportistas [0];

      	}).error(function(error) {
      		console.log(error);
      		alert("Error al listar deportistas");
      	});
      
	  };  
	  
	  $scope.selection = [];
	  
	  $scope.toggleSelection = function toggleSelection(nombreDis) {
		    var idx = $scope.selection.indexOf(nombreDis);

		   if (idx > -1) {
		      $scope.selection.splice(idx, 1);
		    }

		   else {
		      $scope.selection.push(nombreDis);
		    }
		  };
	  
		  
		  $scope.obtenerJueces = function() {
			    
			  console.log(dataTenant.tenantId);
			 
			  
			  
			  dataFactory.listarJueces(dataTenant.tenantId)
			  .success(function (response, status, headers, config) {
	              console.log(response);
	              console.log(status);
	              console.log(headers);
	              console.log(config);
	              
	              $scope.jueces = response;
	              
	              $scope.selectjueces = $scope.jueces [0];

	      	}).error(function(error) {
	      		console.log(error);
	      		alert("Error al listar jueces");
	      	});
	      
		  };  
		  
		  
		 
		  $scope.guardarCompetencia = function(sexo,estadio,cantEntradas,precioEntrada,fechaInicio,selectDeportes,selectDisciplinas,selectRondas,selectJueces,selection){
			  
			  
			  $scope.competencia.tenantId = dataTenant.tenantId;
			  $scope.competencia.sexo = sexo;
			  $scope.competencia.estadio = estadio;
			  $scope.competencia.cantEntradas = cantEntradas;
			  $scope.competencia.precioEntrada = precioEntrada;
			  $scope.competencia.deporte = selectDeportes;
			  $scope.competencia.fechaInicio = fechaInicio;
			  $scope.competencia.disciplina = selectDisciplinas;
			  $scope.competencia.ronda = selectRondas;
			  $scope.competencia.juez = selectJueces;
			  $scope.competencia.deportistas = selection;
			  
			  dataFactory.altaCompetencia($scope.competencia)
		     	.then(function (data, status, headers, config) {
		                $scope.status = data.status;
		                console.log("Entre Alta Deportista");
		                console.log(data.status);
		                console.log(status);
		                console.log(headers);
		                console.log(config);
		                
		            })
		            error(function(response){
		                // Si ha habido errores llegamos a esta parte
		            	console.log(response); 
		            });
			  
			  
			  
		  }; 
		  
		  
		  
  }]);