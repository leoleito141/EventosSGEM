angular.module('eventosSGEM')
  .controller('busquedaDeportistaCtrl', ['$scope','$state','dataFactory','dataTenant', 
                           function ($scope,$state, dataFactory,dataTenant) {
	
	  $scope.mensajeValidacion = ""; 
	  $scope.deportista  = {};  
	  $scope.deportes 	 = {};
	  $scope.disciplinas = {};
	  $scope.listDeportistas=[];
	  
	  $scope.sortType     = 'nombre';  // set the default sort type
	  $scope.sortReverse  = false;    // set the default sort order
	  $scope.searchNombre   = '';      // set the default search/filter term
	  
	  if(dataTenant.colorFondo!=null&&dataTenant.colorNews ){
		  
		  $('.PerfilNews').css({
			    background: "-webkit-gradient(linear, left top, left bottom,from("+dataTenant.colorFondo+"), to("+dataTenant.colorNews+"))" 
		  });
	  
	  }
	  
	  $scope.obtenerDeportes = function(sexo) { 
		  dataFactory.listarFiltroDeportista(dataTenant.tenantId,sexo)
		  .success(function (response, status, headers, config) {
              console.log(response); 
              $scope.deportes     = response.nombreDeporte;
              $scope.paises       = response.nombrePais;
              $scope.disciplina   = response.nombreDisciplina;
              
              $scope.selectDeportes   = $scope.deportes[0];
              $scope.selectPaises     = $scope.paises[0];
              $scope.selectDisciplina = $scope.disciplina[0]; 
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
	 
	   $scope.buscarDesportistas = function() {
		   $scope.databusqueda = {};
		   $scope.databusqueda.tenantId = dataTenant.tenantId;
		   $scope.databusqueda.nombreDeportista = $scope.deportista.nombre;
		   $scope.databusqueda.deporte = $scope.selectDeportes;
		   $scope.databusqueda.disciplina = $scope.selectDisciplina;
		   $scope.databusqueda.pais = $scope.selectPaises;
		   $scope.databusqueda.sexo = $scope.deportista.sexo;
		   console.log($scope.databusqueda);
		   dataFactory.buscarDesportistas($scope.databusqueda)
		   	.success(function (response, status, headers, config) {
		   		
		   		for(var i=0; i < response.length ; i++){
		   			response[i].foto.ruta = response[i].foto.ruta.substr(response[i].foto.ruta.indexOf("resources"));
		   		}
		   		
		   		$scope.listDeportistas = response;
		   		console.log($scope.listDeportistas);
		   	    $state.go('buscarDeportistas.listado');

      	}).catch(function(error) {
      		console.log(error);
      		alert("Error al listar deportistas");
      	});
      
	  };
	  
	  function search(nombre, arreglo){
		    for (var i=0; i < arreglo.length; i++) {
		        if (arreglo[i].nombre === nombre) {
		            return arreglo[i];
		        }
		    }
		}
	  
	  $scope.deportistaSeleccionado = function (nombreDeportista) {
	       
	        
	        var resultObject = search(nombreDeportista, $scope.listDeportistas);
	        console.log(resultObject);
	        $scope.reporte={};
	        $scope.reporte.nombre=resultObject.nombre;
	        $scope.reporte.apellido=resultObject.apellido;
	        $scope.reporte.fechaNac=resultObject.fechaNac;
	        $scope.reporte.sexo=resultObject.sexo;
	        $scope.reporte.deporte=resultObject.deporte;
	        $scope.reporte.foto=resultObject.foto.ruta;
	        $state.go('buscarDeportistas.reporte');
	    };
	
		  
		
		  
	
		  
		  
		  
		  
  }]);
