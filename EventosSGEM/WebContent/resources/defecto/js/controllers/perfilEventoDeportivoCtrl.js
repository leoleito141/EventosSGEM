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
		  
		  /// se ordenan los diciplinas alfabeticamente por su nombre
   		 for(var i=0;i<($scope.deportesMasculinos.length-1);i++){
		            for(var j=i+1;j<$scope.deportesMasculinos.length;j++){
		                if($scope.deportesMasculinos[i].nombreDisciplina>$scope.deportesMasculinos[j].nombreDisciplina){
		                    //Intercambiamos valores
		                    var variableauxiliar=$scope.deportesMasculinos[i];
		                    $scope.deportesMasculinos[i]=$scope.deportesMasculinos[j];
		                    $scope.deportesMasculinos[j]=variableauxiliar;
		                    
		                }
		            }
		        }
   		 
   	  /// se ordenan los disciplinas alfabeticamente por su nombre
   		 for(var i=0;i<($scope.deportesFemeninos.length-1);i++){
		            for(var j=i+1;j<$scope.deportesFemeninos.length;j++){
		                if($scope.deportesFemeninos[i].nombreDisciplina>$scope.deportesFemeninos[j].nombreDisciplina){
		                    //Intercambiamos valores
		                    var variableauxiliar=$scope.deportesFemeninos[i];
		                    $scope.deportesFemeninos[i]=$scope.deportesFemeninos[j];
		                    $scope.deportesFemeninos[j]=variableauxiliar;
		                    
		                }
		            }
		        }
		  
		  
	  }
	  
	  $scope.irDisciplina = function(nombreDisciplina,sexo){		  
		  $state.go('perfilDisciplina.paso1',{tenant: $scope.nombreTenant, nombreDeporte : $scope.nombreDeporte, nombreDisciplina : nombreDisciplina, sexo : sexo });
	  }
	  
	  
	  $scope.deportistaSeleccionado = function (de) {
		    

	        $scope.reporte={};
	        $scope.reporte=de;
	        objetos.setObjeto($scope.reporte);
	        $state.go('perfilDeportista',{tenant: dataTenant.nombre_url});



	    };
	  
  }]);
