'use strict';

angular.module('eventosSGEM')
  .controller('InstagramCtrl', ['$scope','$state','dataFactory','dataTenant','$stateParams', 'sharedProperties',
                                     function ($scope, $state, dataFactory,dataTenant,$stateParams,sharedProperties) {
	  
	  
	  $scope.widgetInstagram=(dataTenant.widgetInstagram!=null)? dataTenant.widgetInstagram :"" ;   
	 
	  $(".fancybox").fancybox({
		   'transitionIn'	:	'elastic',
			'transitionOut'	:	'elastic',
			'speedIn'		:	600, 
			'speedOut'		:	200, 
			'overlayShow'	:	false
  
  } );
	  if(dataTenant.colorFondo!=null&&dataTenant.colorNews ){
		  
		  $('.PerfilNews').css({
			    background: "-webkit-gradient(linear, left top, left bottom,from("+dataTenant.colorFondo+"), to("+dataTenant.colorNews+"))" 
		  });
	  
	  }
	  
	  if($scope.widgetInstagram != ""){
	  $.ajax({
			 url: "https://api.instagram.com/v1/tags/"+ $scope.widgetInstagram+"/media/recent?access_token=790945602.ab103e5.7ba83bd16c2649ada72d96fb4da31ae8",
			 //https://api.instagram.com/v1/tags/Rio2016?access_token=790945602.ab103e5.7ba83bd16c2649ada72d96fb4da31ae8
			// 
	         contentType: "application/json; charset=utf-8",
	         dataType: "jsonp",
	         responseType: "jsonp",
	         success:
	        function (dataInta) {
	        	 
	        	 var length = ( dataInta.length < 9 )?dataInta.length:9;
	        	 var data=[];
	        	 for (var i = 0; (i < 20); i++) { 
	        		 
	        		 var imagen = "<img src='"+dataInta.data[i].images.low_resolution.url+"'>";
	            	 
	            	 var title = "<a style='text-decoration:none' href='"+dataInta.data[i].link+"'> Ir a instagram </a>";
	            	 
	            	 var linkglobal = "<div class='col-md-4' '> <a class='fancybox' rel='insta' title='<a href=\" "+dataInta.data[i].link+" \">Ir a instagram</a> ' href='"+dataInta.data[i].images.standard_resolution.url+"'  >"+imagen+"</a></div>";
	            	 
	            	 data.push({img: dataInta.data[i].images.standard_resolution.url, thumb: dataInta.data[i].images.low_resolution.url,caption:title});
	        		// $("#instagramFeed").append(imagen);
	        		   
	        		}
	        	 
	        	  $('.fotorama').fotorama({
	        		    data: data
	        		  });
	        	 
	        	 
	         }
		
		
		
		
		});
	  }else {
		  
		  $('.fotorama').html("<h1> EL Widget de instagram no esta configurado</h1>")
		  
	  }   
  }]);
