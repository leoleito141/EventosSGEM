'use strict';

angular.module('pruebaAngularApp', ['ui.router','ui.bootstrap','satellizer'])
.run(['dataFactory','$rootScope','$state','$auth',function(dataFactory,$rootScope, $state, $auth){ // esto se ejecuta en tiempo de ejecucion,
  $rootScope.$on('$stateChangeStart', function(event, next, current) {
  
    if(!$auth.isAuthenticated()){
    	
      if (next.templateUrl=='views/altaEvento.html' ) {
       	  event.preventDefault();
    	  $state.go('adminLogin');

      }


    } 
    /* Act on the event */
  });
  
}])
.config(function ($authProvider,$stateProvider, $urlRouterProvider) {
	// Parametros de configuración
    $authProvider.loginUrl = "https://sgem.com/rest/UsuarioService/login";
    //$authProvider.signupUrl = "http://api.com/auth/signup";
    $authProvider.tokenName = "token";
    $authProvider.tokenPrefix = "myApp";
    
    // Configuración de las rutas/estados
    $urlRouterProvider.otherwise('/');
    $stateProvider	    
    .state('adminLogin', {
    	url:'/',
		templateUrl : 'views/login.html',
		controller : 'LoginCtrl'
	})
	

 });


