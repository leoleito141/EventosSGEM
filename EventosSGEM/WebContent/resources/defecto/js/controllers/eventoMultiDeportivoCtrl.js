angular.module('eventosSGEM')
  .controller('EventMultiDeportivoCtrl', ['$scope','dataFactory','dataTenant','$state', '$timeout','$document','$stateParams',
                           function ($scope, dataFactory,dataTenant,$state,$timeout,$document,$stateParams) {
	

 $scope.DataEstilo={}; 
 
 $scope.nombreTenant = dataTenant.nombre_url;
 $scope.DataEstilo.FondoNovedades = dataTenant.colorNews;
 $scope.DataEstilo.FondoBg = dataTenant.colorFondo;

 if(dataTenant.colorFondo!=null&&dataTenant.colorNews ){
	  
	  $('.PerfilNews').css({
		    background: "-webkit-gradient(linear, left top, left bottom,from("+dataTenant.colorFondo+"), to("+dataTenant.colorNews+"))" 
	  });
 
 }
 
  $scope.paso1 = function(){
	  $state.go('formEdicionEvento.Paso1', { tenant: $scope.nombreTenant } );
	  var someElement = angular.element(document.querySelector('.coolbtn'))
	  $document.scrollToElement(someElement, 30, 1000);
 }   
 
 $scope.paso2 = function(){
	  $state.go('formEdicionEvento.Paso2', { tenant: $scope.nombreTenant } );
	  var someElement = angular.element(document.querySelector('.coolbtn'))
	  $document.scrollToElement(someElement, 30, 1000);
 }   
 
 $scope.paso3 = function(){
	  $state.go('formEdicionEvento.Paso3', { tenant: $scope.nombreTenant } );
	  var someElement = angular.element(document.querySelector('.coolbtn'))
	  $document.scrollToElement(someElement, 30, 1000);
 }   
 
 
 
 $scope.widget = {};
	  $scope.$on('$viewContentLoaded', function() {		  
		  		  
		  
		  
		  var fondoNovedadesColor = ($scope.DataEstilo.FondoNovedades == "")?'#FFFFFF': $scope.DataEstilo.FondoNovedades;
		  
		  var fondoBgColor = ($scope.DataEstilo.FondoBg == "")?'#FFFFFF': $scope.DataEstilo.FondoBg;
		
		  $("#FondoNovedades").attr('value',$scope.DataEstilo.FondoNovedades);	
		  
		  $("#FondoBg").attr('value',$scope.DataEstilo.FondoBg);	
		  
		  $("#PreviewColor").css("background-color", $("#FondoNovedades").attr('value'));
		  
		  $("#PreviewColorBg").css("background-color", $("#FondoBg").val());
		  
		  $("#FondoNovedades").minicolors({
			    changeDelay: 200,
			    position:'bottom right',
			    format: 'rgb',		    
			    change: function(value, opacity) {
			        console.log(value + ' - ' + opacity);
			        $("#PreviewColor").css("background-color", value);
			        $scope.DataEstilo.FondoNovedades = value;
			       // $(".PerfilNews").css("background-color", value);
			    }
		});
		  
		  $("#FondoBg").minicolors({
			    changeDelay: 200,
			    position:'bottom right',
			    format: 'rgb',		    
			    change: function(value, opacity) {
			        console.log(value + ' - ' + opacity);
			        $("#PreviewColorBg").css("background-color", value);
			        $scope.DataEstilo.FondoBg = value;
			       
			        
			    }
		});
		  
		  $("#fileBanner").change(function(){
			    readURL(this);			  
			});
		  $("#fileFondo").change(function(){
			    readURL(this);			 
			});
		  $("#filePagina").change(function(){
			    readURL(this);
			});
		  
		  function readURL(input) {
			  	
			    if (input.files && input.files[0]) {
			        var reader = new FileReader();
			        reader.onload = function (e) {
			            $('#foto'+input.id).attr('src', e.target.result);
			        }

			        reader.readAsDataURL(input.files[0]);
			    }
			}
	  });
	        
	  $scope.preview = function(){
		  
		  $('.PerfilNews').css({
			    background: "-webkit-gradient(linear, left top, left bottom,from("+$scope.DataEstilo.FondoBg+"), to("+$scope.DataEstilo.FondoNovedades+"))" 
		  });
		  
		  //$(".PerfilNews").css("background-color",  "background: linear-gradient(to right bottom, "+$scope.DataEstilo.FondoBg+","+ $scope.DataEstilo.FondoNovedades+")");
	 }
	  
	  $scope.subirImagen = function(){			  
			  
			  $scope.cargando = true;	
			  
			  $scope.co = {};
			  
			  var banner = $scope.fotoBanner;
			  
			  var fondo = $scope.fotoFondo;
			  
			  var pagina = $scope.fotoLogo;
			  
			  if((banner != null)&&(fondo!=null)&&(pagina !=null))
			  {
				  
				  dataFactory.subirImagenConf(banner,fondo,pagina,dataTenant.tenantId).
					then(function (response, status, headers, config){
						console.log(response.data);
						localStorage.removeItem('tenantActual');	
						var banner = {};
						 banner.mime = response.data[0].mime;
						 banner.ruta = response.data[0].ruta;
						 banner.tenantId = response.data[0].tenantId;
						
						 var fondo = {};
						 fondo.mime = response.data[1].mime;
						 fondo.ruta = response.data[1].ruta;
						 fondo.tenantId = response.data[1].tenantId;
						 
						 var pagina = {};
						 pagina.mime = response.data[2].mime;
						 pagina.ruta = response.data[2].ruta;
						 pagina.tenantId = response.data[2].tenantId;
						  
						 $scope.co.tenantId = dataTenant.tenantId;
						 $scope.co.banner = banner;
						 $scope.co.fondo = fondo;
						 $scope.co.pagina = pagina;
						 
						 $scope.co.colorFondo = $scope.DataEstilo.FondoBg;
						 $scope.co.colorNews = $scope.DataEstilo.FondoNovedades;
						 
						 $scope.co.widgetFacebook=$scope.widget.nombreFacebook;
						 $scope.co.widgetInstagram=$scope.widget.hashtagInstaram;
						 $scope.co.widgetYoutube=$scope.widget.channelId;
						 $scope.co.widgetTwitter=$scope.widget.idHashtag;
						 
						 
						dataFactory.guardarConfiguracion($scope.co).
						then(function(response, status, headers, config){
							
						console.log("imagen guardada");							
						  
						 dataFactory.getDataTenant($stateParams.tenant)
					      .then(
					          function (dataTenant) { 
					        	  
					        	  $body = $("body");
					        	  $body.addClass("loading"); 
					        	  
					        	  $timeout(function() {					        	  
					        		  $body = $("body");
									  $body.removeClass("loading");
					        		  $state.go('main', { tenant: $scope.nombreTenant } );
					        	  }, 3000);
					          }
				          );
						
							
						}).catch(function (response){
							console.log(response);
						});
					}).catch(function(response){
						console.log("error en prueba");
					});
				 
				  
			  }else{				  
				  console.log("Imagen null");
				  
			  } 
			  
		
		  };
	  
	  
	  
  }]);

