angular.module('eventosSGEM')
   .factory('dataMensajes',[ function() {
	   
    var dataMensajes = {};
    
    dataMensajes.add = function(mensaje){
    	dataMensajes.mensaje= mensaje;
      };
      
    dataMensajes.getMensaje = function() {
          return dataMensajes.mensaje;
      };

 
    
    return dataMensajes;
}]); 