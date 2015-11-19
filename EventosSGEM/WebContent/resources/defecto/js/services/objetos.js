angular.module('eventosSGEM')
   .service('objetos',[ function() {
	   
    this.objeto = {};
    this.objetos = [];
    
    this.getObjeto = function(){
    	return this.objeto;
      };
      
    this.getObjetos = function() {
        return this.objetos;
      };

	this.setObjeto = function(objeto) {
		this.objeto = objeto;
	};
	
    this.setObjetos = function(objetos) {
    	this.objetos = objetos;
    };
    
    
}]); 