angular.module('eventosSGEM')
  .controller('perfilDeportistaCtrl', ['$scope','$state','dataFactory','dataTenant','objetos', 
                           function ($scope,$state, dataFactory,dataTenant,objetos) {
	
	 
	  $scope.deportista = objetos.getObjeto();
	  
	  
	  $scope.fechaNacimiento = $scope.deportista.fechaNac;
	
		  
	 
	   var dt1 = new Date();
	   var dt2 = new Date($scope.fechaNacimiento);
	   var diff =(dt2.getTime() - dt1.getTime()) / 1000;  
	    diff /= (60 * 60 * 24);  
	    $scope.edad  = Math.abs(Math.round(diff/365.25));  
	      
	  
		  
		  
  }]);
