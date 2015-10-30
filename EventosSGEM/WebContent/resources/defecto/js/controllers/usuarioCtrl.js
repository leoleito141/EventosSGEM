'use strict';

angular.module('eventosSGEM')
  .controller('UsuarioCtrl', ['$scope','$state','$auth','dataFactory','dataTenant',
                                     function ($scope, $state, $auth, dataFactory,dataTenant) {
 
//   console.log(dataTenant.tenantId);
   const usuario_comun = "UsuarioComun";
   const usuario_juez = "Juez";
   const usuario_comite = "ComiteOlimpico";
   const usuario_organizador = "Organizador";	  
   
   $scope.customStyle.background= 'url(resources/defecto/img/tenant1/' + dataTenant.login_back_img +')fixed';
   
   $scope.nombreTenant = dataTenant.nombre_url;
   $scope.usuario = {};
   
   $scope.comite={};   
   
   $scope.mensajeValidacion = "";   
   
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
	             $scope.usrLogin.email = $scope.usuario.email;
	             $scope.usuario.password="";
	             
	             var payLoad = $auth.getPayload();             
	             var dataUsuario = payLoad.dataUsuario;
	            
	             // ver bien si es en el local o session...
	             localStorage.setItem("dataUsuario", JSON.stringify(dataUsuario));  // localStorage.getItem("dataUsuario") para obtenerlo
	             	             
	             if(dataUsuario.tipoUsuario == usuario_comun){ 
	            	 event.preventDefault();
	            	 $state.go('main', { tenant: $scope.nombreTenant } );
	             }else if (dataUsuario.tipoUsuario == usuario_comite){
	            	 event.preventDefault();
	            	 $state.go('altaNovedad', { tenant: $scope.nombreTenant} );
	             }else if(dataUsuario.tipoUsuario == usuario_juez){
	            	 event.preventDefault();
	            	 $state.go('main', { tenant: $scope.nombreTenant } );
	             }else if(dataUsuario.tipoUsuario == usuario_organizador){
	            	 event.preventDefault();
	            	 $state.go('usoSitio', { tenant: $scope.nombreTenant } );
	             }
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
 	
 	$scope.altaComite = function(){
		  
		  $scope.comite.tenantId = dataTenant.tenantId;
			  
		  dataFactory.altaComite($scope.comite)
	     	.then(function (data, status, headers, config) {
	                $scope.status = data.status;
	                console.log("Entre Alta comite");
	                console.log(data.status);
	                console.log(status);
	                console.log(headers);
	                console.log(config);
	                
	            })
	            .catch(function(response){
	                // Si ha habido errores llegamos a esta parte
	            	console.log(response); 
	            });
	  };
	  
	  $scope.dataColumna = {
		 valores: [
		   {id: '1', valor: 1},
		   {id: '2', valor: 2}
		 ],
		 selectedOption: {id: '1', valor: 1} 
	  };
	  
	  $scope.deshabilitado = function(){		  
		  if($scope.novedad == undefined){
			  return true;
		  }
		  return ($scope.novedad.titulo == null || $scope.novedad.descripcion == null || $scope.myFile == null);	
	  }
	  
	  $scope.altaNovedad = function(){
		  $scope.cargando = true;		  
		  var foto = $scope.myFile;
		  
		  if(foto != null){
			  
			  dataFactory.subirImagen(foto,dataTenant.tenantId).
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
					$scope.cargando = false;
					$scope.mensajeValidacion = "Error al subir im\u00E1gen de la novedad. Contacte con soporte.";
				});
		  
		  }else{
			  $scope.mensajeValidacion = "Debe seleccionar una im\u00E1gen, para la novedad.";
			  $scope.cargando = false;
		  }
		  
	  }; // cierra altaNovedad
	  
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
        		  // debería ser fecha inicio del evento hasta hoy.
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
	    
	  
	  
  }]);
