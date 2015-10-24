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

    dataFactory.altaNovedad = function(novedad){
    	
    	return $http.post(dominio+'UsuarioService/novedades', novedad,
        		{ headers: { 'Rol' : 'COMITE_OLIMPICO'} });
    };
//    			.then(function (response) {
//    				
//    				console.log(response);
//    				if(response){
//						var formData = new FormData();
//					    formData.append("file", foto);
//					    return $http.post(dominio+'EventoMultiService/subirImagen', formData,{
//					    		transformRequest: angular.identity,
//					            headers: {'Content-Type': undefined}
//						}); 
//    				}
//    				    				
//			 }).catch(function(response){
//			     	console.log(response); 
//			});  
    		
//    }; 
	    
    dataFactory.subirImagen = function(foto){
    	var formData = new FormData();
	    formData.append("file", foto);
    	
	    return $http.post(dominio+'UsuarioService/subirImagen', formData,{
			transformRequest: angular.identity,
	        headers: {'Content-Type': undefined}
	    }); 
    };
    
    return dataFactory;
}]); 