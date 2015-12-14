'use strict';

angular.module('eventosSGEM')
  .controller('competenciaCtrl', ['$scope','dataFactory','$state','dataTenant','$document',
                                  function ($scope,dataFactory,$state,dataTenant,$document) {
	   	  
	  if(dataTenant.colorFondo!=null&&dataTenant.colorNews ){
		  
		  $('.PerfilNews').css({
			    background: "-webkit-gradient(linear, left top, left bottom,from("+dataTenant.colorFondo+"), to("+dataTenant.colorNews+"))" 
		  });
	  
	  }
	  $scope.nombreTenant = dataTenant.nombre_url;
	  $scope.competencia={};
	  
	  $scope.deportes = {};
	  
	  $scope.disciplinas = [];
	  
	  $scope.rondas = {};
	  
	  $scope.deportistas = {};
	  
	  $scope.nombreDisciplinas = {}
	  $scope.deporteSeleccionado = {};
	  $scope.fechaInicio = {};
	  $scope.fechaFin = {};
	  
//	  $scope.$on('$viewContentLoaded' , function(){
//         
//          $('#datetimepicker1').datetimepicker({
//        	  locale: 'es'     	  
//        	});
//          $("#datetimepicker1").on("dp.change", function (e) {
//        	  $scope.competencia.fechaInicio = e.date;
//              
//          });
//          
//          
//
//	  });
	  
	  $scope.paso1 = function(){
		  $state.go('formAltaCompetencia.Paso1', { tenant: $scope.nombreTenant } );
		  var someElement = angular.element(document.querySelector('.coolbtn'))
		  $document.scrollToElement(someElement, 30, 2000);
	  }   
	  
	  $scope.paso2 = function(){
		  $scope.obtenerDeportistas($scope.competencia.sexo,$scope.competencia.nombreDeporte,$scope.competencia.nombreDisciplina);
		  $scope.obtenerJueces();
		  
		  $state.go('formAltaCompetencia.Paso2', { tenant: $scope.nombreTenant } );
		  var someElement = angular.element(document.querySelector('.coolbtn'))
		  $document.scrollToElement(someElement, 30, 2000);
	  }   
	  
	  $scope.paso3 = function(){
		  $state.go('formAltaCompetencia.Paso3', { tenant: $scope.nombreTenant } );
		  var someElement = angular.element(document.querySelector('.coolbtn'))
		  $document.scrollToElement(someElement, 30, 2000);
	  }   
	  
	  $scope.obtenerDeportes = function(sexo) {
		  
		  
		  console.log(dataTenant.tenantId);
		  console.log(sexo);
		  
		  $scope.disciplinas = [];
		  $scope.competencia.nombreDeporte = {};
		  
		  dataFactory.listarDeportes(dataTenant.tenantId,sexo)
		  .success(function (response, status, headers, config) {
              console.log(response);
              console.log(status);
              console.log(headers);
              console.log(config);
              
              $scope.deportes = response;
              
//              $scope.nombreDeporte = $scope.deportes[0].nombreDisciplina;

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
            
//              $scope.nombreDisciplina = $scope.disciplinas[0].nombreDisciplina;

      	}).catch(function(error) {
      		console.log(error);
      		alert("Error al listar deportistas");
      	});
      
	  };  
	  
	  $scope.initCalendar = function(){
		  var fechaInicio = $scope.fechaInicio;
		  var fechaFin = $scope.fechaFin;
		  
		  if($scope.competencia.fechaInicio  == undefined){			  
			  $scope.competencia.fechaInicio = fechaInicio;
		  }
		  
		  $('#datetimepicker1').datetimepicker({
        	  locale: 'es',
        	  minDate: fechaInicio,
        	  maxDate: fechaFin   
        	});
          $("#datetimepicker1").on("dp.change", function (e) {
        	  $scope.competencia.fechaInicio = e.date;
              
          });
	  }
	  
	  $scope.obtenerRondas = function(sexo, nombreDeporte,nombreDisciplina) {
		    
		  
		  console.log(dataTenant.tenantId);
		  console.log(sexo);
		  console.log(nombreDeporte);

		  for(var i =0; i < $scope.disciplinas.length ; i++){
			  if($scope.disciplinas[i].nombreDisciplina == nombreDisciplina){
				 $scope.fechaInicio = new Date($scope.disciplinas[i].fechaInicio);
				 $scope.fechaFin = new Date($scope.disciplinas[i].fechaFin);
				 break;
			  }
		  }
		  
		  
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
              
              
              for(var i = 0;i < $scope.deportistas.length; i++){
		      		 var ruta = $scope.deportistas[i].foto.ruta.substr($scope.deportistas[i].foto.ruta.indexOf("resources"));
		      		 $scope.deportistas[i].foto.ruta = ruta;
		      	  }
              
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
		  		  
		  $scope.esUltimaRonda = function(){	
			  if($scope.rondas == null || $scope.competencia.ronda == null){
				  return false;
			  }
			  return $scope.rondas.length == $scope.competencia.ronda;
		  };
		  
		  $scope.habilitarGuardar = function() {		  
			  if($scope.competencia == undefined){
				  return false;
			  }
			  return  ($scope.competencia.sexo == null || $scope.competencia.nombreDeporte == null 
				    || $scope.competencia.nombreDisciplina == null || $scope.competencia.ronda == null 
				    || $scope.competencia.juez == null || $scope.competencia.estadio == null
				    || $scope.competencia.precioEntrada == null || $scope.competencia.cantEntradas == null 
				    || $scope.selection == null || $scope.selection.length == 0
				    || $scope.competencia.fechaInicio == null
				    
				    || $scope.competencia.sexo == "" || $scope.competencia.nombreDeporte == ""
				    || $scope.competencia.nombreDisciplina == "" || $scope.competencia.ronda == 0 
				    || $scope.competencia.estadio == ""
				    || $scope.competencia.precioEntrada == 0 || $scope.competencia.cantEntradas == 0);	

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
			  $scope.datos.puesto = $scope.competencia.puesto;
			  
			  dataFactory.altaCompetencia($scope.datos)
		     	.then(function (data, status, headers, config) {	              
		                $state.go('main', { tenant: $scope.nombreTenant } );
		            })
		            .catch(function(response){
		                // Si ha habido errores llegamos a esta parte
		            	console.log(response); 
		            });
			  
			  
			  
		  }; 
		  
		  
		  
  }]);