'use strict';

angular.module('eventosSGEM')
  .controller('NovedadCtrl', ['$scope','$state','dataFactory','dataTenant','$stateParams', 'sharedProperties',
                                     function ($scope, $state, dataFactory,dataTenant,$stateParams,sharedProperties) {

	  $scope.column = function(col) {
			
			var size = (col==1)?6:12;
			return size;
		
		}; 
   
   $scope.nombreTenant = dataTenant.nombre_url;
  
  
   $scope.idnovedad = $stateParams.idnovedad;
   
   
   $scope.loadwidget = function(){
	   
	(function(d, s, id) {
		   var js, fjs = d.getElementsByTagName(s)[0];
		   if (d.getElementById(id)) return;
		   js = d.createElement(s); js.id = id;
		   js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5";
		   fjs.parentNode.insertBefore(js, fjs);
		 }(document, 'script', 'facebook-jssdk'));
	  try{
		   
	       FB.XFBML.parse(); 
	   }catch(ex){
		   console.log(ex);
	   }
	   
   }
   
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
