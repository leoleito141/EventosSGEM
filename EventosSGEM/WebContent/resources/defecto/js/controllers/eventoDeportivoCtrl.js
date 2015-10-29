angular.module('eventosSGEM')
  .controller('EventDeportivoCtrl', ['$scope','dataFactory','dataTenant', 
                           function ($scope, dataFactory,dataTenant) {
	
	  $scope.eventoDeportivo={};
	  console.log($scope.eventoDeportivo);
	  
	  
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
	  
	  $scope.altaEventoDeportivo = function(){
		  
		  $scope.eventoDeportivo.tenantId = dataTenant.tenantId;
		  
		  dataFactory.altaEventoDeportivo($scope.eventoDeportivo)
	     	.then(function (data, status, headers, config) {
	                $scope.status = data.status;
	                console.log("Entre Alta Evento Deportivo");
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

