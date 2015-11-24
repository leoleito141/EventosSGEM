'use strict';

angular.module('eventosSGEM')
  .controller('listarComitesCtrl', ['$scope','$state','dataFactory','dataTenant','objetos',
                                     function ($scope, $state, dataFactory, dataTenant,objetos) {
 
	  $scope.tenant = dataTenant.nombre_url;
	  
	  $scope.cargarDatos = function(){			  
		  
		  /*** Cargo ComitesOlimpicos ***/		  
		  dataFactory.listarComitesOlimpicos(dataTenant.tenantId)
	      	.success(function (response, status, headers, config) {
	              
	      		$scope.comitesOlimpicos = response;    	
	      		
	      		
	      	/// Se ordenan los paises por orden alfabetico
	      		 for(var i=0;i<($scope.comitesOlimpicos.length-1);i++){
			            for(var j=i+1;j<$scope.comitesOlimpicos.length;j++){
			                if($scope.comitesOlimpicos[i].pais.pais>$scope.comitesOlimpicos[j].pais.pais){
			                    //Intercambiamos valores
			                    var variableauxiliar=$scope.comitesOlimpicos[i];
			                    $scope.comitesOlimpicos[i]=$scope.comitesOlimpicos[j];
			                    $scope.comitesOlimpicos[j]=variableauxiliar;
			                    
			                }
			            }
			        }
	      		
	      		/*** adaptar a rutas relativas ***/
	      		for(var i = 0;i < $scope.comitesOlimpicos.length; i++){
	      			 var ruta = $scope.comitesOlimpicos[i].logo.ruta.substr($scope.comitesOlimpicos[i].logo.ruta.indexOf("resources")) ;
	      			$scope.comitesOlimpicos[i].logo.ruta = ruta;
	      		}
    		  
	      	}).catch(function(error,status) {
	      		  $scope.mensajeValidacion = "Error al obtener comites olimpicos.";
	      	}); 
		  
	  };
		
	  $scope.irPerfilComite = function(comiteId){			  
		  console.log(comiteId);
		  
		  objetos.setObjeto( buscarComite(comiteId) );
		  $state.go('perfilComite',{tenant: $scope.tenant, comiteId : comiteId });
	  };
	  
	  function buscarComite(comiteId){
		  for(var i = 0; i< $scope.comitesOlimpicos.length ; i++){
				if($scope.comitesOlimpicos[i].comiteId == comiteId){
      				return $scope.comitesOlimpicos[i];
      			}
		  }		  
	  }
  }]);
