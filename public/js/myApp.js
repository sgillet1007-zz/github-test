var myApp = angular.module('myApp', ['ngResource', 'ngRoute']);

myApp.controller('userController', function($scope, $http, $resource) {
	$scope.editing = false;
	$http.get('/users/get').then(function(response){
		$scope.ghUserData = {
			_id				: String(response.data.id),
			name 			: response.data.name,
			location		: response.data.location,
			email			: response.data.email,
			company			: response.data.company,
			hireable		: response.data.hireable,
			bio				: response.data.bio,
			githubProfile	: response.data.html_url,
			githubSince		: response.data.created_at,
			reposNum		: response.data.public_repos,
			followers		: response.data.followers,
			starredRepos	: response.data.starred_url,
			profilePhoto	: response.data.avatar_url
		};
		$scope.userData = $scope.ghUserData;
	}).then(function(){
		$http.post('/users/create', $scope.userData);
	}).then(function(){
		return $http.get('/users/getUser');
	}).then(function(responseData){
		$scope.userData = responseData.data; //this updates $scope.userData and card fields
		console.log('responseData.data = ', responseData.data);
	}), function(error){
		console.log("Error: ", error);
	};

	$scope.editToggle = function(){
		$scope.editing = !$scope.editing;
	};

	$scope.updateUser = function(){
		$http.post('/users/putUser', $scope.userData).then(function(response){
			console.log('User updated!!')
		}), function(error){
		console.log("Error: ", error);
		};
		$scope.editing = !$scope.editing;
	};
});