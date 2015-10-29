angular.module('eventosSGEM')
  .controller('deportistaCtrl', ['$scope','dataFactory','dataTenant', 
                           function ($scope, dataFactory,dataTenant) {
	
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
      	}).error(function(error) {
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

      	}).error(function(error) {
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
			  
			  $scope.deportista.tenantId = dataTenant.tenantId;
			  $scope.deportista.pais = "Uruguay";
			  $scope.deportista.deporte = selectDeportes;
			  $scope.deportista.disciplinas = selection;
			  
			  dataFactory.altaDeportista($scope.deportista)
		     	.then(function (data, status, headers, config) {
		                $scope.status = data.status;
		                console.log("Entre Alta Deportista");
		                console.log(data.status);
		                console.log(status);
		                console.log(headers);
		                console.log(config);
		                
		            })
		            error(function(response){
		                // Si ha habido errores llegamos a esta parte
		            	console.log(response); 
		            });
			  
			  
			  
		  }; 
		  
		  
		  
		  
  }]);

