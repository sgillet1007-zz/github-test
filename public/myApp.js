var myApp = angular.module('myApp', ['ngResource', 'ngRoute']);

myApp.controller('myController', function($scope, $http) {
	$http.get('/userdata').then(function(returnData){
		$scope.userdata = returnData.data._json; //$scope.userdata is an object
		console.log("$scope.userdata: ",$scope.userdata);
		$scope.userCardData = {};

	//check if db has a record	
	}, function(error){
		console.log("ERROR returned from myController");
	})
});

myApp.controller('roloController', function($scope, $http){
	$http.get('/allusers').then(function(returnData){
		console.log(returnData);
		//TO DO parse out individual users from returned json object
	})
});

