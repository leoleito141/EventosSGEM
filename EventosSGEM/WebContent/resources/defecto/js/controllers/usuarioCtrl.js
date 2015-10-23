'use strict';

angular.module('eventosSGEM')
  .controller('UsuarioCtrl', ['$scope','$state','$auth','dataFactory','dataTenant', 
                                     function ($scope, $state, $auth, dataFactory,dataTenant) {

//   console.log(dataTenant.tenantId);
   
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
	            	  	event.preventDefault(); //NO ANDA EN MOZILLA...
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
			  
	  }, 1000); //espera 1 segundo
     
      
   	};
   
   	$scope.loginUsuario = function () {
   	     $scope.cargando = true;
   	     
	   	 setTimeout( function(){	  
	   		var usuario = $scope.usuario;
	     
	        $auth.login({
	            email: usuario.email,
	            password: btoa(usuario.password), // base 64
	            tenantId : dataTenant.tenantId
	        })
	        .then(function (data){           
	             $scope.usrLogin.email = $scope.usuario.email;
	             $scope.usuario.password="";
	             
	             var payLoad = $auth.getPayload();             
	             var dataUsuario = payLoad.dataUsuario;
	            
	             // ver bien si es en el local o session...
	             localStorage.setItem("dataUsuario", JSON.stringify(dataUsuario));  // localStorage.getItem("dataUsuario") para obtenerlo
	             	             
	             if(dataUsuario.tipoUsuario == "Comun"){ 
	            	 event.preventDefault();
	            	 $state.go('main', { tenant: $scope.nombreTenant } );
	             }else if (dataUsuario.tipoUsuario == "Comite"){
	            	 event.preventDefault();
	            	 $state.go('altaNovedad', { tenant: $scope.nombreTenant} );
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
	        
	    }, 1000); //espera 1 segundo
 	};
 	  
 	
 	
 	/********************************** COMITE OLIMPICO **********************************/
 	
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
	  
	  $scope.altaNovedad = function(){
		  var novedad = $scope.novedad; 
		  novedad.tenantId = dataTenant.tenantId;
			  
		  dataFactory.altaNovedad(novedad)
	     	.then(function (data, status, headers, config) {
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
