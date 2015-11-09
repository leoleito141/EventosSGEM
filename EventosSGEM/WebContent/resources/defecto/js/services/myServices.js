 angular.module('eventosSGEM')
   .factory('dataFactory', ['$http', function($http) {
	   
    var dataFactory = {};    
    const dominio = "https://sgem.com/rest/";

    dataFactory.getStatus = function () {

        console.log($location.absUrl());
        return $http.get(dominio+'UsuarioService/status/', {
            headers: { 'Rol' : 'ADMIN'} 
        });
    };
           
    dataFactory.getDataTenant = function(tenant){
   
	   	return $http.get(dominio+'EventoMultiService/obtenerDataTenant/'+tenant)
		       	.then(function (response) {

		       		localStorage.setItem("tenantActual", JSON.stringify(response.data));
		       				       		
		                 console.log("Entre get Data tenant");
		                 console.log(response);
		                 console.log(response.status);
		                 console.log(response.headers);
		                 console.log(response.config);
		                 return response; 
		                 
	             }).error(function(response){
		             	console.log(response); 
		        });
	         		 
	    };
     
    dataFactory.altaUsuarioComun = function(usuario){
    	console.log(usuario);
        return $http.post(dominio+'UsuarioService/usuarios', usuario,
        		{ headers: { 'Rol' : 'VISITANTE'} });       	
    }; 

    dataFactory.subirImagenNovedad = function(foto,tenantId){
    	var formData = new FormData();
    	formData.append("file", foto);
    	formData.append("tenantId", tenantId);
    	return $http.post(dominio+'UsuarioService/subirImagenNovedad', formData,{
    		transformRequest: angular.identity,
    		headers: {'Content-Type': undefined , 'Rol' : 'COMITE_OLIMPICO' }
    	}); 
    };
    
    dataFactory.altaNovedad = function(novedad){
    	
    	return $http.post(dominio+'UsuarioService/novedades', novedad,
        		{ headers: { 'Rol' : 'COMITE_OLIMPICO'} });
    };
    
    dataFactory.obtenerHistorial = function(tenant){    	   
	   	return $http.get(dominio+'UsuarioService/obtenerHistorial/'+tenant, {
            headers: { 'Rol' : 'ORGANIZADOR'} 
        });	         		 
    };
    
    dataFactory.obtenerCantidadRegistrados = function(tenant){ 	   
	   	return $http.get(dominio+'UsuarioService/obtenerCantidadRegistrados/'+tenant, {
            headers: { 'Rol' : 'ORGANIZADOR'} 
        });	         		 
    };    
    
    dataFactory.altaEventoDeportivo = function(datos){
    	console.log(datos);
        return $http.post(dominio+'EventoDeportivoService/altaEventoDeportivo', datos,
        		{headers: { 'Rol' : 'ADMIN'}});       	
    }; 
    
    
    dataFactory.altaComite = function(datos){
    	console.log(datos);
        return $http.post(dominio+'UsuarioService/altaComite', datos,
        		{headers: { 'Rol' : 'ORGANIZADOR'}});       	
    }; 
    
    dataFactory.subirImagenComite = function(foto,tenantId){
    	var formData = new FormData();
    	formData.append("file", foto);
    	formData.append("tenantId", tenantId);
    	return $http.post(dominio+'UsuarioService/subirImagenComite', formData,{
    		transformRequest: angular.identity,
    		headers: {'Content-Type': undefined , 'Rol' : 'ORGANIZADOR' }
    	}); 
    };
    
    dataFactory.listarDeportes = function(tenantId,sexo){
        return $http.get(dominio+'EventoDeportivoService/listarDeportes/'+tenantId+'/'+sexo , 
        		{headers: { 'Rol' : 'COMITE_OLIMPICO'} }
        		);
    };
    
    dataFactory.listarDisciplinas = function(tenantId,sexo,selectDeportes){
        return $http.get(dominio+'EventoDeportivoService/listarDisciplinas/'+tenantId+'/'+sexo+'/'+selectDeportes , 
        		{headers: { 'Rol' : 'COMITE_OLIMPICO'} }
        		);
    };
    
    dataFactory.listarRondas = function(tenantId,sexo,selectDeportes,selectDisciplinas){
        return $http.get(dominio+'EventoDeportivoService/listarRondas/'+tenantId+'/'+sexo+'/'+selectDeportes+'/'+selectDisciplinas , 
        		{headers: { 'Rol' : 'COMITE_OLIMPICO'} }
        		);
    };

    dataFactory.listarDeportistasEventoDeportivo= function(tenantId,sexo,selectDeportes,selectDisciplinas){
        return $http.get(dominio+'DeportistaService/listarDeportistas/'+tenantId+'/'+sexo+'/'+selectDeportes+'/'+selectDisciplinas , 
        		{headers: { 'Rol' : 'COMITE_OLIMPICO'} }
        		);
    };
    
    dataFactory.altaJuez = function(datos){
    	console.log(datos);
        return $http.post(dominio+'UsuarioService/altaJuez', datos,
        		{headers: { 'Rol' : 'ORGANIZADOR'}});       	
    };
    
    
    dataFactory.listarJueces = function(tenantId){
        return $http.get(dominio+'UsuarioService/listarJueces/'+tenantId , 
        		{headers: { 'Rol' : 'ORGANIZADOR'} }
        		);
    };
    
    
    dataFactory.altaCompetencia = function(datos){
    	console.log(datos);
        return $http.post(dominio+'CompetenciaService/guardarCompetencia', datos,
        		{headers: { 'Rol' : 'ORGANIZADOR'}});       	
    };
    
    dataFactory.listarCompetencias= function(tenantId,sexo,selectDeportes,selectDisciplinas,ronda){
        return $http.get(dominio+'CompetenciaService/listarCompetenciasPorRonda/'+tenantId+'/'+sexo+'/'+selectDeportes+'/'+selectDisciplinas+'/'+ronda , 
        		{headers: { 'Rol' : 'VISITANTE'} }
        		);
    };
    
    dataFactory.obtenerPrecio= function(tenantId, idCompetencia){
        return $http.get(dominio+'CompetenciaService/obtenerPrecio/'+tenantId+'/'+idCompetencia , 
        		{headers: { 'Rol' : 'VISITANTE'} }
        		);
    };
    
    
    
    dataFactory.realizarCompraEntradas = function(datos){
    	console.log(datos);
        return $http.post(dominio+'CompetenciaService/comprarEntradas', datos,
        		{headers: { 'Rol' : 'USUARIO_COMUN'}});       	
    };
    
    
    
    dataFactory.altaDeportista = function(datos){
    	console.log(datos);
        return $http.post(dominio+'DeportistaService/altaDeportista', datos,
        		{headers: { 'Rol' : 'COMITE_OLIMPICO'}});       	
    };
    
    dataFactory.subirImagenDeportista = function(foto,tenantId,comiteId){
    	var formData = new FormData();
    	formData.append("file", foto);
    	formData.append("tenantId", tenantId);
    	formData.append("comiteId", comiteId);
    	return $http.post(dominio+'DeportistaService/subirImagenDeportista', formData,{
    		transformRequest: angular.identity,
    		headers: {'Content-Type': undefined , 'Rol' : 'COMITE_OLIMPICO' }
    	}); 
    };
    
    dataFactory.listarCompetenciasPendientes = function(tenantId,juezID){
    	  return $http.get(dominio+'CompetenciaService/listarCompetenciasPendientes/'+tenantId+'/'+juezID , 
          			{headers: { 'Rol' : 'JUEZ'} 
    	  }); 	
    };
    
    dataFactory.altaResultado = function(resultado){
        return $http.post(dominio+'CompetenciaService/guardarResultado', resultado,
        		{headers: { 'Rol' : 'JUEZ'}
        });       	
    };
    
    return dataFactory;
}]); 