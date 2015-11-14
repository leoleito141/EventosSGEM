'use strict';

angular.module('eventosSGEM')
  .controller('UsuarioCtrl', ['$scope','$state','$auth','dataFactory','dataTenant','dataMensajes',
                                     function ($scope, $state, $auth, dataFactory,dataTenant,dataMensajes) {
 
   const usuario_comun = "UsuarioComun";
   const usuario_juez = "Juez";
   const usuario_comite = "ComiteOlimpico";
   const usuario_organizador = "Organizador";	  
   
   $scope.nombreTenant = dataTenant.nombre_url;
   $scope.usuario = {};
   
   $scope.comite={}; 
   $scope.co={};
   
   if(dataMensajes.mensaje != null && dataMensajes.mensaje != ""){
	   $scope.mensajeValidacion = dataMensajes.mensaje;
   }else{
	   $scope.mensajeValidacion = "";   
   }
   
   $scope.loginUsuario = function () {
  	     $scope.cargando = true;
  	     
	   	 setTimeout( function(){	  
	   		var usuario = $scope.usuario;
	     
	        $auth.login({
	            email: usuario.email,
	            password: btoa(usuario.password), // base 64
	            tenantId : dataTenant.tenantId
	        })
	        .then(function (data){           
	             $scope.usuario.password="";
	             dataMensajes.add("");
	             var payLoad = $auth.getPayload();             
	             var dataUsuario = payLoad.dataUsuario;
	            
	             // ver bien si es en el local o session...
	             localStorage.setItem("dataUsuario", JSON.stringify(dataUsuario));  // localStorage.getItem("dataUsuario") para obtenerlo
	             	             
//	             if(dataUsuario.tipoUsuario == usuario_comun){ 
//	            	 event.preventDefault();
//	            	 $state.go('main', { tenant: $scope.nombreTenant } );
//	             }else if (dataUsuario.tipoUsuario == usuario_comite){
//	            	 event.preventDefault();
//	            	 $state.go('altaNovedad', { tenant: $scope.nombreTenant} );
//	             }else if(dataUsuario.tipoUsuario == usuario_juez){
//	            	 event.preventDefault();
//	            	 $state.go('altaResultado.paso1', { tenant: $scope.nombreTenant } );
//	             }else if(dataUsuario.tipoUsuario == usuario_organizador){
//	            	 event.preventDefault();
//	            	 $state.go('usoSitio', { tenant: $scope.nombreTenant } );
//	             }
	             $state.go('main', { tenant: $scope.nombreTenant } );
	             
	         })
	         .catch(function(error){
	
	       		console.log(error);
	       		console.log(error.status);
	       		if(error.status == 404){
	       		  $scope.cargando = false;
	       		  $scope.mensajeValidacion = "Email o contrase\u00F1a incorrecta.";
	       		}else{
	       		  $scope.cargando = false;
	       		  $scope.mensajeValidacion = "Error al autenticar usuario.";
	       		}
	         });
	        
	    }, 1000); //espera 1 segundo
	};
   
   
   /********************************** USUARIO COMUN **********************************/
   
   $scope.altaUsuarioComun = function () {
	  $scope.cargando = true;
	  setTimeout( function(){	
		  		  
		  var usuarioComun = $scope.usuario;
	      usuarioComun.tenantId = dataTenant.tenantId;
	      usuarioComun.password = btoa(usuarioComun.password);
	      console.log("entre insertar" + usuarioComun);
	       
	      dataFactory.altaUsuarioComun(usuarioComun)
	      	.success(function (response, status, headers, config) {
	              if(response){
	            	  	event.preventDefault(); //NO ANDA EN MOZILLA...
						$state.go('login', { tenant: $scope.nombreTenant});//le agrega el tenant a la url, para no tener que buscar devuelta el datatenant
	              }else{
	            	  $scope.cargando = false;
	            	  $scope.mensajeValidacion = "Error al registrar usuario.";
	              }
	      	}).catch(function(error,status) {
	      		
	      		console.log(error);
	      		console.log(status);
	      		if(status == 302){
	      		  $scope.cargando = false;
	      		  $scope.mensajeValidacion = "El usuario con email: '"+usuarioComun.email + "' ya existe en el sistema.";
	      		}else{
	      		  $scope.cargando = false;
	      		  $scope.mensajeValidacion = "Error al registrar usuario.";
	      		}
	      	});
			  
	  }, 1000); //espera 1 segundo
     
   	};
   
 	
 	/********************************** COMITE OLIMPICO **********************************/
 		  
   		/**** Novedad ****/
	  
	  $scope.dataColumna = {
		 valores: [
		   {id: '1', valor: 1},
		   {id: '2', valor: 2}
		 ],
		 selectedOption: {id: '1', valor: 1} 
	  };	  
	  
	  $scope.deshabilitarFormNovedad = function(){		  
		  if($scope.novedad == undefined){
			  return true;
		  }
		  return ($scope.novedad.titulo == null || $scope.novedad.descripcion == null || $scope.myFile == null);	
	  }
	  
	  $scope.altaNovedad = function(){
		   $scope.cargando = true;		  
		  var foto = $scope.myFile;
		  if($auth.isAuthenticated()){
			  if(foto != null){
				  
				  dataFactory.subirImagenNovedad(foto,dataTenant.tenantId).
					then(function (response, status, headers, config) {
						
						  var imagen = {};
						  imagen.mime = response.data.mime;
						  imagen.ruta = response.data.ruta;
						  imagen.tenantId = response.data.tenantId;
						  
						  var novedad = $scope.novedad; 
						  novedad.tenantId = dataTenant.tenantId;
						  novedad.columna = $scope.dataColumna.selectedOption.valor;
						  novedad.emailComiteOlimpico = (JSON.parse(localStorage.getItem("dataUsuario"))).email;
						  novedad.imagen = imagen;
						  
						  dataFactory.altaNovedad(novedad)
					     	.then(function (response, status, headers, config) {
					     		if(response){
					     			event.preventDefault();
					            	$state.go('main', { tenant: $scope.nombreTenant} );
					     		}else{
					     			$scope.cargando = false;
					       			$scope.mensajeValidacion = "Error al crear la novedad. Contacte con soporte.";
					     		}	                
					        })
					        .catch(function(response){      				        	
					        	if(response.status == 404){
					        		$scope.cargando = false;
					        		$scope.mensajeValidacion = "No se pudieron validar sus credenciales. La novedad no se crear\u00E1. Contacte con soporte.";
					       		}else{
					       			$scope.cargando = false;
					       			$scope.mensajeValidacion = "Error al crear la novedad. Contacte con soporte.";
					       		}	        	
					        });
			  
					}).catch(function(response){
						if(response.status == 498){ // mandar a que se loguee.. en todos los catch debería ir.
						
							$state.go('login', { tenant: $scope.nombreTenant});
						}else{
							$scope.cargando = false;
							$scope.mensajeValidacion = "Error al subir im\u00E1gen de la novedad. Contacte con soporte.";
						}
						
					});
			  
			  }else{
				  $scope.cargando = false;
				  $scope.mensajeValidacion = "Debe seleccionar una im\u00E1gen, para la novedad.";
			  }
			  
			  
			  
		  }else{
			  
			  dataMensajes.add("Sesion Caducada");
			  $scope.mensajeValidacion = dataMensajes.getMensaje();
			  $state.go('login', { tenant: $scope.nombreTenant});
			  
		  }
		  
	  }; // cierra altaNovedad
	  
	  /********************************** ORGANIZADOR **********************************/
	  
	  $scope.deshabilitarFormComite = function(){		  
		  if($scope.comite == undefined){
			  return true;
		  }
		  return ($scope.comite.email == null || $scope.comite.password == null || $scope.comite.pais == null 
				  || $scope.comite.codigo == null ||$scope.comite.facebook == null ||$scope.comite.twitter == null || 
				  $scope.myFile == null);	
	  }
	  
	  $scope.altaComite = function(){
		  $scope.cargando = true;	
		  var foto = $scope.myFile;
		  
		  if(foto != null){
			  
			  dataFactory.subirImagenComite(foto,dataTenant.tenantId).
				then(function (response, status, headers, config) {
				
					 var logo = {};
					 logo.mime = response.data.mime;
					 logo.ruta = response.data.ruta;
					 logo.tenantId = response.data.tenantId;
					  
					 $scope.comite.tenantId = dataTenant.tenantId;
					 $scope.comite.logo = logo;
					  
					 dataFactory.altaComite($scope.comite)
				     	.then(function (data, status, headers, config) {				              
				                event.preventDefault();
				            	$state.go('main', { tenant: $scope.nombreTenant} );
				            })
			            .catch(function(response){
							if(response.status == 404){
				        		$scope.cargando = false;
				        		$scope.mensajeValidacion = "No se pudieron validar sus credenciales. El comit\u00e9 Ol\u00edmpico no se crear\u00E1. Contacte con soporte.";
				       		}else if(status == 302){
				      			$scope.cargando = false;
				      			$scope.mensajeValidacion = "El comite con codigo: '"+ $scope.comite.codigo + "' ya existe en el sistema.";
				       		}else{
				       			$scope.cargando = false;
				       			$scope.mensajeValidacion = "Error al crear comit\u00e9 Ol\u00edmpico. Contacte con soporte.";
				       		}
			            });					
					
				}).catch(function(response){
					$scope.cargando = false;
					$scope.mensajeValidacion = "Error al subir logo del comite Ol\u00edmpico. Contacte con soporte.";
				});				
				
		  }else{
			  $scope.cargando = false;		
			  $scope.mensajeValidacion = "Debe seleccionar una im\u00E1gen, para el logo del cmite Ol\u00edmpico.";
		  }			 
	  };
	  
	  
	  	/**** Reporte de uso de sitio web ****/
	  
	  if($auth.isAuthenticated() && (JSON.parse(localStorage.getItem("dataUsuario"))).tipoUsuario == usuario_organizador){
			  		  
		  dataFactory.obtenerHistorial(dataTenant.tenantId).
			then(function (response, status, headers, config) {
				
				var historial = response.data;
			    var nombreMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "June",
			                       "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
				var rows = [];
				var c;	
				var col;
				var v;
				var total;
				for(var i= 0; i< historial.length ; i++){
					
					c = [];	
					col;
					v;
					total;
								
					// Usuarios Comunes
					v = { v : nombreMeses[historial[i].mes-1] };						  
					c.push(v)
					
					total = historial[i].cant_comunes;
					v = { v: total }; // f: "blalba"
					c.push(v)
					
					// Comites
					total = historial[i].cant_comites;
					v = { v: total }; 					  
					c.push(v)						
					
					// Jueces
					total = historial[i].cant_jueces;
					v = { v: total };					  
					c.push(v)		
					
					col = { c: c};						
					
					rows.push(col);
					
				}
				
				$scope.rows = rows;
			    init();

			}).catch(function(response){
				$scope.mensajeValidacion = "Error obteniendo historial de logins.";
			})
		  
		  
		  dataFactory.obtenerCantidadRegistrados(dataTenant.tenantId).
			then(function (response, status, headers, config) {
				
				$scope.cantRegistrados = response.data;
				
			}).catch(function(response){
				$scope.mensajeValidacion = "Error obteniendo cantidad de usuario registrados.";
			})
	  }

	  // Propiedades
      $scope.chartObject = {};

      //Metodos
      $scope.hideSeries = hideSeries; 

      function hideSeries(selectedItem) {
          var col = selectedItem.column;
          if (selectedItem.row === null) {
              if ($scope.chartObject.view.columns[col] == col) {
                  $scope.chartObject.view.columns[col] = {
                      label: $scope.chartObject.data.cols[col].label,
                      type: $scope.chartObject.data.cols[col].type,
                      calc: function() {
                          return null;
                      }
                  };
                  $scope.chartObject.options.colors[col - 1] = '#CCCCCC';
              }
              else {
                  $scope.chartObject.view.columns[col] = col;
                  $scope.chartObject.options.colors[col - 1] = $scope.chartObject.options.defaultColors[col - 1];
              }
          }
      }
           
      function init() {
          $scope.chartObject.type = "LineChart";
          $scope.chartObject.displayed = false;
          $scope.chartObject.data = {
              "cols": [	  {
			                  id: "semana",
			                  label: "semana",
			                  type: "string"
			              }, {
			                  id: "usuarios",
			                  label: "Usuarios",
			                  type: "number"
			              }
			              , {
			                  id: "Comites",
			                  label: "Comites Olimpicos",
			                  type: "number"
			              }
			              , {
			                  id: "Jueces",
			                  label: "Jueces",
			                  type: "number"
			              }             
		              ],
		              
              "rows": $scope.rows
          };
          
          //Estilos y titulos
          $scope.chartObject.options = {
              "title": "Logins en funcion de meses",
              "colors": ['#0000FF', '#009900', '#CC0000', '#DD9900'],
              "defaultColors": ['#0000FF', '#009900', '#CC0000', '#DD9900'],
              "isStacked": "true",
              "fill": 20,
              "displayExactValues": true,
              "vAxis": {
                  "title": "Logins de Usuarios",
                  "gridlines": {
                      "count": 10
                  }
              },
              "hAxis": {
                  "title": "Meses"
              }
          };

          $scope.chartObject.view = {
              columns: [0, 1 ,2, 3]
          };
      }
   ////////////////////////Prueba ImagenConf  ////// 
      $scope.pruebaImagenConf  = function(){
		  	  
		  var banner = $scope.myFileBanner;
		  var fondo  = $scope.myFileFondo;
		  var pagina = $scope.myFilePagina;
			  if(banner != null && fondo != null && pagina != null){
				  
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
						dataFactory.altaConfiguracion($scope.co).
						then(function(response, status, headers, config){
							console.log("imagen guardada");
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
	   /////////////////////////////////////////////// 
	  
	  
  }]);
