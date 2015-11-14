'use strict';

angular.module('eventosSGEM')
  .controller('MainCtrl', ['$scope','$state','dataFactory','dataTenant', 
                                     function ($scope, $state, dataFactory,dataTenant) {

   console.log(dataTenant.tenantId);
   
   $scope.nombreTenant = dataTenant.nombre_url;
  
   $scope.confPerfil={};
	  
   $scope.confPerfil={};
   
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
   
		   
		   
		   
   $("#imgBanner").html('<img  src="'+ruta+'" alt="Recurso no encontrado" style=" display: block; width: 100%;  height: 100%;" />');
   
   
   var noticias;
   dataFactory.getNovedades(dataTenant.tenantId)
	  	  .then(function (response) {          
          
	  		  noticias = response.data;
	  		  
	  		if ( noticias.length == 0 ) {
	  			
	  			$("#newsWrapper").append("<h1>No existen novedades actualmente!</h1>");
	  			console.log("etnntre");
	  		}else {
	  			
	  			 $.each(noticias, function(i, item) {	
	  					appendNews(((item.columna)*2),item.imagen.ruta,item.titulo);
	 	 		
	  			 
	  			 
	  			 });
	  			
	  				
  				$.each($('.reloadimg'), function(j, item2) {	
  					setTimeout(function(){
	  					var d = new Date();
	  					$(this).attr('src', $(this).attr('src')+'?'+d.getTime());
  					},500+j*500);
		 	 		});	
	  		  
	  			
	  			
	  		}  		  
	  		
	  		  
      }).catch(function(response){
          // Si ha habido errores llegamos a esta parte
        	console.log(response); 
        });
	  
	  
	  
	  
	  
	  
	  
	// alert(Noticias);
	 /* var Noticias = [
	                   {"image":"http://1.bp.blogspot.com/-cejBwHSVGWU/UB8yOBAIGOI/AAAAAAAAAKQ/iFJ82hcjKBg/s1600/debora+rodriguez.jpg", "title":"Debora salio a correr","col":"8"},
	                   {"image":"http://imagenes.montevideo.com.uy/imgnoticias/201507/_W620/513237.jpg", "title":"Plantel Titular de Uruguay","col":"4"},
	                   {"image":"http://1.bp.blogspot.com/-cejBwHSVGWU/UB8yOBAIGOI/AAAAAAAAAKQ/iFJ82hcjKBg/s1600/debora+rodriguez.jpg", "title":"Debora Gano Medalla","col":"4"},
	                   {"image":"http://imagenes.montevideo.com.uy/imgnoticias/201507/_W620/513237.jpg", "title":"Uruguay Campeon!!","col":"8"},
	               ]; */
	  function appendNews(col,image,titulo){
		  
		  var Html = "<div class='col-sm-5 col-md-"+(col)*2+"'> <div class='thumbnail'>"+"<img class='reloadimg' src='"+image.substr(image.indexOf("resources"))+"' alt='...' style='height:400px!important'><div class='caption'>" +"<h3>"+titulo+"</h3>"+"<p><a href='#' class='btn btn-primary' role='button'>Button</a> <a href='#' class='btn btn-default' role='button'>Button</a></p></div></div></div>";
		   
		   
		  $("#newsWrapper").append(Html).fadeIn('slow');
		  
	  };
   
  }]);
