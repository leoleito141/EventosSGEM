'use strict';

angular.module('eventosSGEM')
  .controller('AppCtrl', ['$scope','$state','$auth','$window','$document','$timeout', function ($scope,$state,$auth,$window,$document,$timeout) {
  
   const usuario_comun = "UsuarioComun";
   const usuario_juez = "Juez";
   const usuario_comite = "ComiteOlimpico";
   const usuario_organizador = "Organizador";	 
	  
   
	$timeout(function() {
	        
	  
		var dataTenant = JSON.parse(localStorage.getItem("tenantActual"));
		
		
		/*************** PARA CARGAR ESTILO DEL TENANT *****************/
		
		if (dataTenant !=null){
		var ruta = '/resources/defecto/img/Tenant1/noBackground.png';
		   var ruta2={};
		   if (dataTenant.banner!=null){
			   
			 ruta = dataTenant.banner.ruta.substr(dataTenant.banner.ruta.indexOf("resources")) ;
		   }
		   
		   if (dataTenant.fondo!=null){
			   
			   var ruta2 = dataTenant.fondo.ruta.substr(dataTenant.fondo.ruta.indexOf("resources")) ;
			   ruta2 = ruta2.replace(/\\/g,"/");
			  
			   $("body").css("background-image", "url('"+ruta2+"')");
		   }
		   else if (dataTenant.colorFondo != null){
			   
			 
			   $('body').css('background-color', dataTenant.colorFondo);
		   }
		   if (dataTenant.pagina!=null){
			   
				var ruta3 = dataTenant.pagina.ruta.substr(dataTenant.pagina.ruta.indexOf("resources")) ;
				$("#logonav").html(' <img  src="'+ruta3+'" alt="Inicio" style="height:50px;padding:2px;" />');
		   }else{
			   
			   $("#logonav").html(' <div style="height:50px;padding:2px;background-color:grey;color:white;" >Aqui va el logo<div/>');
		   }
		   
				   
				   
				   
		  // $("#imgBanner").html('<img  src="'+ruta+'" alt="Recurso no encontrado" style=" display: block; width: 100%;  height: 100%;" />');
		   
		/********************************/
		   
		$scope.tenant = dataTenant.nombre_url;
		
	  	if(dataTenant != null && dataTenant.facebook!=null)
	  		$("#lnkFb").attr("href", dataTenant.facebook);
	  	else
	  		$("#lnkFb").parent().hide();
	  	
	  	if(dataTenant != null && dataTenant.twitter!=null)
	  		$("#lnkTw").attr("href", dataTenant.twitter);
	  	else
	  		$("#lnkTw").parent().hide();
	  	
	  	if(dataTenant != null && dataTenant.canalYoutube!=null)
	  		$("#lnkYT").attr("href", dataTenant.canalYoutube);
	  	else
	  		$("#lnkYT").parent().hide();
	  	
	  	if(dataTenant != null && dataTenant.instagram!=null)
	  		$("#lnkIG").attr("href", dataTenant.instagram);
	  	else
	  		$("#lnkIG").parent().hide();
		}
		
	  	$scope.salir = function() {
	  		
	  		localStorage.removeItem("dataUsuario");
		    $auth.logout(); //Limpia localStorage y pone isAuthenticated en false
		
		    event.preventDefault();
		    $state.go('main', { tenant: JSON.parse(localStorage.getItem("tenantActual")).nombre_url });
		    
	    };
	    
	    $scope.isAuthenticated = function() {    	 
	    	return $auth.isAuthenticated();
	    };
	 
		 $scope.chequearComite = function() {		 		 
	    	return (JSON.parse(localStorage.getItem("dataUsuario")) != null && $auth.isAuthenticated() && JSON.parse(localStorage.getItem("dataUsuario")).tipoUsuario == usuario_comite);	    	
		 };
	
		 $scope.chequearUsuarioComun = function() {		 		 
		    	return (JSON.parse(localStorage.getItem("dataUsuario")) != null && $auth.isAuthenticated() && JSON.parse(localStorage.getItem("dataUsuario")).tipoUsuario == usuario_comun);	    	
		 };
		 
		 $scope.chequearJuez = function() {		 		 
		    	return (JSON.parse(localStorage.getItem("dataUsuario")) != null && $auth.isAuthenticated() && JSON.parse(localStorage.getItem("dataUsuario")).tipoUsuario == usuario_juez);	    	
		 };
		 
		 $scope.chequearOrganizador = function() {		 		 
		    	return (JSON.parse(localStorage.getItem("dataUsuario")) != null && $auth.isAuthenticated() && JSON.parse(localStorage.getItem("dataUsuario")).tipoUsuario == usuario_organizador);	    	
		 };
		
		 angular.element(document).ready(function () {
		        	    
			 $window.onscroll = function(){
				   var verticalCenter = Math.floor(window.innerHeight/2);	   
				   if ($window.pageYOffset >= verticalCenter) {
				        $('.backToTop:hidden').stop(true, true).fadeIn();
				    } else {
				        $('.backToTop').stop(true, true).fadeOut();
				    }
		//		    $scope.$digest()
			   };
			   
			   // documentacion: https://github.com/oblador/angular-scroll
			   // importar $document
			   $scope.goTop = function(){
				   var top = 0;
				   var duration = 2000; //milliseconds 
				   
				   //Scroll to the exact position 
				   $document.scrollTop(top, duration).then(function() {
//				     console && console.log('YA ESCROLIE PAPEI!');
				   });
			   }
			   
		 });
	 
		 $scope.getEmailUsuario = function() {    	 
		    var email = "";	
			 if($scope.isAuthenticated()){
				 var palabras = JSON.parse(localStorage.getItem("dataUsuario")).email.split('@');
		    		email = palabras[0];
		    	}
			 return email;
	    };
	 
	}, 1000);
	 
  }]);