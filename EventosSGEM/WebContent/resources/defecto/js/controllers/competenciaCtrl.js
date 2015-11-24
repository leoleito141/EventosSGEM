'use strict';

angular.module('eventosSGEM')
  .controller('competenciaCtrl', ['$scope','dataFactory','$state','dataTenant', function ($scope,dataFactory,$state,dataTenant) {
	   
	  if(dataTenant.colorFondo!=null&&dataTenant.colorNews ){
		  
		  $('.PerfilNews').css({
			    background: "-webkit-gradient(linear, left top, left bottom,from("+dataTenant.colorFondo+"), to("+dataTenant.colorNews+"))" 
		  });
	  
	  }
	  $scope.competencia={};
	  
	  $scope.deportes = {};
	  
	  $scope.disciplinas = {};
	  
	  $scope.rondas = {};
	  
	  $scope.deportistas = {};
	  
	  $scope.$on('$viewContentLoaded' , function(){
         
          $('#datetimepicker1').datetimepicker({
        	  locale: 'es'
        	  
        	});
          $("#datetimepicker1").on("dp.change", function (e) {
        	  $scope.competencia.fechaInicio = e.date;
              
          });
          
          

	  });
	 	    
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
	  
	  
	  
	  
	  $scope.obtenerDeportistas = function(sexo, nombreDeporte,nombreDisciplina) {
		    
		  console.log(dataTenant.tenantId);
		  console.log(sexo);
		  console.log(nombreDeporte);
		  
		  dataFactory.listarDeportistasEventoDeportivo(dataTenant.tenantId,sexo,nombreDeporte,nombreDisciplina)
		  .success(function (response, status, headers, config) {
              console.log(response);
              console.log(status);
              console.log(headers);
              console.log(config);
              
              $scope.deportistas = response;
              
              $scope.selectDeportistas = $scope.deportistas [0];

      	}).catch(function(error) {
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
	              
	              $scope.juez = $scope.jueces [0];

	      	}).catch(function(error) {
	      		console.log(error);
	      		alert("Error al listar jueces");
	      	});
	      
		  };  
		  
		  
		 
		  $scope.guardarCompetencia = function(sexo,estadio,cantEntradas,precioEntrada,fechaInicio,nombreDeporte,nombreDisciplina,ronda,juez,selection){
			  
			  
			  $scope.datos = {};
			  var juez1 = juez;
			  var deportistas = selection;
		//	  $scope.datos.juez = juez1;
		//	  $scope.datos.sexo = sexo;
			  
			  $scope.datos.tenantId = dataTenant.tenantId;
			  $scope.datos.sexo = sexo;
			  $scope.datos.estadio = estadio;
			  $scope.datos.cantEntradas = cantEntradas;
			  $scope.datos.precioEntrada = precioEntrada;
			  $scope.datos.nombreDeporte = nombreDeporte;
			  $scope.datos.fecha = fechaInicio;
			  $scope.datos.nombreDisciplina = nombreDisciplina;
			  $scope.datos.ronda = ronda;
			  $scope.datos.juez = juez1;
			  $scope.datos.deportistas = deportistas;
			  
			  dataFactory.altaCompetencia($scope.datos)
		     	.then(function (data, status, headers, config) {
		                $scope.status = data.status;
		                console.log("Entre Alta Deportista");
		                console.log(data.status);
		                console.log(status);
		                console.log(headers);
		                console.log(config);
		                
		            })
		            .catch(function(response){
		                // Si ha habido errores llegamos a esta parte
		            	console.log(response); 
		            });
			  
			  
			  
		  }; 
		  
		  
		  
  }]);