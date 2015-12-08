'use strict';

angular.module('eventosSGEM')
  .controller('ResultadoCtrl', ['$scope','$state','$auth','dataFactory','dataTenant','dataMensajes',
                                     function ($scope, $state, $auth, dataFactory, dataTenant,dataMensajes) {
 
	  if(dataTenant.colorFondo!=null&&dataTenant.colorNews ){
		  
		  $('.PerfilNews').css({
			    background: "-webkit-gradient(linear, left top, left bottom,from("+dataTenant.colorFondo+"), to("+dataTenant.colorNews+"))" 
		  });
	  
	  }
   const tipo_colectivo = "colectivo";
   const tipo_individual = "individual";
	  
   $scope.nombreTenant = dataTenant.nombre_url;   
   $scope.mensajeValidacion = "";   
   
   $scope.competenciaSeleccionada = {};
   
   $scope.objetosCombo = [];   
   $scope.posiciones = [];
   
   $scope.estadisticas = [];
   $scope.estadistica = {};
      
   var juez = (JSON.parse(localStorage.getItem("dataUsuario")));   	

   $scope.listarCompetenciasPendientes = function(){
	   if($auth.isAuthenticated()){
		   dataFactory.listarCompetenciasPendientes(dataTenant.tenantId,juez.usuarioId).
		   		then(function (response, status, headers, config) {	
				
					$scope.competencias = response.data;	
					
					/*** adaptar a rutas relativas las fotos de los participantes ***/
					for(var i = 0;i < $scope.competencias.length; i++){
						for(var j = 0;j < $scope.competencias[i].deportistas.length; j++){
							var ruta = $scope.competencias[i].deportistas[j].foto.ruta.substr($scope.competencias[i].deportistas[j].foto.ruta.indexOf("resources")) ;
			      			$scope.competencias[i].deportistas[j].foto.ruta = ruta;
			      			 
			      			ruta = $scope.competencias[i].deportistas[j].comite.logo.ruta.substr($scope.competencias[i].deportistas[j].comite.logo.ruta.indexOf("resources")) ;
			      			$scope.competencias[i].deportistas[j].comite.logo.ruta = ruta;
						}
					}
				}).catch(function(response){
					$scope.mensajeValidacion = "Error obteniendo competencias pendientes.";
				});
	   }else {
		  localStorage.removeItem("dataUsuario");
		  dataMensajes.add("Sesion Caducada");
		  $scope.mensajeValidacion = dataMensajes.getMensaje();
		  $state.go('login', { tenant: $scope.nombreTenant});
	   }
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
		   
		   if($scope.competenciaSeleccionada.tipoDeporte == tipo_individual){//cargo deportistas
			 
			   for(var i = 0; i < $scope.competenciaSeleccionada.deportistas.length; i++) {				    
				   $scope.objetosCombo.push({'id': $scope.competenciaSeleccionada.deportistas[i].deportistaID, 
					   						'nombre' : $scope.competenciaSeleccionada.deportistas[i].nombre + " " + 
			   										   $scope.competenciaSeleccionada.deportistas[i].apellido,
			   								 'foto'  : $scope.competenciaSeleccionada.deportistas[i].foto.ruta		   
   											});
			   }
			   
			   for(var i = 0; i < $scope.objetosCombo.length; i++) {
				   $scope.posiciones.push(i+1);
			   }
			   
		   }else{//cargo paises
			   
			   var paises = [];
			   var comites = [];
			   for(var i = 0; i < $scope.competenciaSeleccionada.deportistas.length; i++) {				    
				   if(paises.indexOf($scope.competenciaSeleccionada.deportistas[i].comite.pais.pais) == -1){					   
					   paises.push($scope.competenciaSeleccionada.deportistas[i].comite.pais.pais);
					   comites.push($scope.competenciaSeleccionada.deportistas[i].comite.comiteId);
				   }
			   }
			   
			   for(var i = 0; i < paises.length; i++) {				    
				  $scope.objetosCombo.push({ 'id' : comites[i],
					  						 'nombre' : paises[i]
		  									});
			   }
			   
			   for(var i = 0; i < $scope.objetosCombo.length; i++) {
				   $scope.posiciones.push(i+1);
			   }
		   }
		   
		   $scope.estadistica.objeto = $scope.objetosCombo[0];
		   $scope.estadistica.posicion = $scope.posiciones[0];
		   $scope.actualizarFoto(); 
		   $scope.cantParticipantes = $scope.objetosCombo.length == null ? 0 : $scope.objetosCombo.length;
	   }else{
		   $scope.mensajeValidacion = "No hay competencias!";
	   }
   };
   
   
   $scope.agregarEstadistica = function(){	 
	   if(!$scope.habilitarAceptar()){
		   		   
		   if($scope.competenciaSeleccionada.tipoDeporte == tipo_individual){
			   var e = {};
			   e.tenantId = dataTenant.tenantId;
			   e.posicion = $scope.estadistica.posicion;
			   e.datoInformativo = $scope.estadistica.datoInformativo;		   			   
			   
			   for(var i = 0; i <  $scope.competenciaSeleccionada.deportistas.length; i++) {	
				   var dep = $scope.competenciaSeleccionada.deportistas[i];
				   if(dep.deportistaID == $scope.estadistica.objeto.id){
					   e.deportista = $scope.competenciaSeleccionada.deportistas[i];			   
					   break;
				   }
			   }		   		  
			   
			   $scope.estadisticas.push(e);
			   
		   }else{			   
			   
			   for(var i = 0; i <  $scope.competenciaSeleccionada.deportistas.length; i++) {					   
				   if($scope.competenciaSeleccionada.deportistas[i].comite.pais.pais == $scope.estadistica.objeto.nombre){
					   var e = {};
					   e.tenantId = dataTenant.tenantId;
					   e.posicion = $scope.estadistica.posicion;
					   e.datoInformativo = $scope.estadistica.datoInformativo;
					   e.deportista = $scope.competenciaSeleccionada.deportistas[i];		
					   $scope.estadisticas.push(e)
				   }				   
			   }	
			   
		   }
		   
		   //busco indice del objeto a remover en el combo.
		   for(var i = 0; i <  $scope.objetosCombo.length; i++) {	
			   var obj = $scope.objetosCombo[i];
			   if(obj.id == $scope.estadistica.objeto.id){		
				   $scope.objetosCombo.splice(i,1); // quito el participante que ya tiene la estadistica.	   
				   break;
			   }
		   }  		   
		   
		   var indicePos = $scope.posiciones.indexOf($scope.estadistica.posicion);	   
		   $scope.posiciones.splice(indicePos,1);// quito la posicion que ya tiene la estadistica.	
		   if($scope.objetosCombo.length != 0){
			   $scope.estadistica.objeto = $scope.objetosCombo[0];
			   $scope.estadistica.posicion = $scope.posiciones[0];			   
			   $scope.estadistica.datoInformativo = null;	   
			   $scope.actualizarFoto();  	   
		   }else{
			   $scope.estadistica = {};
		   }
		   		   
	   }
   };
   
   
   $scope.altaResultado = function(){	 
	   if($auth.isAuthenticated()){
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
	   }else{		 
		   	localStorage.removeItem("dataUsuario");
			dataMensajes.add("Sesion Caducada");
			$scope.mensajeValidacion = dataMensajes.getMensaje();
			$state.go('login', { tenant: $scope.nombreTenant});
	   }
	   
   };
   
   $scope.habilitarAceptar = function() {		  
	  if($scope.objetosCombo == undefined){
		  return false;
	  }
	  return ($scope.objetosCombo.length <= 0) || 
  			 ($scope.estadistica.datoInformativo == null || $scope.estadistica.posicion == null || $scope.estadistica.objeto == null);	
   };
   
   $scope.habilitarFinalizar = function() {		  
		  if($scope.objetosCombo == null || $scope.posiciones == null){
			  return false;
		  }
		  return $scope.posiciones.length != 0 && $scope.objetosCombo.length != 0;	
	};
   
   $scope.limpiarDatos = function(siguiente){
	   if(!siguiente && $scope.estadisticas.length == 0){
		   $scope.competenciaSeleccionada = {};	   
		   $scope.objetosCombo = [];   
		   $scope.posiciones = [];
		   $scope.estadisticas = [];
		   $scope.estadistica = {};
		   $scope.imagenSeleccionada = {};
		   $scope.cantParticipantes = 0;
		   $state.go("altaResultado.paso1"); 
	   }else if (siguiente){
		   $scope.competenciaSeleccionada = {};	   
		   $scope.objetosCombo = [];   
		   $scope.posiciones = [];
		   $scope.estadisticas = [];
		   $scope.estadistica = {};
		   $scope.imagenSeleccionada = {};
	   }
   };
   
   $scope.actualizarFoto = function(){	   
	   
	   if($scope.competenciaSeleccionada.tipoDeporte == tipo_individual){//cargo deportistas
	   
		   for(var i = 0; i <$scope.competenciaSeleccionada.deportistas.length ; i++ ){
			   if($scope.competenciaSeleccionada.deportistas[i].deportistaID == $scope.estadistica.objeto.id){
			     $scope.imagenSeleccionada = $scope.competenciaSeleccionada.deportistas[i].foto.ruta;
			     return;
			   }
		   }	   
	   
	   } else{
		   
		   for(var i = 0; i <$scope.competenciaSeleccionada.deportistas.length ; i++ ){
			   if($scope.competenciaSeleccionada.deportistas[i].comite.comiteId == $scope.estadistica.objeto.id){
			     $scope.imagenSeleccionada = $scope.competenciaSeleccionada.deportistas[i].comite.logo.ruta;
			     return;
			   }
		   }
	   
	   }	   
	   
   }

  
  }]);
