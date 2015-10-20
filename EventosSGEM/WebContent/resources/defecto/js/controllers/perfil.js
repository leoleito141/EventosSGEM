'use strict';

angular.module('pruebaAngularApp')
  .controller('PerfilCtrl',['$scope','$modal','dataFactory', 
                            function($scope,$modal,dataFactory) {
   
	 
	  $scope.perfil={image:'http://www.candombe.com.uy/images/bandera.jpg',titulo:'La concha de tu madre'};
	  	    
	 // console.log($scope.puto);
	  
	  $(".bannerPerfil").css("background-color", "#0A2880");
	  $(".bannerPerfil").css("background-color", "red");
	  $(".PerfilNews").css("background-color", "#0A2880");
	  
	//  $(".PerfilContent").css("background","url('http://farm3.staticflickr.com/2832/12303719364_c25cecdc28_b.jpg') fixed");
		 
		  
	  

  }]);
