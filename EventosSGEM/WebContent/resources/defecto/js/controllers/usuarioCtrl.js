'use strict';

angular.module('eventosSGEM')
  .controller('UsuarioCtrl', ['$scope','$state','$auth','dataFactory','dataTenant',// 'googlechart', 'googlechart-docs',
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
	  
	   
	  angular.element(document).ready(function () {
		/// cargar esto en on run.. si la vista que viene es usoSitio.html
		  if($auth.isAuthenticated() ){
			  		  
			  dataFactory.obtenerHistorial(dataTenant.tenantId).
				then(function (response, status, headers, config) {
					$scope.historial = response.data;
					
					// imagino que el evento empezo en el 01/10/2015

					var fecha_inicio = new Date("2015/10/01");
					
					 var d1 = new Date($scope.historial[0].fecha);
					 var d2 = new Date($scope.historial[1].fecha);
					 var d3 = new Date($scope.historial[2].fecha);
					 var d4 = new Date($scope.historial[3].fecha);
					
					 
					 //diferencia en semanas
					 $scope.semanas = Math.round((d4-fecha_inicio)/ 604800000);
					 
				alert(			d1.getDate() + '/' + (d1.getMonth()+1) + '/' + d1.getFullYear()
								+ " ------------- " +
								d2.getDate() + '/' + (d2.getMonth()+1) + '/' +d2.getFullYear()
								+ " ------------- " +
								d3.getDate() + '/' + (d3.getMonth()+1) + '/' + d3.getFullYear()
								+ " ------------- " +
								d4.getDate() + '/' + (d4.getMonth()+1) + '/' + d4.getFullYear()
								+ " ------------- " +
								"Semanas : "+ $scope.semanas);
				
			
				
				
				
				  // usar 
			      
			     var semanas = $scope.semanas;
			   
		    	  for(var i= 0; i< semanas ; i++){
//		    		  $scope.rows[0].c[i].v[i] = "Semana"+i;
		    		  
//		    		  
//		    		  var c = [];
//		    		  
//		    		  var v = { id: "v", value: "Semana"+i };
//		    		  c.push(v);
		    		  
		    		  $scope.rows[0].c[i].push({ id: "v", value: "Semana"+i });
		    		  for(var j= 0; i< 2 ; i++){//cant datos a mostrar
		    			  
		    		  }
		    	  }
				
				
				
				
				
				
				
				
				
				
				
				
				
				}).catch(function(response){
					console.log(response);
				})
		  }
		});
	  
	  
	  $scope.rows = [];
	  $scope.rows.c = [];
	  $scope.rows.c.v = [];
	  
	  
	  // Properties
      $scope.chartObject = {};

      //Methods
      $scope.hideSeries = hideSeries;
      
      init();

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
              "cols": [{
                  id: "semana",
                  label: "semana",
                  type: "string"
              }, {
                  id: "usuarios",
                  label: "Usuarios",
                  type: "number"
              }
//              , {
//                  id: "desktop-id",
//                  label: "Desktop",
//                  type: "number"
//              }, {
//                  id: "server-id",
//                  label: "Server",
//                  type: "number"
//              }, {
//                  id: "cost-id",
//                  label: "Shipping",
//                  type: "number"
//              }
          ],
              "rows": //$scope.rows
            	  [{
                  c: [{
                      v: "January"
                  }, {
                      v: 19,
                      f: "42 items"
                  }
//                  ,{
//                      v: 12,
//                      f: "Ony 12 items"
//                  }, {
//                      v: 7,
//                      f: "7 servers"
//                  }, {
//                      v: 4
//                  }
              ]
              }, {
                  c: [{
                      v: "February"
                  }, {
                      v: 152
                  }
//                  , {
//                      v: 1,
//                      f: "1 unit (Out of stock this month)"
//                  }, {
//                      v: 12
//                  }, {
//                      v: 2
//                  }
//              ]
//
//              }, {
//                  c: [{
//                      v: "March"
//                  }, {
//                      v: 24
//                  }
////                  ,{
////                      v: 5
////                  }, {
////                      v: 11
////                  }, {
////                      v: 6
////                  }
              ]
              }]
          };
          
          //Estilos y titulos
          $scope.chartObject.options = {
              "title": "Logins en funcion de semanas",
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
                  "title": "Semanas"
              }
          };

          $scope.chartObject.view = {
              columns: [0, 1 ]//, 2, 3, 4]
          };
      }
	  
	  
	  
	  
	  
	  
	  
   
	  
	  
  }]);
