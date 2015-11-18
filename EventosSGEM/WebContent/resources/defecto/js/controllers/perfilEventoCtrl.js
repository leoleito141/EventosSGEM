'use strict';

angular.module('eventosSGEM')
  .controller('PerfilEventoCtrl', ['$scope','$state','dataFactory','dataTenant','Initializer',
                                     function ($scope, $state, dataFactory, dataTenant, Initializer) {
 
	  $scope.nombreTenant = dataTenant.nombre_url;
	  
	  if (dataTenant.pagina != null){		   
			var ruta = dataTenant.pagina.ruta.substr(dataTenant.pagina.ruta.indexOf("resources")) ;
			$("#logoEvento").html(' <img  src="'+ruta+'" alt="no-image" style="height:25%;width:25%;padding:2px;" />');
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
	      		dataFactory.listarDeportes(dataTenant.tenantId)
    	      	.success(function (response, status, headers, config) {	              
    	      		
    	      		$scope.deportes = response;  
    	      		
    	      	}).catch(function(error,status) {
    	      		$scope.mensajeValidacion = "Error al obtener eventos deportivos.";
    	      	});
    		  
	      	}).catch(function(error,status) {
	      		  $scope.mensajeValidacion = "Error al obtener comites olimpicos.";
	      	}); 
		  
	  };
		
   
  }]);
