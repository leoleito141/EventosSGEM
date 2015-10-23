'use strict';

angular.module('eventosSGEM')
  .controller('MainCtrl', ['$scope','$state','dataFactory','dataTenant', 
                                     function ($scope, $state, dataFactory,dataTenant) {

   console.log(dataTenant.tenantId);
   
   $scope.nombreTenant = dataTenant.nombre_url;
  
   $scope.confPerfil={};
	  
	  
	  var Noticias = [
	                   {"image":"http://1.bp.blogspot.com/-cejBwHSVGWU/UB8yOBAIGOI/AAAAAAAAAKQ/iFJ82hcjKBg/s1600/debora+rodriguez.jpg", "title":"Debora salio a correr","col":"8"},
	                   {"image":"http://imagenes.montevideo.com.uy/imgnoticias/201507/_W620/513237.jpg", "title":"Plantel Titular de Uruguay","col":"4"},
	                   {"image":"http://1.bp.blogspot.com/-cejBwHSVGWU/UB8yOBAIGOI/AAAAAAAAAKQ/iFJ82hcjKBg/s1600/debora+rodriguez.jpg", "title":"Debora Gano Medalla","col":"4"},
	                   {"image":"http://imagenes.montevideo.com.uy/imgnoticias/201507/_W620/513237.jpg", "title":"Uruguay Campeon!!","col":"8"},
	               ]; 
	  function appendNews(col,image,titulo){
		  
		  var Html = "<div class='col-sm-5 col-md-"+col+"'> <div class='thumbnail'>"+"<img src='"+image+"' alt='...'><div class='caption'>" +"<h3>"+titulo+"</h3>"+"<p><a href='#' class='btn btn-primary' role='button'>Button</a> <a href='#' class='btn btn-default' role='button'>Button</a></p></div></div></div>";
		   
		   
		  $("#newsWrapper").append(Html);
		  
	  };

	 
	  $.each(Noticias, function(i, item) {
		    //alert(data[i].PageName);
		  
		  appendNews(item.col,item.image,item.title);
		  
		});

	  
	  
	  
	/*  $("#ConfigPerfil").click(function(){
		  
		  $("#formPerfil").show( "slow");
		  
	  });
	  
	 $("#hue-demo").minicolors({
		    changeDelay: 200,
		    position:'bottom right',
		    format: 'rgb',
		    
		    change: function(value, opacity) {
		        console.log(value + ' - ' + opacity);
		        $("#newsWrapper").css("background-color", value);
		  
		        
		        
		        
		       // $('#fondito').children().css('opacity', 1);
		    }
		});
	 $("#BannerColor").minicolors({
		    changeDelay: 200,
		    position:'bottom right',
		    format: 'rgb',
		    opacity :'true',
		    change: function(value, opacity) {
		        console.log(value + ' - ' + opacity);
		        $(".bannerPerfil").css("background-color", value);
		        $(".bannerPerfil").css("opacity", opacity);
		    }
		});
	 $("#inputLugar").minicolors({
		    changeDelay: 200,
		    position:'bottom right',
		    change: function(value, opacity) {
		        console.log(value + ' - ' + opacity);
		        $(".TituloPerfil").css("background-color", value);
		    }
		});
	 
	 
	

	 
	 
	 $(".PerfilNews").css("background-color", "#FFFFFF");
	 */
	  $scope.perfil={image:'resources/defecto/img/tenant1/logo.png',titulo:'La concha de tu madre'};
	  	    
	 // console.log($scope.puto);
	  
	/*  $(".bannerPerfil").css("background-color", "#0A2880");
	  $(".bannerPerfil").css("background-color", "red");
	 */
	 
	  $(".PerfilContent").css("background","url('http://farm3.staticflickr.com/2832/12303719364_c25cecdc28_b.jpg') fixed");
	  /*
	  $scope.guadrarPerfil = function(){
		  
		  alert(JSON.stringify($scope.confPerfil));
	  };
		*/  
   
  }]);
