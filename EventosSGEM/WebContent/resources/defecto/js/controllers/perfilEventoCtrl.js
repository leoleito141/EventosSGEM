'use strict';

angular.module('eventosSGEM')
  .controller('PerfilEventoCtrl', ['$scope','$state','dataFactory','dataTenant','Initializer', 'objetos',
                                     function ($scope, $state, dataFactory, dataTenant, Initializer,objetos) {
 
	  $scope.nombreTenant = dataTenant.nombre_url;
	  
	  if (dataTenant.pagina != null){		   
		  $scope.rutaLogo = dataTenant.pagina.ruta.substr(dataTenant.pagina.ruta.indexOf("resources")) ;
	   }
	
	  Initializer.mapsInitialized
		    .then(function(){
	    	
		    	  /*** Inicializo mapa ***/
		  	  
		  	var  geocoder = new google.maps.Geocoder();
		  		  var latlng = new google.maps.LatLng(-34.397, 150.644);
		  		  var mapOptions = {
		  			  zoom: 8,
		  			  center: latlng
		  		  }
		  		  
	  		var  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		  		//dataTenant.pais.ciudad
		  		geocoder.geocode( { 'address': 'Montevideo'}, function(results, status) {				
		  			if (status == google.maps.GeocoderStatus.OK) {
		  			  map.setCenter(results[0].geometry.location);
		  			  var marker = new google.maps.Marker({
		  			      map: map,
		  			      position: results[0].geometry.location
//		  			      ,
//		  			      icon: ruta
		  			  });
		  			} else {	
		  				$scope.mensajeValidacion = "Error en Geocode.";
		  				console.log("Error en Geocode : "+status);
		  		    }				
		  		});
		  	  
	  });
		  
	  
	  $scope.cargarDatos = function(){			  
		  
		  /*** Cargo ComitesOlimpicos ***/		  
		  dataFactory.listarComitesOlimpicos(dataTenant.tenantId)
	      	.success(function (response, status, headers, config) {
	              
	      		$scope.comitesOlimpicos = response;    	
	      		
	      		/*** adaptar a rutas relativas ***/
	      		for(var i = 0;i < $scope.comitesOlimpicos.length; i++){
	      			 var ruta = $scope.comitesOlimpicos[i].logo.ruta.substr($scope.comitesOlimpicos[i].logo.ruta.indexOf("resources")) ;
	      			$scope.comitesOlimpicos[i].logo.ruta = ruta;
	      		}
	      		
	      		/*** Cargo Deportes ***/	      		
	      		dataFactory.listarDeportesPorTenant(dataTenant.tenantId)
    	      	.success(function (response, status, headers, config) {	              
    	      		
    	      		$scope.deportes = [];  
    	      		
    	      		for(var i = 0; i< response.length ; i++){
    	      			if($scope.deportes.indexOf(response[i].nombreDeporte) == -1){
    	      				$scope.deportes.push(response[i].nombreDeporte);
    	      			}
    	      		}
    	      		
    	      	}).catch(function(error,status) {
    	      		$scope.mensajeValidacion = "Error al obtener eventos deportivos.";
    	      	});
    		  
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
