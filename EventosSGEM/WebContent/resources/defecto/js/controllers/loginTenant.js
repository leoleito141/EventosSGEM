'use strict';

angular.module('pruebaAngularApp')
  .controller('LoginTenantCtrl', ['$scope','$auth','dataFactory','$state','dataTenant', function ($scope, $auth, dataFactory,$state,dataTenant) {

   console.log(loadData.login_back_img);
   $scope.customStyle.background= 'url(resources/defecto/img/tenant1/' + loadData.login_back_img +')fixed';
//   $scope.customStyle = {
//	   'background-image': 'url(resources/defecto/img/tenant1/' + loadData.data.image +')'
////	   'background-image': 'url(resources/defecto/img/tenant1/' + loadData.data.image +')fixed',
////	   'background': 'url(resources/defecto/img/tenant1/'+loadData.data.image')'
//	 
//   };
   
   $scope.usuario={};//Informacion del usuario para loguear pasada desde login.html
   
   $scope.loginUser = function () {
       var datos = $scope.usuario;
    
       $auth.login({
           email: datos.email,
           password: btoa(datos.password) // base 64 
       })
       .then(function (data){
          
            $scope.usrLogin.email = $scope.usuario.email;
            $scope.usuario.password="";
            var payLoad = $auth.getPayload();    
           
//            $state.transitionTo("altaEvento", { tenant: payLoad.tenantid });
  
        })
        .catch(function(response){
            // Si ha habido errores llegamos a esta parte
        	console.log(response); 
        });
	};
   		
   	
    

	 


  }]);
