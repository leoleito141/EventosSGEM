'use strict';

angular.module('eventosSGEM')
  .controller('UsuarioCtrl', ['$scope','$state','$auth','dataFactory','dataTenant', 
                                     function ($scope, $state, $auth, dataFactory,dataTenant) {

   console.log(dataTenant.tenantId);
   
   $scope.customStyle.background= 'url(resources/defecto/img/tenant1/' + dataTenant.login_back_img +')fixed';
   
   $scope.nombreTenant = dataTenant.nombre_url;
   $scope.usuario = {};
   
   $scope.comite={};
   
   $scope.altaUsuarioComun = function () {
    
      var usuarioComun = $scope.usuario;
      usuarioComun.tenantId = dataTenant.tenantId;
      usuarioComun.tipoUsuario = "Comun";
      usuarioComun.password = btoa(usuarioComun.password);
      console.log("entre insertar" + usuarioComun);
      
   dataFactory.altaUsuarioComun(usuarioComun)
      	.success(function (response, status, headers, config) {
              console.log(response);
              console.log(status);
              console.log(headers);
              console.log(config);
              if(response){
	              event.preventDefault();
	        	  $state.go('main', { tenant: $scope.nombreTenant});//le agrega el tenant a la url, para no tener que buscar devuelta el datatenant
              }else{
            	  alert("Error al dar de alta");
              }
      	}).error(function(error) {
      		console.log(error);
      		alert("Error al dar de alta");
      	});
      
   	};
   
   	
   	$scope.mensajeValidacion = "Las credenciales no son correctas.";
   	$scope.mostrarValidacion = false;
   	
   	$scope.loginUsuario = function () {
   		
   		var usuario = $scope.usuario;
     
        $auth.login({
            email: usuario.email,
            password: btoa(usuario.password) // base 64 
        })
        .then(function (data){           
             $scope.usrLogin.email = $scope.usuario.email;
             $scope.usuario.password="";
             var payLoad = $auth.getPayload();   
             console.log(payLoad);
            
             if(payLoad.rol == "Comun"){ 
            	 // Ver bien si guardamos asi el rol en sesion, 
            	 localStorage.setItem("rol", JSON.stringify(payLoad.rol));  // localStorage.getItem("rol") para obtenerlo
            	 event.preventDefault();
            	 $state.go('main', { tenant: $scope.nombreTenant});
             }
         })
         .catch(function(response){
         	console.log(response); 
         	$scope.mostrarValidacion = true;
         });
 	};
 	  
	 $scope.altaComite = function(){
		  
		  $scope.comite.tenantId = dataTenant.tenantId;
			  
		  dataFactory.altaComite($scope.comite)
	     	.then(function (data, status, headers, config) {
	                $scope.status = data.status;
	                console.log("Entre Alta comite");
	                console.log(data.status);
	                console.log(status);
	                console.log(headers);
	                console.log(config);
	                
	            })
	            .catch(function(response){
	                // Si ha habido errores llegamos a esta parte
	            	console.log(response); 
	            });
	  };
   
	  
	  
  }]);
