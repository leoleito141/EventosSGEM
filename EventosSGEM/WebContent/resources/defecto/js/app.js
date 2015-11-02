'use strict';

angular.module('eventosSGEM', ['ui.router','ui.bootstrap','satellizer','googlechart'])
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
  
}]).config(function ($authProvider,$stateProvider, $urlRouterProvider,$locationProvider) {
	
	
//	$locationProvider.html5Mode(true);
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
	}).state('altaComite', {
		url:'/:tenant/altaComite',
		templateUrl : 'views/tenant/comite/altaComite.html',
		controller : 'UsuarioCtrl',
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
	}).state('perfilComite', {
		url:'/:tenant/perfilComite',
		templateUrl : 'views/tenant/comite/perfilComite.html',
		controller : 'PerfilCtrl'
			
	}).state('altaDeportista', {
		url:'/:tenant/altaDeportista',
		templateUrl : 'views/tenant/comite/altaDeportista.html',
		controller : 'deportistaCtrl',
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
	}).state('altaEventoDeportivo', {
		url:'/:tenant/altaEventoDeportivo',
		templateUrl : 'views/tenant/organizador/altaEventDeportivo.html',
		controller : 'EventDeportivoCtrl',
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
		
	}).state('formAltaCompetencia', {
		url:'/:tenant/altaCompetencia',
		templateUrl : 'views/tenant/organizador/formAltaCompetencia.html',
		controller : 'competenciaCtrl',
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
	
	})// nested states 
	.state('formAltaCompetencia.Paso1', {
		url:'/Competencia1',
		templateUrl : 'views/tenant/organizador/altaCompetencia1.html',
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

	})// nested states each of these sections will have their own view url will be nested (/altaEvento/organizador)
	.state('formAltaCompetencia.Paso2', {
        url: '/Competencia2',
        templateUrl: 'views/tenant/organizador/altaCompetencia2.html',
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
        	
    }).state('formAltaCompetencia.Paso3', {
        url: '/Competencia3',
        templateUrl: 'views/tenant/organizador/altaCompetencia3.html',
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
        	
    }).state('altaJuez', {
		url:'/:tenant/altaJuez',
		templateUrl : 'views/tenant/organizador/altaJuez.html',
		controller : 'JuezCtrl',
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
		
	}).state('usoSitio', {
		url:'/:tenant/usoSitio',
		templateUrl : 'views/tenant/organizador/reporteUsoSitio.html',
		controller : 'UsuarioCtrl',
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
	});
	
    $urlRouterProvider.otherwise(function($injector, $location){
        var state = $injector.get('$state');
        state.go('404');
        return $location.path();
     });

 });


