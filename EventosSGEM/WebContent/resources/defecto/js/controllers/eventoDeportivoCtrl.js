angular.module('eventosSGEM')
  .controller('EventDeportivoCtrl', ['$scope','dataFactory','dataTenant', 
                           function ($scope, dataFactory,dataTenant) {
	
	  $scope.eventoDeportivo={};
	  console.log($scope.eventoDeportivo);
	  
	  
	  $scope.$on('$viewContentLoaded' , function(){
          $('#datetimepicker2').datetimepicker({
        	  locale: 'es'	 
        	  
        	});
          $("#datetimepicker2").on("dp.change", function (e) {
        	  $scope.eventoDeportivo.fechaFin = e.date;
              
          });
          $('#datetimepicker1').datetimepicker({
        	  locale: 'es'
        	  
        	});
          $("#datetimepicker1").on("dp.change", function (e) {
        	  $scope.eventoDeportivo.fechaInicio = e.date;
              
          });
          
          

	  });
	  
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

