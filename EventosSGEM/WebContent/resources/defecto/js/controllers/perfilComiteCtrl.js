'use strict';

angular.module('eventosSGEM')
  .controller('PerfilComiteCtrl',['$scope','$state','$stateParams','dataFactory','dataTenant', 'objetos',
                            function($scope, $state, $stateParams, dataFactory, dataTenant, objetos) {
   
	  $scope.tenant = dataTenant.nombre_url;
//	  console.log(objetos.getObjeto());
	  
	  $scope.cargarDatos = function(){
		  
		  $.ajax({
		        headers: {
		             "Accept": "application/json",
		             "Accept-Language": "en_US",
		             "Authorization": "Basic "+btoa("AcD1onk8sS18COcbcOpl1gc9aUBOKMICfVfbYP9XFV7s1PlRox1gJ5SRpZN9EcPCDV8q_DryeS4MqLaU:EGLMTEBo-FyDb_bjsd7AhVEVXTeyfjNtxGgf0a_JF-soy3qE-9GCsTyKiqp8RhP4DiXB73Vgv-u-lqPL")
		        },
		        url: "https://api.sandbox.paypal.com/v1/oauth2/token",
		        type: "POST",
	            data: "grant_type=client_credentials",
		        complete: function(result) {
//		        	alert(JSON.stringify(result));
		        	var token = result.responseJSON.access_token;
		        	llamadaPaypal(token);
		        },
		});
		  
		  
		  
		  var existe = false;
		  
		  if((objetos.getObjeto() != null)&&(objetos.getObjeto().codigo !=null)){
			  existe = true;
			  $scope.comite = objetos.getObjeto();
			  $scope.rutaLogo = $scope.comite.logo.ruta.substr($scope.comite.logo.ruta.indexOf("resources"));
			  obtenerNovedades(dataTenant.tenantId,parseInt($stateParams.comiteId));
		  }else{			
			  dataFactory.obtenerComite(dataTenant.tenantId,$stateParams.comiteId)
			  .success(function (response, status, headers, config) {
		      	  existe = true;
				  $scope.comite = response;
				  $scope.rutaLogo = $scope.comite.logo.ruta.substr($scope.comite.logo.ruta.indexOf("resources"));
				  obtenerNovedades(dataTenant.tenantId,parseInt($stateParams.comiteId));
	      	  }).catch(function(error) {
		      		if(error.status = 404){
		      			$scope.mensajeValidacion = "Error al obtener comites olimpico, no existe el comite.";
		      		}else{
		      			$scope.mensajeValidacion = "Error en el servidor. Contacte con soporte";
		      		}
	      	  });
			  		 
			  
		  }
	  	}  
	  
		
		function obtenerNovedades(tenantID,comiteID){  
			  
			dataFactory.getNovedadesComite(tenantID,comiteID)
			.success(function (response, status, headers, config) {
			     
				  $scope.novedades = response;
				  
			}).catch(function(error) {
				$scope.mensajeValidacion = "Error en el servidor. Contacte con soporte";
			});
			  
		}
	

		function llamadaPaypal(token){  
			
			var data = {};
			data.intent = "sale";
			
			data.redirect_urls = {};
			data.redirect_urls.return_url = "https://sgem-eventos.com:8443/#/Rio2016/";
			data.redirect_urls.return_url = "https://google.com";
			
			data.payer = {};
			data.payer.payment_method = "paypal";
			data.transactions = [];
			
			var amount = {};
			amount.total = 7.47;
			amount.currency = "USD";
			
			data.transactions.push(amount);
			
			 $.ajax({
			        headers: {
			             "Content-Type": "application/json",
			             "Authorization": "Bearer "+token
			        },
			        url: "https://api.sandbox.paypal.com/v1/payments/payment",
			        type: "POST",
		            data: 
		            	{
		            	  "intent":"sale",
		            	  "redirect_urls":{
		            	    "return_url":"http://<return URL here>",
		            	    "cancel_url":"http://<cancel URL here>"
		            	  },
		            	  "payer":{
		            	    "payment_method":"paypal"
		            	  },
		            	  "transactions":[
		            	    {
		            	      "amount":{
		            	        "total":"7.47",
		            	        "currency":"USD"
		            	      },
		            	      "description":"This is the payment transaction description."
		            	    }
		            	  ]
		            	},
			        complete: function(result) {
			        	alert(JSON.stringify(result));
			        	console.log(result);
			        },
			});
		}
	  

  }]);
