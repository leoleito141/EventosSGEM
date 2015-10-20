'use strict';

angular.module('pruebaAngularApp')
  .controller('AppCtrl', ['$scope','$state','$auth', function ($scope,$state,$auth) {
  	$scope.usrLogin={nombre:""};
  	$scope.tenantid={tenant:""};
  	$scope.customStyle={
  			background:"",
  			
  	};
  	console.log($scope.customStyle);

  	$scope.salir = function() {
  		
	    $scope.usrLogin={nombre:""};//Deja usrLogin vacio
	    $auth.logout(); //Limpia localStorage y pone isAuthenticated en false
	
	    //Redirecciona al login
	    $state.go('adminLogin');
    };
    
    $scope.isAuthenticated = function() {
    	 
    	  return $auth.isAuthenticated();
    };
 
	 


  }]);