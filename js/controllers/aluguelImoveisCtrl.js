angular.module("aluguelImoveis", ['ui.router', 'ngAnimate']);


//configurando rotas
angular.module("aluguelImoveis").config(function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise('/imoveis');

	$stateProvider

	.state('imoveis', {
		url: '/imoveis',
		templateUrl: 'view/imoveis.html',
		controller: 'imoveisDiponiveisCtrl'
	})

	.state('detalhes',{
		url: '/detalhes',
		templateUrl: 'view/detalhes.html',
		controller: 'detalhesCtrl'
	})

});


angular.module("aluguelImoveis").controller("imoveisDiponiveisCtrl", function($scope, $filter, $state, $interval, $http){


	// filtro personalizado para codigo e nome dos produtos
	$scope.procura_filtro = function (obj) {
	    var re = new RegExp($scope.texto_filtro, 'i');
	    return !$scope.texto_filtro || re.test(obj.categoria) || re.test(obj.quarto)  || re.test(obj.banheiro);
	};


	$scope.buscarImoveis = function(){
		$http({
		    method: "GET",
		    url: "http://cnet.jcloud.net.br/search.php?c=123&f=json&q="+$scope.formulario.pesquisar,

		    }).then(function successCallback(resposta) {

		        $scope.imoveis = resposta.data
		        console.log(resposta.data);

		    }, function errorCallback(resposta) {
		       console.log("Deu erro");
		});
	};

	var carregarImoveis = function(){
		$http({
		    method: "GET",
		    url: "http://cnet.jcloud.net.br/search.php?c=123&f=json&q="+"aracuai",

		    }).then(function successCallback(resposta) {

		        $scope.imoveis = resposta.data

		    }, function errorCallback(resposta) {
		       console.log("Deu erro");
		});
	};

	carregarImoveis();
     

	$scope.detalhe_imovel = function(idx){
		$scope.$root.imovel = idx;
		$state.go('detalhes');
	}

	$scope.mudar_pagina = function(){
		$state.go('imoveis');
	}

	

});

angular.module("aluguelImoveis").controller("detalhesCtrl", function($scope, $interval, $state){
	// $scope.imovel = {};
	// $scope.imoveis = [];
	// $scope.dados = {};
	// var idx = $scope.$root.id_imovel;

	// console.log(idx);



	// $scope.buscar = function(){

	// 	if(window.localStorage.getItem("imoveis")){
	// 		$scope.imoveis = JSON.parse(window.localStorage.getItem("imoveis"));

	// 		$scope.dados = $scope.imoveis[$scope.$root.id_imovel];
	// 	}
	// }

	// $scope.buscar();
	// console.log($scope.dados);


});