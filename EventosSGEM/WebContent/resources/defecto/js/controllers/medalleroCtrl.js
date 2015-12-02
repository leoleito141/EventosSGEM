'use strict';

angular.module('eventosSGEM')
  .controller('MedalleroCtrl', ['$scope','$state','dataFactory','dataTenant','objetos',
                             function ($scope, $state, dataFactory, dataTenant,objetos) {
      
	  $scope.tenant = dataTenant.nombre_url;
	  $scope.medallero = [];	  
	  $scope.cargarDatos = function(){			  
		  		  
   			/*** Cargo Deportes ***/	      		
    		dataFactory.listarComitesOlimpicos(dataTenant.tenantId)
	      	.success(function (response, status, headers, config) {	
	      		
	      		$scope.comites = response;
	      		armarMedallero($scope.comites);
	      		
	      	}).catch(function(error,status) {
	      		$scope.mensajeValidacion = "Error al obtener medallero.";
	      	});

	  };
	  
	  function armarMedallero(comites){
		  var medallas = [];
		  for(var i = 0; i<comites.length;i++){
			  var medalla = {};
			  medalla.posicion = 0;
			  medalla.pais = comites[i].pais.pais;
			  medalla.foto = comites[i].logo.ruta.substr(comites[i].logo.ruta.indexOf("resources"));
			  medalla.comiteID = comites[i].comiteId;
			  medalla.oro = comites[i].puesto1;
			  medalla.plata = comites[i].puesto2;
			  medalla.bronce = comites[i].puesto3;
			  medalla.total = (comites[i].puesto1 + comites[i].puesto2 + comites[i].puesto3);
			  medallas[i] = medalla;
		  }  
		  
		  /** Se ordenan por oro **/
		  for(var i=0;i<(medallas.length-1);i++){
	            for(var j=i+1;j<medallas.length;j++){
	                if(medallas[i].oro<medallas[j].oro){
	                    //Intercambiamos valores
	                    var variableauxiliar=medallas[i];
	                    medallas[i]=medallas[j];
	                    medallas[j]=variableauxiliar;	                    
	                }
	            }
	        }
		  
		  for(var j=0; j<medallas.length; j++){
			  medallas[j].posicion = j+1;
		  }
		  
		  $scope.medallas = medallas;
	  }
	
	  $scope.irPerfilComite = function(comiteId){	
		  objetos.setObjeto( buscarComite(comiteId) );
		  $state.go('perfilComite',{tenant: $scope.tenant, comiteId : comiteId });
	  };
	  
	  function buscarComite(comiteId){
		  for(var i = 0; i< $scope.comites.length ; i++){
				if($scope.comites[i].comiteId == comiteId){
      				return $scope.comites[i];
      			}
		  }		  
	  }
	  
  }]);
