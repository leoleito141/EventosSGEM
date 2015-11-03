'use strict';

angular.module('eventosSGEM')
  .controller('entradasCtrl', ['$scope','dataFactory','$state','dataTenant', function ($scope,dataFactory,$state,dataTenant) {
	  
	  $scope.entrada={};
	  
	  $scope.deportes = {};
	  
	  $scope.disciplinas = {};
	  
	  $scope.rondas = {};
	  
	 
	  
	  
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
              
              $scope.nombreDeporte = $scope.deportes[0];

      	}).catch(function(error) {
      		console.log(error);
      		alert("Error al listar deportistas");
      	});
      
	  };
	  
	  $scope.obtenerDisciplina = function(sexo, nombreDeporte) {
		    
		  console.log(dataTenant.tenantId);
		  console.log(sexo);
		  console.log(nombreDeporte);
		  
		  
		  
		  dataFactory.listarDisciplinas(dataTenant.tenantId,sexo,nombreDeporte)
		  .success(function (response, status, headers, config) {
              console.log(response);
              console.log(status);
              console.log(headers);
              console.log(config);
              
              $scope.disciplinas = response;
              
              $scope.nombreDisciplina = $scope.disciplinas [0];

      	}).catch(function(error) {
      		console.log(error);
      		alert("Error al listar deportistas");
      	});
      
	  };  
	  
	  $scope.obtenerRondas = function(sexo, nombreDeporte,nombreDisciplina) {
		    
		  console.log(dataTenant.tenantId);
		  console.log(sexo);
		  console.log(nombreDeporte);
		  
		  
		  
		  dataFactory.listarRondas(dataTenant.tenantId,sexo,nombreDeporte,nombreDisciplina)
		  .success(function (response, status, headers, config) {
              console.log(response);
              console.log(status);
              console.log(headers);
              console.log(config);
              
              $scope.rondas = response;
              
              $scope.ronda = $scope.rondas [0];

      	}).catch(function(error) {
      		console.log(error);
      		alert("Error al listar deportistas");
      	});
      
	  };  
	  
	  
	  $scope.obtenerCompetencias = function(sexo,nombreDeporte,nombreDisciplina,ronda){
	
		  
		  dataFactory.listarCompetencias(dataTenant.tenantId,sexo,nombreDeporte,nombreDisciplina,ronda)
	     	.then(function (response, status, headers, config) {
	                $scope.status = response.status;
	                console.log("Entre al listar Competencias");
	                console.log(response.status);
	                console.log(status);
	                console.log(headers);
	                console.log(config);
	               
	              
	               
	                
	               $scope.competencias = response.data;
	   
	                
	            })
	            .catch(function(response){
	                // Si ha habido errores llegamos a esta parte
	            	console.log(response); 
	            });
		  
		  
		  
	  }; 
	  
	  
	 		  
 $scope.obtenerPrecio = function(idCompetencia){
	
		  
		  dataFactory.obtenerPrecio(dataTenant.tenantId,idCompetencia)
	     	.then(function (response, status, headers, config) {
	                $scope.status = response.status;
	                console.log("Entre al listar Competencias");
	                console.log(response.status);
	                console.log(status);
	                console.log(headers);
	                console.log(config);
	               
	              
	               
	                
	                $scope.precioEntrada = response.data;
	                
	                
	            })
	            .catch(function(response){
	                // Si ha habido errores llegamos a esta parte
	            	console.log(response); 
	            });
		  
		  
		  
	  };   
	  
		  
  }]);