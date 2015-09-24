var myApp = angular.module('myApp', ['ngResource', 'ngRoute']);

myApp.controller('myController', function($scope, $http) {
	$scope.editing = false;

	$http.get('/userdata').then(function(returnData){
		//create userdata object formatted same as userSchema
		$scope.userdata = {
			_id				: returnData.data._json.id,
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
	}, function(error){
		console.log("ERROR returned from $http.get '/userdata'");
		});

	$http.get('/userdataDB').then(function(response){
		$scope.userdataDB = {
			_id				: response._id,
			name 			: response.name,
			location		: response.location,
			email			: response.email,
			company			: response.company,
			hireable		: response.hireable,
			bio				: response.bio,
			githubProfile	: response.html_url,
			githubSince		: response.created_at,
			reposNum		: response.public_repos,
			followers		: response.followers,
			starredRepos	: response.starred_url,
			profilePhoto	: response.avatar_url
		};
		console.log("/userdataDB response: ",response);
		// console.log($scope.userdataDB);
	},function(error){
		console.log("ERROR returned from $http.get '/userdataDB'");
		});

	$scope.send = function (){
		$http.post('/post', $scope.userdata).
			then(function(response){
				response.data.err ? (
					$scope.postError = true,
					console.log('POST Error')
					) : (
					$scope.postError = false,
					console.log("This is the response of POST: ", response),
					$scope.response = response
					);
			}, 
			function(response){
				$scope.postError = true;
				console.log('POST Error')
			});
		$scope.editing ? !$scope.editing : $scope.editing;
	};

	$scope.editToggle = function(){
		$scope.editing = !$scope.editing;
	}
});

myApp.controller('roloController', function($scope, $http){
	$scope.display = function(){
		$http.get('/allusers').then(function(returnData){
			console.log("roloController returnData.data: ",returnData.data);
			$scope.allusers = returnData.data;
		})
	}
});

