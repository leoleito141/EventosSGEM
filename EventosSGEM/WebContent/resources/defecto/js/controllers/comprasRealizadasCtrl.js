'use strict';

angular.module('eventosSGEM')
  .controller('ComprasRealizadasCtrl', ['$scope','$state','$auth','dataFactory','dataTenant','dataMensajes','$document',
                                     function ($scope, $state, $auth, dataFactory, dataTenant,dataMensajes, $document) {
 
	  if(dataTenant.colorFondo!=null&&dataTenant.colorNews ){
		  
		  $('.PerfilNews').css({
			    background: "-webkit-gradient(linear, left top, left bottom,from("+dataTenant.colorFondo+"), to("+dataTenant.colorNews+"))" 
		  });
	  
	  }
	  
   $scope.nombreTenant = dataTenant.nombre_url;   
   $scope.mensajeValidacion = "";   
   

      
   var usuarioComun = (JSON.parse(localStorage.getItem("dataUsuario")));   	

   $scope.listarEntradasCompradasUsuario = function(){
	   if($auth.isAuthenticated()){
		   dataFactory.listarEntradasCompradasUsuario(dataTenant.tenantId,usuarioComun.usuarioId).
		   		then(function (response, status, headers, config) {	
				
					$scope.compras = response.data;			
	
					
				}).catch(function(response){
					$scope.mensajeValidacion = "Error obteniendo competencias pendientes.";
				});
	   }else {
		  localStorage.removeItem("dataUsuario");
		  dataMensajes.add("Sesion Caducada");
		  $scope.mensajeValidacion = dataMensajes.getMensaje();
		  $state.go('login', { tenant: $scope.nombreTenant});
	   }
   };
  
 
	  
  }]);
