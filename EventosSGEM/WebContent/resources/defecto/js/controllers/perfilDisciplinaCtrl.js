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
			  $scope.competencia = $scope.resultados.competencia;
			  $scope.estadisticas = $scope.resultados.estadisticas;
			  
			  
			  if( $scope.competencia.tipoDeporte == "individual"){
			  
			  
			  /// Ordeno los resultados por posicion !!
			   for(var i=0;i<($scope.estadisticas.length-1);i++){
		            for(var j=i+1;j<$scope.estadisticas.length;j++){
		                if($scope.estadisticas[i].posicion>$scope.estadisticas[j].posicion){
		                    //Intercambiamos valores
		                    var variableauxiliar=$scope.estadisticas[i];
		                    $scope.estadisticas[i]=$scope.estadisticas[j];
		                    $scope.estadisticas[j]=variableauxiliar;
		                    
		                }
		            }
		        }
			  
			  }else{
				  
				  var paises = [];
				  $scope.paisesTodos = []; 
				   for(var i = 0; i < $scope.competencia.deportistas.length; i++) {				    
					   if(paises.indexOf($scope.competencia.deportistas[i].comite.pais.pais) == -1){					   
						   paises.push($scope.competencia.deportistas[i].comite.pais.pais);
					   }
				   }
				   for(var i = 0; i < paises.length; i++) {	
					   
						  $scope.paisesTodos.push({ 'id' : (i+1),
							  						 'nombre' : paises[i] 
				  									});
					   }
				   
				   
				  
				  
				  
			  }
			  
		
      	  }).catch(function(error) {
      		  $scope.mensajeValidacion = "Error al obtener resultados para la competencia nro.:"+ $scope.competenciaSeleccionada;
      	  });
		  
	  };
	 
	  
  }]);
