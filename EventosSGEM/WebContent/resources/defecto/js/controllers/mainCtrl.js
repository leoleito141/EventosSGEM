'use strict';

angular.module('eventosSGEM')
  .controller('MainCtrl', ['$scope','$state','dataFactory','dataTenant', 
                                     function ($scope, $state, dataFactory,dataTenant) {

   console.log(dataTenant.tenantId);
   
   $scope.nombreTenant = dataTenant.nombre_url;
  
  }]);
