
var app = angular.module('rappi', ['ngAnimate', 'ngMaterial']);

app.config(['$mdIconProvider' , function($mdIconProvider) {
	$mdIconProvider
      .iconSet('core', 'images/sets/core-icons.svg',24)
      .icon('social:list', 'images/list.svg',36)
}]);

app.controller('RappiController', function($http, $interval, $scope){

	$scope.data = [];
	$scope.data.news = []; 
	$scope.data.detail;
	$scope.data.newsTitle = "";
	$scope.isData = false;


	$scope.toast = function(id){
		toastr.options = {
			  "closeButton": false,
			  "debug": false,
			  "newestOnTop": false,
			  "progressBar": false,
			  "positionClass": "toast-bottom-right",
			  "preventDuplicates": false,
			  "onclick": null,
			  "showDuration": "300",
			  "hideDuration": "1000",
			  "timeOut": "5000",
			  "extendedTimeOut": "1000",
			  "showEasing": "swing",
			  "hideEasing": "linear",
			  "showMethod": "fadeIn",
			  "hideMethod": "fadeOut"
			}
			if(id==0)
				toastr.info('<b style="font-size:14px;">Datos Cargados de Manera Exitosa</b>');
			else 
				toastr.error('<b style="font-size:14px;">Ha ocurrido un error...</b>');
	}


	$scope.details = function(news){

		var id = news.id,
  			title = news.title;
  			image = news.image;

  		if($scope.data.detail == id) {
  			$scope.data.detail = undefined;
  			$scope.data.newsTitle = '';
  		} else {
  			$scope.data.detail = id;
  			$scope.data.newsTitle = title;
  		}
	}

	$scope.file = function($fileContent) {	  		

  		var data = angular.fromJson($fileContent);
  		$scope.show(data);
	},

	$scope.loadData = function(url){
		$scope.isData = false;
		setTimeout(function() { 
	  		$http({
			  		method: 'GET',		  				  		  		
			  		url: url
				}).then(function successCallback(response) {														
					$scope.show(response.data);
					$scope.isData = true;

			  	}, function errorCallback(response) {
			  		$scope.toast(1);
			  		$scope.isData = true;	
			  	});
	  		}, 1000);
	}

	$scope.loadNews = function(url){
		if(url) $scope.loadData(url)
			else $scope.loadData('js/news_mock.json')
	}

  	$scope.show = function(data){
  		
  			$scope.data.news = [];
	  		$scope.data.activeDetail = undefined;
	  		$scope.newsTitle = 'Noticias';
	  		var count = 0;
	  		$scope.toast(0);

			data[count].image = data[count].image + '?ver=' + new Date().getTime();
			$scope.data.news.push(data[count]);	
			$scope.isData = true;

			$interval(function () {
		       	count++;
		       	data[count].image = data[count].image + '?ver=' + new Date().getTime();
				$scope.data.news.push(data[count]);

		    }, 400, data.length - 1);
  	}

  	setTimeout(function() { 
  		$scope.loadNews();
  	}, 1000);

  	
});

