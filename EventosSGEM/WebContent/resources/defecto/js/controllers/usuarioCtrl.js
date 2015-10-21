'use strict';

angular.module('eventosSGEM')
  .controller('UsuarioCtrl', ['$scope','$state','$auth','dataFactory','dataTenant', 
                                     function ($scope, $state, $auth, dataFactory,dataTenant) {

   console.log(dataTenant.tenantId);
   
   $scope.customStyle.background= 'url(resources/defecto/img/tenant1/' + dataTenant.login_back_img +')fixed';
   
   $scope.nombreTenant = dataTenant.nombre_url;
   $scope.usuario = {};
   
   $scope.comite={};
   
   
   $scope.mensajeValidacion = "";   
   $scope.altaUsuarioComun = function () {
	  $scope.cargando = true;
	  setTimeout( function(){	  
			  
			  
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
//            	  	event.preventDefault(); NO ANDA EN MOZILLA...
					$state.go('login', { tenant: $scope.nombreTenant});//le agrega el tenant a la url, para no tener que buscar devuelta el datatenant
              }else{
            	  $scope.cargando = false;
            	  $scope.mensajeValidacion = "Error al registrar usuario.";
              }
      	}).error(function(error,status) {
      		
      		console.log(error);
      		console.log(status);
      		if(status == 302){
      		  $scope.cargando = false;
      		  $scope.mensajeValidacion = "El usuario con email: '"+usuarioComun.email + "' ya existe en el sistema.";
      		}else{
      		  $scope.cargando = false;
      		  $scope.mensajeValidacion = "Error al registrar usuario.";
      		}
      	});
			  
	  }, 1000) //espera 1 segundo
     
      
   	};
   
   	
//   	$scope.mensajeValidacion = "Las credenciales no son correctas.";
//   	$scope.mostrarValidacion = false;
   	
   	$scope.loginUsuario = function () {
   	     $scope.cargando = true;
	   	 setTimeout( function(){	  
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
	         .catch(function(error){
	
	       		console.log(error);
	       		console.log(error.status);
	       		if(error.status == 404){
	       		  $scope.cargando = false;
	       		  $scope.mensajeValidacion = "Email o contrase\u00F1a incorrecta.";
	       		}else{
	       		  $scope.cargando = false;
	       		  $scope.mensajeValidacion = "Error al autenticar usuario.";
	       		}
	         });
	        
	    }, 1000) //espera 1 segundo
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
