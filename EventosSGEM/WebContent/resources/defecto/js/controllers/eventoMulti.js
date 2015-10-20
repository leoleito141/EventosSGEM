'use strict';

angular.module('pruebaAngularApp')
  .controller('EventoMultiCtrl', ['$scope','dataFactory', function ($scope,dataFactory) {
	
	  $scope.evento={};
	  console.log($scope.evento);
	  
	  $scope.openInicio = function($eventInicio) {
		    $scope.statusInicio.opened = true;
		  };

	  $scope.openFin = function($eventFin) {
		    $scope.statusFin.opened = true;
		  };
	   
	  $scope.statusInicio = {
			    opened: false
			  };
	  
	  $scope.statusFin = {
			    opened: false
			  };
	  
	  $scope.dateOptions = {
			    formatYear: 'yy',
			    startingDay: 1
			  };
	  
	  
	  $scope.altaEvento = function(){
		  dataFactory.altaEvento($scope.evento)
	     	.then(function (data, status, headers, config) {
	                $scope.status = data.status;
	                console.log("Entre Alta Evento");
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
