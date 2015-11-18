'use strict';

angular.module('eventosSGEM')
  .controller('MainCtrl', ['$scope','$state','dataFactory','dataTenant','$timeout', 'sharedProperties',
                                     function ($scope, $state, dataFactory,dataTenant,$timeout,sharedProperties) {

  // console.log(dataTenant.tenantId);
   
   $scope.nombreTenant = dataTenant.nombre_url;
  
  $scope.confPerfil={};
   
   $("#TwitterWidget").show();
   $("#FacebookWidget").hide();   
   $("#youtubeContainer").hide(); 
   
   
   
   $("#YoutubeWidgetBtn").click(function(){
	   
	  
	   $("#FacebookWidget").hide();
	   $("#TwitterWidget").hide();
	   $("#youtubeContainer").show(); 
	   
   });
   $("#TwitterWidgetBtn").click(function(){
	   $("#youtubeContainer").hide(); 
	   $("#FacebookWidget").hide();
	   $("#TwitterWidget").show();
	   
   });
   $("#FacebookWidgetBtn").click(function(){
	   
	   $("#youtubeContainer").hide(); 
	   $("#TwitterWidget").hide();
	   $("#FacebookWidget").show();
	   
   });
   
   
   var ruta = '/resources/defecto/img/Tenant1/noBackground.png';
   var ruta2={};
  
   if (dataTenant.banner!=null){
	   
	 ruta = dataTenant.banner.ruta.substr(dataTenant.banner.ruta.indexOf("resources")) ;
   }
   
   if (dataTenant.fondo!=null){
	   
	   var ruta2 = dataTenant.fondo.ruta.substr(dataTenant.fondo.ruta.indexOf("resources")) ;
	   ruta2 = ruta2.replace(/\\/g,"/");
	  
	   $("body").css("background-image", "url('"+ruta2+"')");
   }
   else if (dataTenant.colorFondo != null){  
	 
	   $('body').css('background-color', dataTenant.colorFondo);
   }
   if (dataTenant.pagina!=null){
	   
		var ruta3 = dataTenant.pagina.ruta.substr(dataTenant.pagina.ruta.indexOf("resources")) ;
		$("#logonav").html(' <img  src="'+ruta3+'" alt="Inicio" style="height:50px;padding:2px;" />');
   }
   
   else if (dataTenant.colorNews != null){  
		 
	   $('.PerfilNews').css('background-color', dataTenant.colorNews);
   }  
   $("#imgBanner").html('<img  src="'+ruta+'" alt="Recurso no encontrado" style=" display: block; width: 100%;  height: 100%;" />');
   
//   $scope.$on('$viewContentLoaded', function() {
 
	$scope.cargarWidgets = function() {
		
	   /**TWITTER***/
	   !function(d,s,id){
		   var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';
		   if(!d.getElementById(id))
		   {
			   js=d.createElement(s);js.id=id;
			   js.src=p+"://platform.twitter.com/widgets.js";
			   fjs.parentNode.insertBefore(js,fjs);
			   }
		   }(document,"script","twitter-wjs");
		   
		    
	   
	   /*****/
		   
		   /**FACEBOOK**/
		   
			  
		   
				   
		   (function(d, s, id) {
			     var js, fjs = d.getElementsByTagName(s)[0];
			     if (d.getElementById(id)) return;
			     js = d.createElement(s); js.id = id;
			     js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5";
			     fjs.parentNode.insertBefore(js, fjs);
			   }(document, 'script', 'facebook-jssdk'));
		  
		   
		   
		   
		   try{
			   $timeout = twttr.widgets.load(); 
		       FB.XFBML.parse(); 
		   }catch(ex){
			   console.log(ex);
		   }
		   /****/
	}
	
	
//////Youtube
	
		
	
	
	
		$.ajax({

            url: "https://www.googleapis.com/youtube/v3/search?key=AIzaSyCMIlK4EWwV1jBYRgMulke3cN0g6MKXih4&channelId=UCmp42s1dVuavyzhY0L-9CFw&part=snippet,id&order=date&maxResults=6",

            
            contentType: "application/json; charset=utf-8",
            dataType: "jsonp",
            responseType: "jsonp",
            success:
           function (data) {
               
             
             $.each(data.items, function(i, item) {	
            	if(item.id.kind !="youtube#channel"){
            	 var image = "<a href='https://www.youtube.com/watch?v="+item.id.videoId+"'><img style='display:block; margin:auto;' src='"+item.snippet.thumbnails.medium.url+"' alt='...' width='196px' height='110px'></a>";
            	 var titleLink = "<a href='https://www.youtube.com/watch?v="+item.id.videoId+"'><span >"+item.snippet.title+"</span></a>";
            	 var description = "<p>"+item.snippet.description+"</p>";
            	 var merge = "<div class='col-sm-5 col-md-12'style='display:inline-block; margin:auto;text-align: center; border-bottom: solid #e62f27 1px;padding:3px;'>" +image+"" +titleLink+"</br>"+description +"</div>";
            	 $("#youtubeContainer").append(merge)
            	}
             });
              
           },

        });
		
		

	
		$scope.redirectNoticia = function(novedad){
			
			 $state.go('Novedad', {tenant: $scope.nombreTenant,idnovedad:novedad.id});		
			 
			
		}
	
	
	
	$scope.column = function(col) {
		
		var size = (col==1)?6:12;
		return size;
	
	}; 
	   var noticias;
	   dataFactory.getNovedades(dataTenant.tenantId)
		  	  .then(function (response) {          
	          
		  		$scope.noticias = response.data;
		  		sharedProperties.setNovedades($scope.noticias);
		  		
		  		
		  		
//		  		if ( noticias.length == 0 ) {
//		  			
//		  			$("#newsWrapper").html("<h1>No existen novedades actualmente!</h1>");
//		  			console.log("etnntre");
//		  		}else {
//		  			
//		  			
//		  			$scope.noticias = response;
		  			
//		  			$("#newsWrapper").html("");
//		  			 $.each(noticias, function(i, item) {	
//		  					appendNews(((item.columna)),item.imagen.ruta,item.titulo,item.id);
//		  			 });
//		  			
//		  				
//	  				$.each($('.reloadimg'), function(j, item2) {	
//	  					setTimeout(function(){
//		  					var d = new Date();
//		  					$(this).attr('src', $(this).attr('src')+'?'+d.getTime());
//	  					},500+j*500);
//			 	 		});	
//		  		  
		  			
		  			
//		  		}  		  
		  		
		  		  
	      }).catch(function(response){
	          // Si ha habido errores llegamos a esta parte
	        	console.log(response); 
	        });
	   function appendNews(col,image,titulo,id){
			
		   var size = (col==1)?6:12;
		   
		   
			  var Html = "<div class='col-sm-5 col-md-"+(size)+"'> <div class='thumbnail'>"+"<img class='reloadimg' src='"+image.substr(image.indexOf("resources"))+"' alt='...' style='height:400px!important'><div class='caption'>" +"<h3>"+titulo+"</h3>"+"<p><a  class='btn btn-primary' role='button'>Button</a> </p></div></div></div>";
			   
			   
			  $("#newsWrapper").append(Html).fadeIn('slow');
			  
		  };
		  
		  
	   
//   });
   
  
	  
	  
	  
	  
	  
	  
	  
	// alert(Noticias);
	 /* var Noticias = [
	                   {"image":"http://1.bp.blogspot.com/-cejBwHSVGWU/UB8yOBAIGOI/AAAAAAAAAKQ/iFJ82hcjKBg/s1600/debora+rodriguez.jpg", "title":"Debora salio a correr","col":"8"},
	                   {"image":"http://imagenes.montevideo.com.uy/imgnoticias/201507/_W620/513237.jpg", "title":"Plantel Titular de Uruguay","col":"4"},
	                   {"image":"http://1.bp.blogspot.com/-cejBwHSVGWU/UB8yOBAIGOI/AAAAAAAAAKQ/iFJ82hcjKBg/s1600/debora+rodriguez.jpg", "title":"Debora Gano Medalla","col":"4"},
	                   {"image":"http://imagenes.montevideo.com.uy/imgnoticias/201507/_W620/513237.jpg", "title":"Uruguay Campeon!!","col":"8"},
	               ]; */
	 
   
  }]);
