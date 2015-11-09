'use strict';

angular.module('eventosSGEM')
  .controller('ResultadoCtrl', ['$scope','$state','$auth','dataFactory','dataTenant',
                                     function ($scope, $state, $auth, dataFactory, dataTenant) {
 
   $scope.nombreTenant = dataTenant.nombre_url;   
   $scope.mensajeValidacion = "";   
   
   $scope.competenciaSeleccionada = {};
   
   $scope.objetosCombo = [];   
   $scope.posiciones = [];
   
   $scope.estadisticas = [];
   $scope.estadistica = {};
      
   var juez = (JSON.parse(localStorage.getItem("dataUsuario")));   	

   $scope.listarCompetenciasPendientes = function(){
	   dataFactory.listarCompetenciasPendientes(dataTenant.tenantId,juez.usuarioId).
	   		then(function (response, status, headers, config) {	
			
				$scope.competencias = response.data;			
//				console.log($scope.competencias);
				
			}).catch(function(response){
				$scope.mensajeValidacion = "Error obteniendo competencias pendientes.";
			});
	 
   };
  
   $scope.setCompetenciaSeleccionada = function(idCompetencia){
	   if($scope.competencias.length != 0){
		   
		   $scope.limpiarDatos(true);
		   
		   var indice = -1;
		   for(var i = 0; i < $scope.competencias.length; i++) {
			    if ($scope.competencias[i].idCompetencia === idCompetencia) {
			    	indice = i;
			        break;
			    }
			}
		   $scope.competenciaSeleccionada = $scope.competencias[indice];
		   
		   if($scope.competenciaSeleccionada.tipoDeporte == 'individual'){//cargo deportistas
			 
			   for(var i = 0; i < $scope.competenciaSeleccionada.deportistas.length; i++) {				    
				   $scope.objetosCombo.push({'nombre' : $scope.competenciaSeleccionada.deportistas[i].nombre + " " + 
			   											$scope.competenciaSeleccionada.deportistas[i].apellido});
			   }
			   
			   for(var i = 0; i < $scope.objetosCombo.length; i++) {
				   $scope.posiciones.push(i+1);
			   }
			   
		   }else{//cargo paises
			   
			   var paises = [];
			   
			   for(var i = 0; i < $scope.competenciaSeleccionada.deportistas.length; i++) {				    
				   if(paises.indexOf($scope.competenciaSeleccionada.deportistas[i].pais) == -1){					   
					   paises.push($scope.competenciaSeleccionada.deportistas[i].pais);
				   }
			   }
			   
			   for(var i = 0; i < paises.length; i++) {				    
				  $scope.objetosCombo.push({'nombre' : paises[i] });
			   }
			   
			   for(var i = 0; i < $scope.objetosCombo.length; i++) {
				   $scope.posiciones.push(i+1);
			   }
		   }
		   
		   $scope.estadistica.participante = $scope.objetosCombo[0];
		   $scope.estadistica.posicion = $scope.posiciones[0];
		   
//		   $state.go("altaResultado.paso2"); 
		   
	   }else{
		   $scope.mensajeValidacion = "No hay competencias!";
	   }
   };
   
   
   $scope.agregarEstadistica = function(){	 
	   if(!$scope.habilitar()){
//		   $scope.estadistica.tenantId = dataTenant.tenantId;
		   var e = {};
		   e.tenantId = dataTenant.tenantId;
		   e.posicion = $scope.estadistica.posicion;
		   e.participante = $scope.estadistica.participante.nombre;
		   e.datoInformativo = $scope.estadistica.datoInformativo;
		   
		   $scope.estadisticas.push(e);
		   
		   // calculo las estadisticas y posiciones que quedan	   	
		   var indice = $scope.objetosCombo.indexOf($scope.estadistica.participante);	   
		   $scope.objetosCombo.splice(indice,1);// quito el participante que ya tiene estadistica.	   
		   $scope.posiciones.shift(); // remuevo el primero
		   	   
		   if($scope.objetosCombo.length != 0){
			   $scope.estadistica.participante = $scope.objetosCombo[0];
			   $scope.estadistica.posicion = $scope.posiciones[0];			   
			   $scope.estadistica.datoInformativo = null;	   
		   }else{
			   $scope.estadistica = {};
		   }
	   }
   };
   
   
   $scope.altaResultado = function(){	 
	   if($scope.estadisticas.length != 0){
		   
		   var resultado = {};
		   
		   resultado.tenantId = dataTenant.tenantId;
		   resultado.estadisticas = $scope.estadisticas;
		   resultado.competencia = $scope.competenciaSeleccionada;
		   
		   dataFactory.altaResultado(resultado).
		   		then(function (response, status, headers, config) {	
						
					console.log(response);
					$scope.estadisticas = [];
					$scope.limpiarDatos(false);
					
				}).catch(function(response){
					$scope.mensajeValidacion = "Error al agregar nuevo resultado.";
				});
		   
		   
	   }else{
		   $scope.mensajeValidacion = "No hay estadisticas!";
	   }
	   
   };
   
   $scope.habilitar = function() {		  
	  if($scope.objetosCombo == undefined){
		  return false;
	  }
	  return ($scope.objetosCombo.length <= 0) || 
  			 ($scope.estadistica.datoInformativo == null || $scope.estadistica.posicion == null || $scope.estadistica.participante == null);	
   };
   
   $scope.limpiarDatos = function(siguiente){
	   if(!siguiente && $scope.estadisticas.length == 0){
		   $scope.competenciaSeleccionada = {};	   
		   $scope.objetosCombo = [];   
		   $scope.posiciones = [];
		   $scope.estadisticas = [];
		   $scope.estadistica = {};
		   
		   $state.go("altaResultado.paso1"); 
	   }else if (siguiente){
		   $scope.competenciaSeleccionada = {};	   
		   $scope.objetosCombo = [];   
		   $scope.posiciones = [];
		   $scope.estadisticas = [];
		   $scope.estadistica = {};
	   }
   };
	
   
   
	  
  }]);
