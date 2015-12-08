angular.module('eventosSGEM')
  .controller('EventoDeportivoCtrl', ['$scope','$state','$auth','dataFactory','dataTenant', 
                           function ($scope, $state,$auth, dataFactory, dataTenant) {
	
	  $scope.eventoDeportivo={};
	  $scope.nombreTenant = dataTenant.nombre_url;
	  
	  if(dataTenant.colorFondo!=null&&dataTenant.colorNews ){
		  
		  $('.PerfilNews').css({
			    background: "-webkit-gradient(linear, left top, left bottom,from("+dataTenant.colorFondo+"), to("+dataTenant.colorNews+"))" 
		  });
	  
	  }
	  
	  var fechaInicio = new Date(dataTenant.fechaInicio);
	  var fechaFin = new Date(dataTenant.fechaFin);
	 
	  $scope.$on('$viewContentLoaded' , function(){
          $('#datetimepicker2').datetimepicker({
        	  locale: 'es',
        	  minDate: fechaInicio,
        	  maxDate: fechaFin      	  
        	});
          $("#datetimepicker2").on("dp.change", function (e) {
        	  $scope.eventoDeportivo.fechaFin = e.date;
              
          });
          $('#datetimepicker1').datetimepicker({
        	  locale: 'es',
        	  minDate: fechaInicio,
        	  maxDate: fechaFin        	  
        	});
          $("#datetimepicker1").on("dp.change", function (e) {
        	  $scope.eventoDeportivo.fechaInicio = e.date;
              
          });
          
          

	  });
	  
	  $scope.altaEventoDeportivo = function(){
		  
		  if($auth.isAuthenticated()){
			  
			  var foto = $scope.imagenEventoDeportivo;
			  
			  if(foto != null){
				  
				  dataFactory.subirImagenDeporte(foto,dataTenant.tenantId).
					then(function (response, status, headers, config) {
						
					     var foto = {};
					     foto.mime = response.data.mime;
					     foto.ruta = response.data.ruta;
					     foto.tenantId = response.data.tenantId;						  
			 
						 $scope.eventoDeportivo.tenantId = dataTenant.tenantId;
						 $scope.eventoDeportivo.foto = foto;
						 
						 dataFactory.altaEventoDeportivo($scope.eventoDeportivo)
					     	.then(function (data, status, headers, config) {
					     		
					     		$state.go('main', { tenant: $scope.nombreTenant } );
				                
				         }).catch(function(response){
				        		if(status == 302){
					      			$scope.cargando = false;
					      			$scope.mensajeValidacion = "El comite con codigo: '"+ $scope.comite.codigo + "' ya existe en el sistema.";
					       		}else{
					       			$scope.cargando = false;
					       			$scope.mensajeValidacion = "Error al crear comit\u00e9 Ol\u00edmpico. Contacte con soporte.";
					       		}
				         });						  
						  
					}).catch(function(response){
						$scope.cargando = false;
						$scope.mensajeValidacion = "Error al subir foto del evento deportivo. Contacte con soporte.";
					});	
					  
			   }else{
				  $scope.cargando = false;		
				  $scope.mensajeValidacion = "Debe seleccionar una im\u00E1gen, para el logo del cmite Ol\u00edmpico.";
			   }					 
		   }else{		 
			   	localStorage.removeItem("dataUsuario");
				dataMensajes.add("Sesion Caducada");
				$scope.mensajeValidacion = dataMensajes.getMensaje();
				$state.go('login', { tenant: $scope.nombreTenant});
		   }
		  
		  
	  };
	  
	  $scope.deshabilitarForm = function(){		  
		  if($scope.eventoDeportivo == undefined){
			  return true;
		  }
		  return (($scope.eventoDeportivo.nombreDeporte != null && $scope.eventoDeportivo.nombreDeporte == "") ||
				  ($scope.eventoDeportivo.nombreDisciplina != null && $scope.eventoDeportivo.nombreDisciplina == "") ||
				  $scope.eventoDeportivo.nombreDeporte == null || $scope.eventoDeportivo.nombreDisciplina == null
				  || $scope.eventoDeportivo.sexo == null || $scope.eventoDeportivo.tipo == null
				  || $scope.eventoDeportivo.fechaInicio == null || $scope.eventoDeportivo.fechaFin == null 
				  || $scope.eventoDeportivo.cantRondas == null || $scope.imagenEventoDeportivo == null);	
	  }
	  
	  
	  
  }]);

