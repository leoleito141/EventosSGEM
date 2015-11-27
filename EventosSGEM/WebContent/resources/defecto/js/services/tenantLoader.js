
angular.module('eventosSGEM')
  
	   .service('TenantLoader', function() {
	   
		   this.tenant = true;

		   this.getTenant = function() {
		         return this.tenant;
		   };
		   this.setTenant = function(Tenant) {
		         this.tenant = Tenant;
		   };		   
		 
}); 





