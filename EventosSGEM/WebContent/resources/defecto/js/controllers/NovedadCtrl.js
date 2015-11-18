'use strict';

angular.module('eventosSGEM')
  .controller('NovedadCtrl', ['$scope','$state','dataFactory','dataTenant','$stateParams', 'sharedProperties',
                                     function ($scope, $state, dataFactory,dataTenant,$stateParams,sharedProperties) {

	  $scope.column = function(col) {
			
			var size = (col==1)?6:12;
			return size;
		
		}; 
   
   $scope.nombreTenant = dataTenant.nombre_url;
  
  
   $stateParams.idnovedad;
   
   
   
   
   var novedad = sharedProperties.getSingleNovedad($stateParams.idnovedad);
   
   if (jQuery.isEmptyObject(novedad)){
	   
	   dataFactory.getNovedad($stateParams.idnovedad)
    	.then(function (response) {
             
    	
    		$scope.n = response.data;
    		
    		
               
           })
           .catch(function(response){
               // Si ha habido errores llegamos a esta parte
           	console.log(response); 
           	
           });
   }
   else
	   $scope.n = novedad;
   
   
   $scope.existeNovedad = function (){
	   
		  return !(jQuery.isEmptyObject($scope.n));  
		   
		   
	   };
   
  }]);
