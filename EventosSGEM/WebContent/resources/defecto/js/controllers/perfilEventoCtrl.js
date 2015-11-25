'use strict';

angular.module('eventosSGEM')
  .controller('PerfilEventoCtrl', ['$scope','$state','dataFactory','dataTenant','Initializer', 'objetos',
                                     function ($scope, $state, dataFactory, dataTenant, Initializer,objetos) {
	  if(dataTenant.colorFondo!=null&&dataTenant.colorNews ){
		  
		  $('.PerfilNews').css({
			    background: "-webkit-gradient(linear, left top, left bottom,from("+dataTenant.colorFondo+"), to("+dataTenant.colorNews+"))" 
		  });
	  
	  } 
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

		  		geocoder.geocode( { 'address': dataTenant.pais.ciudad}, function(results, status) {				
		  			if (status == google.maps.GeocoderStatus.OK) {
		  			  map.setCenter(results[0].geometry.location);
		  			  var marker = new google.maps.Marker({
		  			      map: map,
		  			      position: results[0].geometry.location
//		  			      ,
//		  			      icon: $scope.rutaLogo
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
	      		
	      		
	      		
	      		/*** Cargo Deportes ***/	      		
	      		dataFactory.listarDeportesPorTenant(dataTenant.tenantId)
    	      	.success(function (response, status, headers, config) {	              
    	      		
    	      		$scope.deportes = response;
    	      		$scope.nombreDeportes = [];

    	      		for(var i = 0; i< $scope.deportes.length ; i++){
    	      			if($scope.nombreDeportes.indexOf($scope.deportes[i].nombreDeporte) == -1){
    	      				$scope.nombreDeportes.push($scope.deportes[i].nombreDeporte);
    	      			}
    	      		}
    	      		
    	      		// se ordenan los deportes alfabeticamente
    	      		$scope.nombreDeportes.sort();
    	      		
    	      		
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
	  
	  $scope.irPerfilEventoDeportivo = function(nombreDeporte){		  
		  console.log(nombreDeporte);
		  
		  objetos.setObjetos( buscarDeporteConDisciplinas(nombreDeporte) );
		  $state.go('perfilEventoDeportivo',{tenant: $scope.tenant, nombreDeporte : nombreDeporte });
	  };

	  function buscarDeporteConDisciplinas(nombreDeporte){
		  var deportes = [];
		  for(var i = 0; i< $scope.deportes.length ; i++){
				if($scope.deportes[i].nombreDeporte == nombreDeporte){
					deportes.push($scope.deportes[i]);
      			}
		  }		  		  
		  return deportes;
	  }
	  
	  
  }]);
