var myApp = angular.module('myApp', ['ngResource', 'ngRoute']);

myApp.controller('myController', function($scope, $http) {
	$http.get('/userdata').then(function(returnData){
		//create userdata object formatted same as userSchema
		$scope.userdata = {
			githubId		: returnData.data._json.id,
			name 			: returnData.data._json.name,
			location		: returnData.data._json.location,
			email			: returnData.data._json.email,
			company			: returnData.data._json.company,
			hireable		: returnData.data._json.hireable,
			bio				: returnData.data._json.bio,
			githubProfile	: returnData.data._json.html_url,
			githubSince		: returnData.data._json.created_at,
			reposNum		: returnData.data._json.public_repos,
			followers		: returnData.data._json.followers,
			starredRepos	: returnData.data._json.starred_url,
			profilePhoto	: returnData.data._json.avatar_url
		};
		console.log("$scope.userdata: ",$scope.userdata);
	}, function(error){
		console.log("ERROR returned from myController");
	});
});

myApp.controller('roloController', function($scope, $http){
	$http.get('/allusers').then(function(returnData){
		console.log(returnData);
		//TO DO parse out individual users from returned json object
	})
});

