 angular.module('pruebaAngularApp')
   .factory('dataFactory', ['$http', function($http) {
    var dataFactory = {};
    
    const dominio = "https://sgem.com/rest/";

    dataFactory.getStatus = function () {

        console.log($location.absUrl());
        return $http.get(dominio+'UsuarioService/status/', {
            headers: { 'Rol' : 'ADMIN'} 
        });
    };
        
     dataFactory.getUsuario = function (nombre) {

    	    console.log(nombre);
            return $http.get(dominio+'UsuarioService/usuarioPrueba/'+nombre );

        };
    /*
     * Esta funcion queda comentada porque el login ahora se realiza mediante 
     * satellizer
     *     
     dataFactory.login = function (datos) {

            console.log(datos);
            return $http.post('http://localhost:8080/GestionEventoMultideportivo/rest/UsuarioService/login', datos);

        };   
    */
        dataFactory.getPrueba = function () {
            return $http.get(dominio+'UsuarioService/prueba/', {
                headers: { 'Rol' : 'ADMIN'} 
            });
        }; 
        
        dataFactory.altaEvento = function(datos){
        	console.log(datos);
            return $http.post(dominio+'EventoMultiService/eventos', datos,
            		{headers: { 'Rol' : 'ADMIN'}});       	
        }; 
        
        dataFactory.guardarOrganizador = function(datos){
        	console.log(datos);
            return $http.post(dominio+'UsuarioService/organizador', datos,
            		{headers: { 'Rol' : 'ADMIN'}});	      	
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
        
        
//        dataFactory.getDatosTenant = function(tenant){
//        	
//        	 return $http.get('dominio+'EventoMultiService/obtenerDatosTenant/'+tenant, {
//                 headers: { 'Rol' : 'VISITANTE'} 
//             })
//        	  .then(function (data, status, headers, config) {
//                  
//                  console.log("Entre get datos tenant");
//                  console.log(data);
//                  console.log(status);
//                  console.log(headers);
//                  console.log(config);
//                  return data; 
//                  
//              })
//              .catch(function(response){
//                  // Si ha habido errores llegamos a esta parte
//              	console.log(response); 
//              });
//              		 
//        };
//        
//        dataFactory.getTenant = function(tenant){
//        	//fijarse si no esta cargado ya, ese "tenant", si es distinto al que tenemos seteado ir a buscarlo.
//	   	return $http.get('dominio+'EventoMultiService/obetenerTenant/'+tenant)
//		       	.then(function (data, status, headers, config) {
//		                 
//		                 console.log("Entre get tenant");
//		                 console.log(data);
//		                 console.log(status);
//		                 console.log(headers);
//		                 console.log(config);
//		                 return data; 
//		                 
//	             }).catch(function(response){
//		             	console.log(response); 
//		        });
//	         		 
//	    };
     
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
			                 
		             }).catch(function(response){
			             	console.log(response); 
			        });
	         		 
	    };
     
	    dataFactory.altaUsuarioComun = function(usuario){
        	console.log(usuario);
            return $http.post(dominio+'UsuarioService/usuarios', usuario,
            		{ headers: { 'Rol' : 'VISITANTE'} });       	
        }; 

	    
        return dataFactory;
}]); 