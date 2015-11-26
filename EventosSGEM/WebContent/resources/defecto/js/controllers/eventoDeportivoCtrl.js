angular.module('eventosSGEM')
  .controller('EventDeportivoCtrl', ['$scope','dataFactory','dataTenant', 
                           function ($scope, dataFactory,dataTenant) {
	
	  $scope.eventoDeportivo={};
	  $scope.nombreTenant = dataTenant.nombre_url;
	  
	  if(dataTenant.colorFondo!=null&&dataTenant.colorNews ){
		  
		  $('.PerfilNews').css({
			    background: "-webkit-gradient(linear, left top, left bottom,from("+dataTenant.colorFondo+"), to("+dataTenant.colorNews+"))" 
		  });
	  
	  }
	  
	  $scope.$on('$viewContentLoaded' , function(){
          $('#datetimepicker2').datetimepicker({
        	  locale: 'es'	 
        	  
        	});
          $("#datetimepicker2").on("dp.change", function (e) {
        	  $scope.eventoDeportivo.fechaFin = e.date;
              
          });
          $('#datetimepicker1').datetimepicker({
        	  locale: 'es'
        	  
        	});
          $("#datetimepicker1").on("dp.change", function (e) {
        	  $scope.eventoDeportivo.fechaInicio = e.date;
              
          });
          
          

	  });
	  
	  $scope.altaEventoDeportivo = function(){
		  
		  $scope.eventoDeportivo.tenantId = dataTenant.tenantId;
		  
		  dataFactory.altaEventoDeportivo($scope.eventoDeportivo)
	     	.then(function (data, status, headers, config) {
	     		
	     		$state.go('main', { tenant: $scope.nombreTenant } );
                
            })
            .catch(function(response){
                // Si ha habido errores llegamos a esta parte
            	console.log(response); 
            });
		  
		  
		  
	  };
	  
	  
	  
	  
  }]);

