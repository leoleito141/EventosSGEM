'use strict';

angular.module('eventosSGEM')
  .controller('entradasCtrl', ['$scope','dataFactory','$state','dataTenant', function ($scope,dataFactory,$state,dataTenant) {
	 
	  $scope.nombreTenant = dataTenant.nombre_url;
	  
	  if(dataTenant.colorFondo!=null&&dataTenant.colorNews ){
		  
		  $('.PerfilNews').css({
			    background: "-webkit-gradient(linear, left top, left bottom,from("+dataTenant.colorFondo+"), to("+dataTenant.colorNews+"))" 
		  });
	  
	  }
	  $scope.deportes = {};
	  
	  $scope.disciplinas = [];
	  
	  $scope.rondas = [];
	  
	  $scope.entrada={};
	  $scope.entrada.cantEntradas = 0;
	  $scope.precioEntrada = 0;
      
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
		  
		  $scope.disciplinas = [];
		  $scope.rondas = [];
		  $scope.entrada.nombreDeporte = {};
		  
		  dataFactory.listarDeportes(dataTenant.tenantId,sexo)
		  .success(function (response, status, headers, config) {
              console.log(response);
              console.log(status);
              console.log(headers);
              console.log(config);
              
              $scope.deportes = response;
              
//              $scope.nombreDeporte = $scope.deportes[0];

      	}).catch(function(error) {
      		console.log(error);
      		alert("Error al listar deportistas");
      	});
      
	  };
	  
	  $scope.obtenerDisciplina = function(sexo, nombreDeporte) {
		    
		  console.log(dataTenant.tenantId);
		  console.log(sexo);
		  console.log(nombreDeporte);
		  
		  $scope.rondas = [];
		  
		  dataFactory.listarDisciplinas(dataTenant.tenantId,sexo,nombreDeporte)
		  .success(function (response, status, headers, config) {
              console.log(response);
              console.log(status);
              console.log(headers);
              console.log(config);
              
              for(var i = 0; i<response.length ; i++){
            	  $scope.disciplinas.push(response[i].nombreDisciplina);
              }
//              $scope.nombreDisciplina = $scope.disciplinas [0];

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
	  
	  $scope.realizarCompra = function(idCompetencia,cantEntradas){
		  
		  $scope.datos = {};
		  
	      $scope.datos.tenantId = dataTenant.tenantId;
		  $scope.datos.idCompetencia = idCompetencia;
		  $scope.datos.cantEntradas = cantEntradas;
		  $scope.datos.mail = (JSON.parse(localStorage.getItem("dataUsuario"))).email;
		  
		  
		  dataFactory.realizarCompraEntradas($scope.datos)
	     	.then(function (data, status, headers, config) {
	     			$state.go('main', { tenant: $scope.nombreTenant } );
	                
	            })
	            .catch(function(response){
	                // Si ha habido errores llegamos a esta parte
	            	console.log(response); 
	            });
		  
			  
	  }; 
	  
		  
  }]);