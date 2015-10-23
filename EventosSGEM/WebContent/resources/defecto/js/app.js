'use strict';

angular.module('eventosSGEM', ['ui.router','ui.bootstrap','satellizer'])
.run(['dataFactory','$rootScope','$state','$auth',function(dataFactory,$rootScope, $state, $auth){ // esto se ejecuta en tiempo de ejecucion,
  $rootScope.$on('$stateChangeStart', function(event, next, current) {
	  
    if(!$auth.isAuthenticated()){
    	
//      if (next.templateUrl=='views/altaEvento.html' ) {
//       	  event.preventDefault();
//    	  $state.go('adminLogin');
//
//      }


    } 
    /* Act on the event */
  });
  
}]).config(function ($authProvider,$stateProvider, $urlRouterProvider) {
	
	// Parametros de configuración
    $authProvider.loginUrl = "https://sgem.com/rest/UsuarioService/loginUsuario";
    $authProvider.tokenName = "token";
    $authProvider.tokenPrefix = "myApp";
        
    $stateProvider	 
    .state('404', {
    	template: '<div>error, el recurso no esta disponible</div>',
    })
    .state('main', {
    	url:'/:tenant/',
		templateUrl : 'views/tenant/main.html',
		controller : 'MainCtrl',
		 resolve: { 
	    	dataTenant: function(dataFactory,$stateParams) {
    			/***** ESTO ESTARÍA BUENO IMPLEMENTARLO EN UN UTIL O FUNCION ****/
	    		
	    		if(localStorage.getItem("tenantActual") == null || (JSON.parse(localStorage.getItem("tenantActual"))).nombre_url != $stateParams.tenant){

	    			return dataFactory.getDataTenant($stateParams.tenant);
	    			
	    		}else{
	    			return JSON.parse(localStorage.getItem("tenantActual"));
	    		}
	    		/**********************************************************/   
	    	}  
	    }
	})     
	.state('altaUsuarioComun', {
		url:'/:tenant/registroUC',
		templateUrl : 'views/tenant/registroTenant.html',
		controller : 'UsuarioCtrl',
	    resolve: { 
	    	dataTenant:function(dataFactory,$stateParams) {
    			/***** ESTO ESTARÍA BUENO IMPLEMENTARLO EN UN UTIL O FUNCION ****/
	    		
	    		if(localStorage.getItem("tenantActual") == null || (JSON.parse(localStorage.getItem("tenantActual"))).nombre_url != $stateParams.tenant){

	    			return dataFactory.getDataTenant($stateParams.tenant);
	    			
	    		}else{
	    			return JSON.parse(localStorage.getItem("tenantActual"));
	    		}
	    		/**********************************************************/   
	    	}  
	    }
	})
	.state('login', {
		url:'/:tenant/login',
		templateUrl : 'views/tenant/loginTenant.html',
		controller : 'UsuarioCtrl',
	    resolve: { 
	    	dataTenant:function(dataFactory,$stateParams) {
    			/***** ESTO ESTARÍA BUENO IMPLEMENTARLO EN UN UTIL O FUNCION ****/
	    		
	    		if(localStorage.getItem("tenantActual") == null || (JSON.parse(localStorage.getItem("tenantActual"))).nombre_url != $stateParams.tenant){

	    			return dataFactory.getDataTenant($stateParams.tenant);
	    			
	    		}else{
	    			return JSON.parse(localStorage.getItem("tenantActual"));
	    		}
	    		/**********************************************************/   
	    	}  
	    }
	})
	.state('altaNovedad', {
		url:'/:tenant/nuevaNovedad',
		templateUrl : 'views/tenant/comite/altaNovedad.html',
		controller : 'UsuarioCtrl',
	    resolve: { 
	    	dataTenant:function(dataFactory,$stateParams) {
    			/***** ESTO ESTARÍA BUENO IMPLEMENTARLO EN UN UTIL O FUNCION ****/
	    		
	    		if(localStorage.getItem("tenantActual") == null || (JSON.parse(localStorage.getItem("tenantActual"))).nombre_url != $stateParams.tenant){

	    			return dataFactory.getDataTenant($stateParams.tenant);
	    			
	    		}else{
	    			return JSON.parse(localStorage.getItem("tenantActual"));
	    		}
	    		/**********************************************************/   
	    	}  
	    }
	});
	
    $urlRouterProvider.otherwise(function($injector, $location){
        var state = $injector.get('$state');
        state.go('404');
        return $location.path();
     });

 });


