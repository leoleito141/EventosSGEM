angular.module('eventosSGEM')
  .controller('EventMultiDeportivoCtrl', ['$scope','dataFactory','dataTenant', 
                           function ($scope, dataFactory,dataTenant) {
	
	  
 $scope.DataEstilo={};
 
 
 $scope.nombreTenant = dataTenant.nombre_url;
 
	  $scope.$on('$viewContentLoaded', function() {
		  
		  $scope.DataEstilo.FondoNovedades = '#bd0f0f';
		  
		  var fondoNovedadesColor = ($scope.DataEstilo.FondoNovedades == "")?'#FFFFFF': $scope.DataEstilo.FondoNovedades;
		  var fondoBgColor = ($scope.DataEstilo.FondoBg == "")?'#FFFFFF': $scope.DataEstilo.FondoBg;
		  
		
		
		  $("#FondoNovedades").attr('value',fondoNovedadesColor);		  
		  $("#FondoBg").attr('value',fondoBgColor);		  
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
	        
	  $scope.subirImagen = function(){			  
			  
			  $scope.cargando = true;	
			  $scope.co = {};
			  var banner = $scope.fotoBanner;
			  var fondo = $scope.fotoFondo;
			  var pagina = $scope.fotoLogo;
			  
			  if((banner != null)&&(fondo!=null)&&(pagina !=null)){
				  
				  dataFactory.subirImagenConf(banner,fondo,pagina,dataTenant.tenantId).
					then(function (response, status, headers, config) {
						console.log(response.data);
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
						 
						dataFactory.guardarConfiguracion($scope.co).
						then(function(response, status, headers, config){
							
						console.log("imagen guardada");							
						localStorage.removeItem('tenantActual');
							
						}).catch(function (response){
							consoe.log(response);
						});
					}).catch(function(response){
						console.log("error en prueba");
					});
			  
			  }else{
				  console.log("Imagen null");
			  } 
		  };
	  
	  
	  
  }]);

