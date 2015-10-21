'use strict';

angular.module('eventosSGEM')
  .controller('AppCtrl', ['$scope','$state','$auth', function ($scope,$state,$auth) {
  
	$scope.usrLogin={nombre:""};
  	$scope.customStyle={
  			background:"",
  			
  	};
  	console.log($scope.customStyle);

  	$scope.salir = function() {  		
	    $scope.usrLogin={nombre:""};//Deja usrLogin vacio
	    $auth.logout(); //Limpia localStorage y pone isAuthenticated en false
	
	    event.preventDefault();
	    $state.go('main', { tenant: $scope.nombreTenant});
    };
    
    $scope.isAuthenticated = function() {    	 
    	return $auth.isAuthenticated();
    };
 
	 


  }]);