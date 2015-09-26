var myApp = angular.module('myApp', ['ngResource', 'ngRoute']);

// myApp.config(function($routeProvider){
// // 	$routeProvider
// // 		// this route is activated by a login button that redirects to /login.
// // 		.when('/', {
// // 			// templateURL is injected whereever ng-View directive is present in markup.
// // 			templateUrl : '/views/home', 
// // 			// this is the frontend controller that grabs the data from the back-end controller and 
// // 			// is sent along with the template to append data and handle behavior etc!
// // 			controller  : 'homeController' 
// // 		});
// // 	// because route is dynamic on backend this front end route still uses a param to send template. 
// // 	$routeProvider
// // 		// this route is activated by a login button that redirects to /login.
// // 		.when('/login', {
// // 			// templateURL is injected whereever ng-View directive is present in markup.
// // 			templateUrl : '/views/login', 
// // 			controller  : 'loginController' 
// // 		});
// // 	// this will add in template url after data has been sent back from the controller which got its data from the factory and & back
// // 	// end route. 
// 	$routeProvider
// 		.when('/api/users/:username', { // why use a dynamic route here to render ones profile via the url?
// 			templateUrl : '/views/index',
// 			controller  : 'profileController'
// 		});
// // 	$routeProvider 
// // 		.when('/search', {
// // 			templateUrl : '/views/search',
// // 			controller  : 'searchController'
// // 		});
// });

//one controller for each state:
// Controller for State: newUser, (saves github user to db)
myApp.controller('newUserController', function($scope, $http, $resource) {
	$scope.userData = {};
	$scope.ghUserData = {};
	$http.get('/users/get').then(function(response){
		$scope.ghUserData = {
			_id				: response.data.id,
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
		console.log("$scope.userData: ", $scope.userData);
	}).then(function(){
		console.log("$scope.userData from POST request: ", $scope.userData);
		$http.post('/users/create', $scope.userData)
	}).then(function(){
		console.log('About to get user data from db...');
		$http.get('/users/getUser')
	}), function(error){
		console.log("Error from promise chain");
	};
});
// // Controller for State: users, (query all users)
// myApp.controller('usersController', function($scope, $http, $resource) {
	
// });

// // Controller for State: viewUser, (get user data from db)
// myApp.controller('viewUserController', function($scope, $http, $resource) {
// 	$http.get('/api/users/:_id').then(function(response){
// 		console.log("response: ", response)
// 	}, function(error){
// 		console.log("Error getting user data");
// 	});
// });

// // Controller for State: editUser, (update user db entry)
// myApp.controller('editUserController', function($scope, $http, $resource) {
	
// });

// // User grab factory injected into profileController
// myApp.factory('userFactory', function($resource, $http){
// 	var model = $resource('/users/:id', {id : '@id'})
// 	return {model : model}
// 	});