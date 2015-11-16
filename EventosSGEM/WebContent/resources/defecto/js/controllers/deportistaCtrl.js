angular.module('eventosSGEM')
  .controller('deportistaCtrl', ['$scope','$state','dataFactory','dataTenant', 
                           function ($scope,$state, dataFactory,dataTenant) {
	
	  $scope.mensajeValidacion = ""; 
	   
	  $scope.deportista={};
	  console.log($scope.deportista);
	  
	  $scope.deportes = {};
	  
	  $scope.disciplinas = {};
	  
	  $scope.openInicio = function($eventInicio) {
		    $scope.statusInicio.opened = true;
		  };
   
	  $scope.statusInicio = {
			    opened: false
			  };
	  
	  $scope.dateOptions = {
			    formatYear: 'yy',
			    startingDay: 1
			  };
	  
	  $scope.obtenerDeportes = function(sexo) {
		    
		  console.log(dataTenant.tenantId);
		  console.log(sexo);
		  
		  dataFactory.listarDeportes(dataTenant.tenantId,sexo)
		  .success(function (response, status, headers, config) {
              console.log(response);
              console.log(status);
              console.log(headers);
              console.log(config);
              
              $scope.deportes = response;
              
              $scope.selectDeportes = $scope.deportes[0];
//              if(response){
//	              event.preventDefault();
//	        	  $state.go('tenantLogin', { tenant: $scope.nombreTenant});//$state.go just calls transitionTo with inherit and relative set to true. Almost no difference.
//              }else{
//            	  alert("Error al dar de alta");
//              }
      	}).catch(function(error) {
      		console.log(error);
      		alert("Error al listar deportistas");
      	});
      
	  };
	  
	  $scope.obtenerDisciplina = function(sexo, selectDeportes) {
		    
		  console.log(dataTenant.tenantId);
		  console.log(sexo);
		  console.log(selectDeportes);
		  
		  
		  
		  dataFactory.listarDisciplinas(dataTenant.tenantId,sexo,selectDeportes)
		  .success(function (response, status, headers, config) {
              console.log(response);
              console.log(status);
              console.log(headers);
              console.log(config);
              
              $scope.disciplinas = response;
              
              $scope.selectDisciplinas = $scope.disciplinas [0];

      	}).catch(function(error) {
      		console.log(error);
      		alert("Error al listar deportistas");
      	});
      
	  };
	  
	  $scope.selection = [];
	  
	  $scope.toggleSelection = function toggleSelection(nombreDis) {
		    var idx = $scope.selection.indexOf(nombreDis);

		   if (idx > -1) {
		      $scope.selection.splice(idx, 1);
		    }

		   else {
		      $scope.selection.push(nombreDis);
		    }
		  };
	  
	  
	  $scope.altaDeportista = function(selectDeportes,selection){
		  $scope.cargando = true;
		  var foto = $scope.myFile;
		  
		  if(foto != null){
			  
			  dataFactory.subirImagenDeportista(foto,dataTenant.tenantId,(JSON.parse(localStorage.getItem("dataUsuario"))).comiteId).
				then(function (response, status, headers, config) {
			  
				  var foto = {};
				  foto.mime = response.data.mime;
				  foto.ruta = response.data.ruta;
				  foto.tenantId = response.data.tenantId;
					
				  $scope.deportista.tenantId = dataTenant.tenantId;
				  $scope.deportista.pais = (JSON.parse(localStorage.getItem("dataUsuario"))).dataPais;
				  $scope.deportista.deporte = selectDeportes;
				  $scope.deportista.disciplinas = selection;
				  $scope.deportista.foto = foto;
				  
				  dataFactory.altaDeportista($scope.deportista)
			     	.then(function (data, status, headers, config) {
			     		  event.preventDefault();
			     		  $state.go('main', { tenant: $scope.nombreTenant} );			                
		            }).catch(function(response){
		            	 $scope.cargando = false;
			       		 $scope.mensajeValidacion = "Error al crear deportista.";
		            });
				  
				}).catch(function(response){
						$scope.cargando = false;
						$scope.mensajeValidacion = "Error al subir im\u00E1gen para el deportista. Contacte con soporte.";
				});
			  
		  }else{
			  $scope.cargando = false;
			  $scope.mensajeValidacion = "Debe seleccionar una im\u00E1gen para el deportista.";
		  }
			  
	  }; 
//////////////////////Listar Deportistas////////////////////////////////////////		  
		  
		  
		  
  }]);

