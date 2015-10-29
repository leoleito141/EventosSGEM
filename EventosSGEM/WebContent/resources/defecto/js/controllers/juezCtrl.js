angular.module('eventosSGEM')
  .controller('JuezCtrl', ['$scope','dataFactory','dataTenant', 
                           function ($scope, dataFactory,dataTenant) {
	
	  $scope.juez={};  

$scope.altaJuez = function(){
			  
			  $scope.juez.tenantId = dataTenant.tenantId;
			 
			  
			  dataFactory.altaJuez($scope.juez)
		     	.then(function (data, status, headers, config) {
		                $scope.status = data.status;
		                console.log("Entre Alta Juez");
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