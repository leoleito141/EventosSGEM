'use strict';

angular.module('eventosSGEM')
  .controller('InstagramCtrl', ['$scope','$state','dataFactory','dataTenant','$stateParams', 'sharedProperties',
                                     function ($scope, $state, dataFactory,dataTenant,$stateParams,sharedProperties) {

	 
	  $(".fancybox").fancybox({
		   'transitionIn'	:	'elastic',
			'transitionOut'	:	'elastic',
			'speedIn'		:	600, 
			'speedOut'		:	200, 
			'overlayShow'	:	false
  
  } );
	  
	  $.ajax({
			 url: "https://api.instagram.com/v1/tags/Rio2016/media/recent?access_token=790945602.ab103e5.7ba83bd16c2649ada72d96fb4da31ae8",
			 //https://api.instagram.com/v1/tags/Rio2016?access_token=790945602.ab103e5.7ba83bd16c2649ada72d96fb4da31ae8
			// 
	         contentType: "application/json; charset=utf-8",
	         dataType: "jsonp",
	         responseType: "jsonp",
	         success:
	        function (dataInta) {
	        	 
	        	 var length = ( dataInta.length < 9 )?dataInta.length:9;
	        	 
	        	 for (var i = 0; (i < length); i++) { 
	        		 
	        		 var imagen = "<img src='"+dataInta.data[i].images.low_resolution.url+"'>";
	            	 
	            	 var title = "<a href='"+dataInta.data[i].link+"'> Ir a instagram </a>";
	            	 
	            	 var linkglobal = "<div class='col-md-4' '> <a class='fancybox' rel='insta' title='<a href=\" "+dataInta.data[i].link+" \">Ir a instagram</a> ' href='"+dataInta.data[i].images.standard_resolution.url+"'  >"+imagen+"</a></div>";
	            	 
	        		 $("#instagramFeed").append(linkglobal);
	        		   
	        		}
	        	 
	        	 
	         }
		
		
		
		
		});
   
  }]);
