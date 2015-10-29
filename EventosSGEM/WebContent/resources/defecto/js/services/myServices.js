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

    dataFactory.subirImagen = function(foto,tenantId){
    	var formData = new FormData();
    	formData.append("file", foto);
    	formData.append("tenantId", tenantId);
    	return $http.post(dominio+'UsuarioService/subirImagen', formData,{
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
	    
    
    
    dataFactory.altaEventoDeportivo = function(datos){
    	console.log(datos);
        return $http.post(dominio+'EventoDeportivoService/altaEventoDeportivo', datos,
        		{headers: { 'Rol' : 'ADMIN'}});       	
    }; 
    
    
    dataFactory.altaComite = function(datos){
    	console.log(datos);
        return $http.post(dominio+'UsuarioService/altaComite', datos,
        		{headers: { 'Rol' : 'ADMIN'}});       	
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

    
    dataFactory.altaDeportista = function(datos){
    	console.log(datos);
        return $http.post(dominio+'DeportistaService/altaDeportista', datos,
        		{headers: { 'Rol' : 'COMITE_OLIMPICO'}});       	
    };
    
    return dataFactory;
}]); 