angular.module('eventosSGEM')
  .controller('perfilDeportistaCtrl', ['$scope','$state','dataFactory','dataTenant','objetos', 
                           function ($scope,$state, dataFactory,dataTenant,objetos) {
	
	  
	  $scope.deportista = objetos.getObjeto();
	  	  
	  $scope.fechaNacimiento = $scope.deportista.fechaNac;
	
 if(dataTenant.colorFondo!=null&&dataTenant.colorNews ){
		  
		  $('.PerfilNews').css({
			    background: "-webkit-gradient(linear, left top, left bottom,from("+dataTenant.colorFondo+"), to("+dataTenant.colorNews+"))" 
		  });
	  
	  }
	  
	  
	  $scope.cantOro = 0;
	  $scope.cantPlata = 0;
	  $scope.cantBronce = 0;
		  	 
	   var dt1 = new Date();
	   var dt2 = new Date($scope.fechaNacimiento);
	   var diff =(dt2.getTime() - dt1.getTime()) / 1000;  
	    diff /= (60 * 60 * 24);  
	    $scope.edad  = Math.abs(Math.round(diff/365.25));  
	 
	    
	    $scope.cargarDatos = function(){
	    	
	    	var contador = 0;
	    	
	    	for(var i = 0; i < 	$scope.deportista.listestadisticas.length; i++) {
	    	
	    		dataFactory.getCompetenciaPorEstadistica(dataTenant.tenantId,$scope.deportista.listestadisticas[i].estadisticaId)
				  .success(function (response, status, headers, config) {
					  
					  $scope.competencia = response;
					  
					  if($scope.competencia == null){
						  $scope.deportista.listestadisticas[contador].esPrimero = false;
						  $scope.deportista.listestadisticas[contador].esSegundo = false;
						  $scope.deportista.listestadisticas[contador].esTercero = false;
					  }else{
					  
						  var comites = [];
						  
						  for(var i = 0; i< $scope.competencia.deportistas.length; i++){
							  if(comites.indexOf($scope.competencia.deportistas[i].comite.pais.pais) == -1){
								  comites.push($scope.competencia.deportistas[i].comite.pais.pais);
							  }
						  }
						  
						  if($scope.competencia.tipoDeporte == "individual" && $scope.competencia.puesto == 1){
								
							  if($scope.competencia.deportistas.length > 2){
									
								if($scope.deportista.listestadisticas[contador].posicion == 1){
									$scope.deportista.listestadisticas[contador].esPrimero = true;
									$scope.deportista.listestadisticas[contador].esSegundo = false;
									$scope.deportista.listestadisticas[contador].esTercero = false;
									$scope.cantOro++;
								}else if($scope.deportista.listestadisticas[contador].posicion == 2){
									$scope.deportista.listestadisticas[contador].esPrimero = false;
									$scope.deportista.listestadisticas[contador].esSegundo = true;
									$scope.deportista.listestadisticas[contador].esTercero = false;
									$scope.cantPlata++;
								}else if($scope.deportista.listestadisticas[contador].posicion == 3){
									$scope.deportista.listestadisticas[contador].esPrimero = false;
									$scope.deportista.listestadisticas[contador].esSegundo = false;
									$scope.deportista.listestadisticas[contador].esTercero = true;
									$scope.cantBronce++;
								}else{
									$scope.deportista.listestadisticas[contador].esPrimero = false;
									$scope.deportista.listestadisticas[contador].esSegundo = false;
									$scope.deportista.listestadisticas[contador].esTercero = false;
								}		
								
							}else{// es mano a mano
								if($scope.deportista.listestadisticas[contador].posicion == 1){
									$scope.deportista.listestadisticas[contador].esPrimero = true;
									$scope.deportista.listestadisticas[contador].esSegundo = false;
									$scope.deportista.listestadisticas[contador].esTercero = false;
									$scope.cantOro++;
								}else{
									$scope.deportista.listestadisticas[contador].esPrimero = false;
									$scope.deportista.listestadisticas[contador].esSegundo = true;
									$scope.deportista.listestadisticas[contador].esTercero = false;
									$scope.cantPlata++;
								}
							}
									
						} else if($scope.competencia.tipoDeporte == "colectivo" && $scope.competencia.puesto == 1){
								
								if(comites.length > 2){
									
									if($scope.deportista.listestadisticas[contador].posicion == 1){
										$scope.deportista.listestadisticas[contador].esPrimero = true;
										$scope.deportista.listestadisticas[contador].esSegundo = false;
										$scope.deportista.listestadisticas[contador].esTercero = false;
										$scope.cantOro++;
									}else if($scope.deportista.listestadisticas[contador].posicion == 2){
										$scope.deportista.listestadisticas[contador].esPrimero = false;
										$scope.deportista.listestadisticas[contador].esSegundo = true;
										$scope.deportista.listestadisticas[contador].esTercero = false;
										$scope.cantPlata++;
									}else if($scope.deportista.listestadisticas[contador].posicion == 3){
										$scope.deportista.listestadisticas[contador].esPrimero = false;
										$scope.deportista.listestadisticas[contador].esSegundo = false;
										$scope.deportista.listestadisticas[contador].esTercero = true;
										$scope.cantBronce++;
									}else{
										$scope.deportista.listestadisticas[contador].esPrimero = false;
										$scope.deportista.listestadisticas[contador].esSegundo = false;
										$scope.deportista.listestadisticas[contador].esTercero = false;
									}
									
								}else{// es mano a mano
									
									if($scope.deportista.listestadisticas[contador].posicion == 1){
										$scope.deportista.listestadisticas[contador].esPrimero = true;
										$scope.deportista.listestadisticas[contador].esSegundo = false;
										$scope.deportista.listestadisticas[contador].esTercero = false;
										$scope.cantOro++;
									}else if($scope.deportista.listestadisticas[contador].posicion == 2){
										$scope.deportista.listestadisticas[contador].esPrimero = false;
										$scope.deportista.listestadisticas[contador].esSegundo = true;
										$scope.deportista.listestadisticas[contador].esTercero = false;
										$scope.cantPlata++;
									}else{
										$scope.deportista.listestadisticas[contador].esPrimero = false;
										$scope.deportista.listestadisticas[contador].esSegundo = false;
										$scope.deportista.listestadisticas[contador].esTercero = false;
									}
								}
	
							} else if ($scope.competencia.tipoDeporte == "individual" && $scope.competencia.puesto == 3 
									|| $scope.competencia.tipoDeporte == "colectivo" && $scope.competencia.puesto == 3){
								
								if($scope.deportista.listestadisticas[contador].posicion == 1){
									$scope.deportista.listestadisticas[contador].esPrimero = false;
									$scope.deportista.listestadisticas[contador].esSegundo = false;
									$scope.deportista.listestadisticas[contador].esTercero = true;
									$scope.cantBronce++;
								}else{
									$scope.deportista.listestadisticas[contador].esPrimero = false;
									$scope.deportista.listestadisticas[contador].esSegundo = false;
									$scope.deportista.listestadisticas[contador].esTercero = false;
								}
									
							}						  					  
				  	}
					  
					  
					  $scope.deportista.listestadisticas[contador].nombreDeporte = $scope.competencia.nombreDeporte
					  $scope.deportista.listestadisticas[contador].nombreDisciplina = $scope.competencia.nombreDisciplina
					  $scope.deportista.listestadisticas[contador].ronda = $scope.competencia.ronda
					  $scope.deportista.listestadisticas[contador].estadio = $scope.competencia.estadio
					  $scope.deportista.listestadisticas[contador].fecha = $scope.competencia.fecha
					  
					  if( $scope.competencia.tipoDeporte == "colectivo" &&  comites.length <= 2){
						  $scope.competidor1 = comites[0];
						  $scope.competidor2 = comites[1];
					  }else if($scope.competencia.tipoDeporte == "individual" && $scope.competencia.deportistas.length <= 2){
						  $scope.competidor1 = $scope.competencia.deportistas[0].nombre + " " + $scope.competencia.deportistas[0].apellido;
						  $scope.competidor2 = $scope.competencia.deportistas[1].nombre + " " + $scope.competencia.deportistas[1].apellido;
					  }
					  					  
					  contador++;
		      	  }).catch(function(error) {
		      		  console.log("Error al obtener competencia para la estadistica: "+ estadistica.estadisticaId);
		      	  });
	    		
	    	}
	    	
	    }
	    
  }]);
