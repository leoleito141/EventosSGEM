
angular.module('eventosSGEM')
  
	   .service('sharedProperties', function() {
	   
		   this.novedades = {};

		   this.getNovedades = function() {
		         return this.novedades;
		   };
		   this.setNovedades = function(novedades) {
		         this.novedades = novedades;
		   };
		   
		   this.getSingleNovedad = function(idNovedad) {
			   
			   if(this.novedades != null && this.novedades.length > 0 ){
		    		for(var i = 0; i <this.novedades.length; i++)
		        	{
		        	  if(this.novedades[i].id == idNovedad)
		        	  {
		        	    return this.novedades[i];
		        	  }
		        	}
	    		}else{
	    			return {};
	    		}
		         
		   };   
}); 





