angular.module('eventosSGEM')
  .controller('busquedaDeportistaCtrl', ['$scope','$state','dataFactory','dataTenant','objetos', '$document',
                           function ($scope,$state, dataFactory,dataTenant,objetos,$document) {
	
	  $scope.mensajeValidacion = ""; 
	  $scope.deportista  = {};  
	  $scope.deportes 	 = {};

	  $scope.listDeportistas=[];
	  
	  $scope.sortType     = 'nombre';  // set the default sort type
	  $scope.sortReverse  = false;    // set the default sort order
	  $scope.searchNombre   = '';      // set the default search/filter term
	  
	  if(dataTenant.colorFondo!=null&&dataTenant.colorNews ){
		  
		  $('.PerfilNews').css({
			    background: "-webkit-gradient(linear, left top, left bottom,from("+dataTenant.colorFondo+"), to("+dataTenant.colorNews+"))" 
		  });
	  
	  }
	  
	  angular.element(document).ready(function () {
		  var checkMasculino = angular.element(document.querySelector('.masculino'));
		  checkMasculino[0].checked = true;
		  $scope.obtenerDeportes("Masculino");
		  $scope.deportista.sexo = "Masculino";
	  });
		  
	  $scope.obtenerDeportes = function(sexo) { 
		  dataFactory.listarFiltroDeportista(dataTenant.tenantId,sexo)
		  .success(function (response, status, headers, config) {
              console.log(response); 
              $scope.deportes     = response.nombreDeporte;
              $scope.paises       = response.nombrePais;

              
              
            /// Se ordenan los paises por orden alfabetico
	      		 for(var i=0;i<($scope.paises.length-1);i++){
			            for(var j=i+1;j<$scope.paises.length;j++){
			                if($scope.paises[i]>$scope.paises[j]){
			                    //Intercambiamos valores
			                    var variableauxiliar=$scope.paises[i];
			                    $scope.paises[i]=$scope.paises[j];
			                    $scope.paises[j]=variableauxiliar;
			                    
			                }
			            }
			        }
              
              
	      		 /// Se ordenan los deportes por orden alfabetico
	      		 for(var i=0;i<($scope.deportes.length-1);i++){
			            for(var j=i+1;j<$scope.deportes.length;j++){
			                if($scope.deportes[i]>$scope.deportes[j]){
			                    //Intercambiamos valores
			                    var variableauxiliar=$scope.deportes[i];
			                    $scope.deportes[i]=$scope.deportes[j];
			                    $scope.deportes[j]=variableauxiliar;
			                    
			                }
			            }
			        }
	      		 
	      		 
              
              $scope.selectDeportes   = $scope.deportes[0];
              $scope.selectPaises     = $scope.paises[0];

              
            






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

		   $scope.databusqueda.pais = $scope.selectPaises;
		   $scope.databusqueda.sexo = $scope.deportista.sexo;
		 

		   dataFactory.buscarDesportistas($scope.databusqueda)
		   	.success(function (response, status, headers, config) {
		   		
		   		for(var i=0; i < response.length ; i++){
		   			response[i].foto.ruta = response[i].foto.ruta.substr(response[i].foto.ruta.indexOf("resources"));
		   		}
		   		
		   		$scope.listDeportistas = response;
		   		
		   		console.log(response);
		   		

		   	    $state.go('buscarDeportistas.listado');
		   	    var someElement = angular.element(document.querySelector('.resultadoBusqueda'))
		   	    $document.scrollToElement(someElement, 0, 1000);		   	    
		   	    
      	}).catch(function(error) {
      		console.log(error);
      		alert("Error al listar deportistas");
      	});
      
	  };
	  	 
	  
	 $scope.deportistaSeleccionado = function (de) {
		    




	        $scope.reporte={};
	        $scope.reporte=de;
	        objetos.setObjeto($scope.reporte);
	        $state.go('perfilDeportista',{tenant: dataTenant.nombre_url});






	    };
	
		  
		
		  
	
		  
		  
		  
		  
  }]);
