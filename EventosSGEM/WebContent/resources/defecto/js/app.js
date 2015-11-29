'use strict';
//,'ui.bootstrap.datetimepicker'
angular.module('eventosSGEM', ['ui.router','ui.bootstrap','satellizer','googlechart','ngAnimate','duScroll','angularUtils.directives.dirPagination'])
.run(['dataFactory','$rootScope','$state','$auth',function(dataFactory,$rootScope, $state, $auth){ // esto se ejecuta en tiempo de ejecucion,
  $rootScope.$on('$stateChangeStart', function(event, next, current) {
	  
    if(!$auth.isAuthenticated()){
    	
//      if (next.templateUrl=='views/altaEvento.html' ) {
//       	  event.preventDefault();
//    	  $state.go('adminLogin');
//
//      }


    } 
    /* Act on the event */
  });
  
}]).config(function ($authProvider,$stateProvider, $urlRouterProvider,$locationProvider) {
	
	
//	$locationProvider.html5Mode(true);
	// Parametros de configuración
    $authProvider.loginUrl = "https://sgem.com/rest/UsuarioService/loginUsuario";
    $authProvider.tokenName = "token";
    $authProvider.tokenPrefix = "myApp";
        
    $stateProvider	 
    .state('404', {
    	template: '<div>error, el recurso no esta disponible</div>',
    })
    .state('main', {
    	url:'/:tenant/',
		templateUrl : 'views/tenant/main.html',
		controller : 'MainCtrl',
		 resolve: { 
	    	dataTenant: function(dataFactory,$stateParams) {
	    			return dataFactory.getDataTenant($stateParams.tenant);
	    	}  
	    }
	})  
	
	.state('altaUsuarioComun', {
		url:'/:tenant/registroUC',
		templateUrl : 'views/tenant/registroTenant.html',
		controller : 'UsuarioCtrl',
	    resolve: { 
	    	dataTenant:function(dataFactory,$stateParams) {
	    		return dataFactory.getDataTenant($stateParams.tenant);
  
	    	}  
	    }
	})
	.state('login', {
		url:'/:tenant/login',
		templateUrl : 'views/tenant/loginTenant.html',
		controller : 'UsuarioCtrl',
	    resolve: { 
	    	dataTenant:function(dataFactory,$stateParams) {
    				return dataFactory.getDataTenant($stateParams.tenant);
 
	    	}  
	    }
	})
	.state('altaNovedad', {
		url:'/:tenant/nuevaNovedad',
		templateUrl : 'views/tenant/comite/altaNovedad.html',
		controller : 'UsuarioCtrl',
	    resolve: { 
	    	dataTenant:function(dataFactory,$stateParams) {
    				return dataFactory.getDataTenant($stateParams.tenant);
	    	}  
	    }
	}).state('altaComite', {
		url:'/:tenant/altaComite',
		templateUrl : 'views/tenant/organizador/altaComite.html',
		controller : 'UsuarioCtrl',
		resolve: { 
		    	dataTenant: function(dataFactory,$stateParams) {
		    			return dataFactory.getDataTenant($stateParams.tenant);

		    	}
		}
	}).state('perfilComite', {
		url:'/:tenant/perfilComite/:comiteId',
		templateUrl : 'views/tenant/perfilComite.html',
		controller : 'PerfilComiteCtrl',
		resolve: { 
	    	dataTenant: function(dataFactory,$stateParams) {
	    			    			return dataFactory.getDataTenant($stateParams.tenant);
	    	}
		}			
	}).state('altaDeportista', {
		url:'/:tenant/altaDeportista',
		templateUrl : 'views/tenant/comite/altaDeportista.html',
		controller : 'deportistaCtrl',
		resolve: { 
	    	dataTenant: function(dataFactory,$stateParams) {
	    			    			return dataFactory.getDataTenant($stateParams.tenant);
	    	}
		}
	}).state('altaEventoDeportivo', {
		url:'/:tenant/altaEventoDeportivo',
		templateUrl : 'views/tenant/organizador/altaEventoDeportivo.html',
		controller : 'EventoDeportivoCtrl',
		resolve: { 
	    	dataTenant: function(dataFactory,$stateParams) {
	    			    			return dataFactory.getDataTenant($stateParams.tenant);

	    	}
		}
		
	}).state('formAltaCompetencia', {
		url:'/:tenant/altaCompetencia',
		templateUrl : 'views/tenant/organizador/formAltaCompetencia.html',
		controller : 'competenciaCtrl',
		resolve: { 
	    	dataTenant: function(dataFactory,$stateParams) {
	    			    			return dataFactory.getDataTenant($stateParams.tenant);

	    	}
		}
	
	})// nested states 
	.state('formAltaCompetencia.Paso1', {
		url:'/Competencia1',
		templateUrl : 'views/tenant/organizador/altaCompetencia1.html',
			resolve: { 
		    	dataTenant: function(dataFactory,$stateParams) {
		    			    			return dataFactory.getDataTenant($stateParams.tenant);

		    	}
			}

	})// nested states each of these sections will have their own view url will be nested (/altaEvento/organizador)
	.state('formAltaCompetencia.Paso2', {
        url: '/Competencia2',
        templateUrl: 'views/tenant/organizador/altaCompetencia2.html',
        resolve: { 
    	    	dataTenant: function(dataFactory,$stateParams) {
    	    			    			return dataFactory.getDataTenant($stateParams.tenant);

    	    	}
    		}
        	
    }).state('formAltaCompetencia.Paso3', {
        url: '/Competencia3',
        templateUrl: 'views/tenant/organizador/altaCompetencia3.html',
        resolve: { 
    	    	dataTenant: function(dataFactory,$stateParams) {
    	    			    			return dataFactory.getDataTenant($stateParams.tenant);

    	    	}
    		}
        	
    }).state('altaJuez', {
		url:'/:tenant/altaJuez',
		templateUrl : 'views/tenant/organizador/altaJuez.html',
		controller : 'JuezCtrl',
		resolve: { 
	    	dataTenant: function(dataFactory,$stateParams) {
	    			    			return dataFactory.getDataTenant($stateParams.tenant);

	    	}
		}
		
	}).state('formCompraEntrada', {
		url:'/:tenant/compraEntrada',
		templateUrl : 'views/tenant/formCompraEntrada.html',
		controller : 'entradasCtrl',
		resolve: { 
	    	dataTenant: function(dataFactory,$stateParams) {
	    			    			return dataFactory.getDataTenant($stateParams.tenant);

	    	}
		}
	
	})// nested states 
	.state('formCompraEntrada.Paso1', {
		url:'/CompraEntrada1',
		templateUrl : 'views/tenant/compraEntrada1.html',
			resolve: { 
		    	dataTenant: function(dataFactory,$stateParams) {
		    			return dataFactory.getDataTenant($stateParams.tenant);

		    	}
			}

	})
	.state('formCompraEntrada.Paso2', {
        url: '/CompraEntrada2',
        templateUrl: 'views/tenant/compraEntrada2.html',
        resolve: { 
    	    	dataTenant: function(dataFactory,$stateParams) {
    	    			    return dataFactory.getDataTenant($stateParams.tenant);

    	    	}
    		}
        	
    }).state('usoSitio', {
		url:'/:tenant/usoSitio',
		templateUrl : 'views/tenant/organizador/reporteUsoSitio.html',
		controller : 'UsuarioCtrl',
		resolve: { 
	    	dataTenant: function(dataFactory,$stateParams) {
	    			    			return dataFactory.getDataTenant($stateParams.tenant);

	    	}
		}
	})
	
	
	/****** Resultado ********/
	
	
	.state('altaResultado', {
		url:'/:tenant/altaResultado',
		templateUrl : 'views/tenant/juez/formAltaResultado.html',
		controller : 'ResultadoCtrl',
		resolve: { 
	    	dataTenant: function(dataFactory,$stateParams) {
	    			    			return dataFactory.getDataTenant($stateParams.tenant);

	    	}
		}
	})
    .state('altaResultado.paso1', {
    	url:'/altaResultado1',
		templateUrl : 'views/tenant/juez/altaResultado1.html',
		resolve: { 
	    	dataTenant: function(dataFactory,$stateParams) {
	    			    			return dataFactory.getDataTenant($stateParams.tenant);

	    	}
		}
    })
    .state('altaResultado.paso2', {
    	url:'/altaResultado2',
		templateUrl : 'views/tenant/juez/altaResultado2.html',
		resolve: { 
	    	dataTenant: function(dataFactory,$stateParams) {
	    			    			return dataFactory.getDataTenant($stateParams.tenant);

	    	}
		}
    })
    .state('pruebaImagenConf', {
    	url:'/:tenant/pruebaImagenConf',
		templateUrl : 'views/tenant/pruebaImagenConf.html',
		controller : 'UsuarioCtrl',
		resolve: { 
	    	dataTenant: function(dataFactory,$stateParams) {
	    			    			return dataFactory.getDataTenant($stateParams.tenant);

	    	}
		}
    }).state('formEdicionEvento', {
		url:'/:tenant/EditarEvento',
		templateUrl : 'views/tenant/organizador/formEdicionEvento.html',
		controller : 'EventMultiDeportivoCtrl',
		resolve: { 
			dataTenant: function(dataFactory,$stateParams) {
    			return dataFactory.getDataTenant($stateParams.tenant);

			}
		}
	
	})// nested states 
	.state('formEdicionEvento.Paso1', {
		url:'/EditarEvento',
		templateUrl : 'views/tenant/organizador/EdicionEvento1.html',
			resolve: { 
				dataTenant: function(dataFactory,$stateParams) {
	    			return dataFactory.getDataTenant($stateParams.tenant);

				}
			}

	})// nested states each of these sections will have their own view url will be nested (/altaEvento/organizador)
	.state('formEdicionEvento.Paso2', {
        url: '/EditarEvento2',
        templateUrl: 'views/tenant/organizador/EdicionEvento2.html',
        resolve: { 
        	dataTenant: function(dataFactory,$stateParams) {
    			return dataFactory.getDataTenant($stateParams.tenant);

			}
		}
        	
    }).state('formEdicionEvento.Paso3', {
        url: '/EditarEvento3',
        templateUrl: 'views/tenant/organizador/EdicionEvento3.html',
        resolve: { 
        	dataTenant: function(dataFactory,$stateParams) {
    			return dataFactory.getDataTenant($stateParams.tenant);

			}
		}
    	
	}).state('buscarDeportistas', {
    	url:'/:tenant/deportistas',
		templateUrl : 'views/tenant/listarDeportistas.html',
		controller : 'busquedaDeportistaCtrl',
		resolve: { 
	    	dataTenant: function(dataFactory,$stateParams) {
	    		return dataFactory.getDataTenant($stateParams.tenant);

	    	}
		}
    }).state('buscarDeportistas.listado', {
		url:'/deportistas',
		templateUrl : 'views/tenant/deportistas.html'

	}).state('perfilDeportista', {
		url:'/:tenant/perfilDeportista',
		templateUrl : 'views/tenant/perfilDeportista.html',
		controller : 'perfilDeportistaCtrl',
		resolve: { 
		    dataTenant: function(dataFactory,$stateParams) {
		    	return dataFactory.getDataTenant($stateParams.tenant);

		    }
		}
	}).state('listarComites', {
		url:'/:tenant/listarComites',
		templateUrl : 'views/tenant/listaComitesOlimpicos.html',
		controller : 'listarComitesCtrl',
		resolve: { 
			dataTenant: function(dataFactory,$stateParams) {
    			return dataFactory.getDataTenant($stateParams.tenant);

			}
		}
	
	}).state('perfilEvento', {
		url:'/:tenant/perfilEvento',
		templateUrl : 'views/tenant/perfilEvento.html',
		controller : 'PerfilEventoCtrl',
		resolve: { 
			dataTenant: function(dataFactory,$stateParams) {
    			return dataFactory.getDataTenant($stateParams.tenant);

			}
		}
	
	}).state('Novedad', {
		url:'/:tenant/Novedad/:idnovedad',
		templateUrl : 'views/tenant/novedades.html',
		controller : 'NovedadCtrl',
	    resolve: { 
	    	dataTenant:function(dataFactory,$stateParams) {
	    		return dataFactory.getDataTenant($stateParams.tenant);

	    	}  
	    }
	}).state('Galeria', {
		url:'/:tenant/Galeria',
		templateUrl : 'views/tenant/instagram.html',
		controller : 'InstagramCtrl',
	    resolve: { 
	    	dataTenant:function(dataFactory,$stateParams) {
	    		return dataFactory.getDataTenant($stateParams.tenant);

	    	}  
	    }
	})
	.state('exitoPaypal', {
		url:'/:tenant/exitoPaypal',
		template : '<div>Donacion realizada con exito!</div>',
	    resolve: { 
	    	dataTenant:function(dataFactory,$stateParams) {
	    		return dataFactory.getDataTenant($stateParams.tenant);

	    	}  
	    }
	}).state('perfilEventoDeportivo', {
		url:'/:tenant/perfilEventoDeportivo/:nombreDeporte',
		templateUrl : 'views/tenant/perfilEventoDeportivo.html',
		controller : 'PerfilEventoDeportivoCtrl',
		resolve: { 
	    	dataTenant: function(dataFactory,$stateParams) {
    			return dataFactory.getDataTenant($stateParams.tenant);
	    	}
		}			
	}).state('perfilDisciplina', {
		url:'/:tenant/perfilEventoDeportivo/:nombreDeporte/:nombreDisciplina/:sexo',
		templateUrl : 'views/tenant/perfilDisciplina.html',
		controller : 'PerfilDisciplinaCtrl',
		resolve: { 
	    	dataTenant: function(dataFactory,$stateParams) {
    			return dataFactory.getDataTenant($stateParams.tenant);
	    	}
		}			
	}).state('perfilDisciplina.paso1', {
		url:'/competencias',
		templateUrl : 'views/tenant/perfilDisciplina1.html'
	}).state('perfilDisciplina.paso2', {
		url:'/resultados',
		templateUrl : 'views/tenant/perfilDisciplina2.html'
	}).state('listarEventosDeportivos', {
		url:'/:tenant/EventosDeportivos',
		templateUrl : 'views/tenant/listarEventosDeportivos.html',
		controller : 'ListarEventosDeportivosCtrl',
		resolve: { 
			dataTenant: function(dataFactory,$stateParams) {
    			return dataFactory.getDataTenant($stateParams.tenant);
			}
		}
	
	}).state('comprasRealizadas', {
		url:'/:tenant/comprasRealizadas',
		templateUrl : 'views/tenant/comprasRealizadas.html',
		controller : 'ComprasRealizadasCtrl',
		resolve: { 
	    	dataTenant: function(dataFactory,$stateParams) {
	    			    			return dataFactory.getDataTenant($stateParams.tenant);

	    	}
		}
	});
	
    $urlRouterProvider.otherwise(function($injector, $location){
//    	localStorage.removeItem("tenantActual"); OJO
        var state = $injector.get('$state');
        state.go('404');
        return $location.path();
     });

 });


