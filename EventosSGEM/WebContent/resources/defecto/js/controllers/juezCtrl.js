angular.module('eventosSGEM')
  .controller('JuezCtrl', ['$scope','dataFactory','dataTenant', 
                           function ($scope, dataFactory,dataTenant) {
	
	  $scope.juez={}; 
	  $scope.nombreTenant = dataTenant.nombre_url;
	  
	  if(dataTenant.colorFondo!=null&&dataTenant.colorNews ){
		  
		  $('.PerfilNews').css({
			    background: "-webkit-gradient(linear, left top, left bottom,from("+dataTenant.colorFondo+"), to("+dataTenant.colorNews+"))" 
		  });
	  
	  }

	  $scope.altaJuez = function(){
			  
		  $scope.juez.tenantId = dataTenant.tenantId;			 
			  
		  dataFactory.altaJuez($scope.juez)
	     	.then(function (data, status, headers, config) {
	     		$state.go('main', { tenant: $scope.nombreTenant } );
            })
            .catch(function(response){
                // Si ha habido errores llegamos a esta parte
            	console.log(response); 
            });
			  
			  
			  
	  }; 
		  
}]);