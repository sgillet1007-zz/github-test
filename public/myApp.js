var myApp = angular.module('myApp', ['ngResource', 'ngRoute']);

myApp.controller('myController', function($scope, $http) {
	$http.get('/userdata').then(function(returnData){
		console.log(returnData);
		$scope.user_githubId = returnData.data._json.id;
		$scope.user_name = returnData.data._json.name;
		$scope.user_location = returnData.data._json.location;		
		$scope.user_email = returnData.data._json.email;		
		$scope.user_company = returnData.data._json.company;		
		$scope.user_hireable = returnData.data._json.hireable;		
		$scope.user_bio = returnData.data._json.bio;		
		$scope.user_githubProfile = returnData.data._json.html_url;		
		$scope.user_githubSince = returnData.data._json.created_at;		
		$scope.user_reposNum = returnData.data._json.public_repos;		
		$scope.user_followers = returnData.data._json.followers;		
		$scope.user_starredRepos = returnData.data._json.starred_url;		
		$scope.user_profilePhoto = returnData.data._json.avatar_url;		
	})
});

myApp.controller('roloController', function($scope, $http){
	$http.get('/allusers').then(function(returnData){
		console.log(returnData);
		//TO DO parse out individual users from returned json object
	})
});

