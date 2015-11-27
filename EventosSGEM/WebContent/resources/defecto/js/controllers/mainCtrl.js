'use strict';

angular.module('eventosSGEM')
  .controller('MainCtrl', ['$scope','$state','dataFactory','dataTenant','$timeout', 'sharedProperties','TenantLoader',
                                     function ($scope, $state, dataFactory,dataTenant,$timeout,sharedProperties,TenantLoader) {

  // console.log(dataTenant.tenantId);
  
	  
		 
		
  $scope.nombreTenant = dataTenant.nombre_url;
   
  $scope.confPerfil={};
  
  (dataTenant.widgetFacebook!=null)? dataTenant.widgetFacebook :"" ;  
  
  if(dataTenant.colorFondo!=null&&dataTenant.colorNews ){
	  
	  $('.PerfilNews').css({
		    background: "-webkit-gradient(linear, left top, left bottom,from("+dataTenant.colorFondo+"), to("+dataTenant.colorNews+"))" 
	  });
  
  }  
 if( TenantLoader.getTenant()){
	 
	 localStorage.removeItem('tenantActual');	
	 TenantLoader.setTenant(false);
 }
  
  
  $scope.facebookUrl=(dataTenant.widgetFacebook!=null)? dataTenant.widgetFacebook :"" ;               //"Facebook";
  $scope.Hastag=    (dataTenant.widgetInstagram!=null)?dataTenant.widgetInstagram:"";				  //"Rio2016";
  $scope.idHashtag=   (dataTenant.widgetTwitter!=null)?dataTenant.widgetTwitter:"";  			      //"666003012909998085";
  $scope.channelId=(dataTenant.widgetYoutube!=null)? dataTenant.widgetYoutube:"";    				  //UCmp42s1dVuavyzhY0L-9CFw
  //if esta seteado lo cambio
  
  
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
 
   
    $("#player").attr('src',"https://www.youtube.com/embed/M7lc1UVf-VE")  ;
   
   
	$scope.cargarWidgets = function() {
		
		if($scope.idHashtag!=""&&$scope.facebookUrl!=""){
		
			$("#WidgetTwitter").attr('data-widget-id',$scope.idHashtag);
			$("#facebookWidget").attr('data-href','https://www.facebook.com/'+$scope.facebookUrl);
			
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
			   /**YOUTUBE**/		   
				
				$.ajax({
	
		            url: "https://www.googleapis.com/youtube/v3/search?key=AIzaSyCMIlK4EWwV1jBYRgMulke3cN0g6MKXih4&channelId="+$scope.channelId+"&part=snippet,id&order=date&maxResults=6",
	
		            
		            contentType: "application/json; charset=utf-8",
		            dataType: "jsonp",
		            responseType: "jsonp",
		            success:
		           function (data) {
		               
		             
		             $.each(data.items, function(i, item) {	
		            	if(item.id.kind !="youtube#channel"){
		            	 var image = "<a href='https://www.youtube.com/watch?v="+item.id.videoId+"'><img style='display:block; margin:auto;' src='"+item.snippet.thumbnails.medium.url+"' alt='...' width='196px' height='110px'></a>";
		            	// var titleLink = "<a href='https://www.youtube.com/watch?v="+item.id.videoId+"'><span >"+item.snippet.title+"</span></a>";
		            	 
		            	 var titleLink = "<a  onclick='loadplayer("+item.id.videoId+")'><span >"+item.snippet.title+"</span></a>";
		            	 var description = "<p>"+item.snippet.description+"</p>";
		            	 var merge = "<div class='col-md-12'style=' background-color: #f8f8f8;margin:auto;text-align: center; border-bottom: solid #e62f27 1px;padding:3px;'>" +image+"" +titleLink+"</br>"+description +"</div>";
		            	 $("#youtubeContainer").append(merge)
		            	}
		             });
		              
		           },
	
		        });
		}
	else {
		  
		  $("#SocialMedia").html("");
		 
		  $("#SocialMedia").css("background-color","grey");
		  $("#SocialMedia").html("<h1 style='heigth:50%'>Hay uno o mas widget sin configurar</h1>");
		  
		  
	  }   
	}
	
	
	$scope.redirectNoticia = function(novedad){
			
		$state.go('Novedad', {tenant: $scope.nombreTenant,idnovedad:novedad.id});		
			 
			
	};
	
	var ultimaCol ;
	
	var coloque;
	$scope.cssclass= "";
	
	$scope.column = function() {
		
		if (ultimaCol == 2){
			
			ultimaCol=1;
			
			coloque=false;
			$scope.cssclass = 'col-sm-5 col-md-6';
		}
		else if (ultimaCol == 1 && !(coloque)){
			
			ultimaCol=1;
			
			$scope.coloque=true;
			$scope.cssclass = 'col-sm-5 col-md-6';
		}
		else if(ultimaCol == 1 && coloque) {
			
			ultimaCol=2;
			
			coloque=false;
			$scope.cssclass = 'col-sm-5 col-md-12';
			
		}else{
			
			ultimaCol=2;			
			coloque=false;
			$scope.cssclass = 'col-sm-5 col-md-6';
			
		}
	
	}; 
	   var noticias;
	   dataFactory.getNovedades(dataTenant.tenantId)
		  	  .then(function (response) {          
	          
		  		$scope.noticias = response.data;
		  		sharedProperties.setNovedades($scope.noticias);  
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
