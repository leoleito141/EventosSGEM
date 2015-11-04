'use strict';

angular.module('eventosSGEM')
  .controller('competenciaCtrl', ['$scope','dataFactory','$state','dataTenant', function ($scope,dataFactory,$state,dataTenant) {
	   
	  
	  $scope.competencia={};
	  
	  $scope.deportes = {};
	  
	  $scope.disciplinas = {};
	  
	  $scope.rondas = {};
	  
	  $scope.deportistas = {};
	  
	  
//	  $scope.openInicio = function($eventInicio) {
//		    $scope.statusInicio.opened = true;
//		  };
//
//	  $scope.openFin = function($eventFin) {
//		    $scope.statusFin.opened = true;
//		  };
//	   
//	  $scope.statusInicio = {
//			    opened: false
//			  };
//	  
//	  $scope.statusFin = {
//			    opened: false
//			  };
//	  
//	  $scope.dateOptions = {
//			    formatYear: 'yy',
//			    startingDay: 1
//			  };

	    var that = this;

	    $scope.isOpen = false;

	    $scope.openCalendar = function(e) {
	        e.preventDefault();
	        e.stopPropagation();

	        that.isOpen = true;
	    };
	  
	    var that = this;
	    
	    var in10Days = new Date();
	    in10Days.setDate(in10Days.getDate() + 10);
	    
	    $scope.dates = {
	      date1: new Date('2015-03-01T00:00:00Z'),
	      date2: new Date('2015-03-01T12:30:00Z'),
	      date3: new Date(),
	      date4: new Date(),
	      date5: in10Days,
	      date6: new Date(),
	      date7: new Date(),
	      date8: new Date()
	    };
	    
	    $scope.open = {
	      date1: false,
	      date2: false,
	      date3: false,
	      date4: false,
	      date5: false,
	      date6: false,
	      date7: false,
	      date8: false
	    };
	    
	    // Disable weekend selection
	    $scope.disabled = function(date, mode) {
	      return (mode === 'day' && (new Date().toDateString() == date.toDateString()));
	    };

	    $scope.dateOptions = {
	      showWeeks: false,
	      startingDay: 1
	    };
	    
	    $scope.timeOptions = {
	      readonlyInput: false,
	      showMeridian: false
	    };
	    
	    $scope.dateModeOptions = {
	      minMode: 'year',
	      maxMode: 'year'
	    };
	    
	    $scope.openCalendar = function(e, date) {
	        that.open[date] = true;
	    };
	    
	    // watch date4 and date5 to calculate difference
	    $scope.calculateWatch = $scope.$watch(function() {
	      return that.dates;
	    }, function() {
	      if (that.dates.date4 && that.dates.date5) {
	        var diff = that.dates.date4.getTime() - that.dates.date5.getTime();
	        that.dayRange = Math.round(Math.abs(diff/(1000*60*60*24)))
	      } else {
	        that.dayRange = 'n/a';
	      }
	    }, true);
	    
	    $scope.$on('$destroy', function() {
	    	$scope.calculateWatch();
	    });
	    
	    
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
              
              $scope.nombreDeporte = $scope.deportes[0];

      	}).catch(function(error) {
      		console.log(error);
      		alert("Error al listar deportistas");
      	});
      
	  };
	  
	  $scope.obtenerDisciplina = function(sexo, nombreDeporte) {
		    
		  console.log(dataTenant.tenantId);
		  console.log(sexo);
		  console.log(nombreDeporte);
		  
		  
		  
		  dataFactory.listarDisciplinas(dataTenant.tenantId,sexo,nombreDeporte)
		  .success(function (response, status, headers, config) {
              console.log(response);
              console.log(status);
              console.log(headers);
              console.log(config);
              
              $scope.disciplinas = response;
              
              $scope.nombreDisciplina = $scope.disciplinas [0];

      	}).catch(function(error) {
      		console.log(error);
      		alert("Error al listar deportistas");
      	});
      
	  };  
	  
	  $scope.obtenerRondas = function(sexo, nombreDeporte,nombreDisciplina) {
		    
		  console.log(dataTenant.tenantId);
		  console.log(sexo);
		  console.log(nombreDeporte);
		  
		  
		  
		  dataFactory.listarRondas(dataTenant.tenantId,sexo,nombreDeporte,nombreDisciplina)
		  .success(function (response, status, headers, config) {
              console.log(response);
              console.log(status);
              console.log(headers);
              console.log(config);
              
              $scope.rondas = response;
              
              $scope.ronda = $scope.rondas [0];

      	}).catch(function(error) {
      		console.log(error);
      		alert("Error al listar deportistas");
      	});
      
	  };  
	  
	  
	  
	  
	  $scope.obtenerDeportistas = function(sexo, nombreDeporte,nombreDisciplina) {
		    
		  console.log(dataTenant.tenantId);
		  console.log(sexo);
		  console.log(nombreDeporte);
		  
		  dataFactory.listarDeportistasEventoDeportivo(dataTenant.tenantId,sexo,nombreDeporte,nombreDisciplina)
		  .success(function (response, status, headers, config) {
              console.log(response);
              console.log(status);
              console.log(headers);
              console.log(config);
              
              $scope.deportistas = response;
              
              $scope.selectDeportistas = $scope.deportistas [0];

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
	  
		  
		  $scope.obtenerJueces = function() {
			    
			  console.log(dataTenant.tenantId);
			 
			  
			  
			  dataFactory.listarJueces(dataTenant.tenantId)
			  .success(function (response, status, headers, config) {
	              console.log(response);
	              console.log(status);
	              console.log(headers);
	              console.log(config);
	              
	              $scope.jueces = response;
	              
	              $scope.juez = $scope.jueces [0];

	      	}).catch(function(error) {
	      		console.log(error);
	      		alert("Error al listar jueces");
	      	});
	      
		  };  
		  
		  
		 
		  $scope.guardarCompetencia = function(sexo,estadio,cantEntradas,precioEntrada,fechaInicio,nombreDeporte,nombreDisciplina,ronda,juez,selection){
			  
			  
			  $scope.datos = {};
			  var juez1 = juez;
			  var deportistas = selection;
		//	  $scope.datos.juez = juez1;
		//	  $scope.datos.sexo = sexo;
			  
			  $scope.datos.tenantId = dataTenant.tenantId;
			  $scope.datos.sexo = sexo;
			  $scope.datos.estadio = estadio;
			  $scope.datos.cantEntradas = cantEntradas;
			  $scope.datos.precioEntrada = precioEntrada;
			  $scope.datos.nombreDeporte = nombreDeporte;
			  $scope.datos.fecha = fechaInicio;
			  $scope.datos.nombreDisciplina = nombreDisciplina;
			  $scope.datos.ronda = ronda;
			  $scope.datos.juez = juez1;
			  $scope.datos.deportistas = deportistas;
			  
			  dataFactory.altaCompetencia($scope.datos)
		     	.then(function (data, status, headers, config) {
		                $scope.status = data.status;
		                console.log("Entre Alta Deportista");
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
		  
		  
		  
  }]);