var myApp = angular.module('myApp', ['ngResource', 'ngRoute']);

// myApp.config(function($routeProvider){
// 	$routeProvider
// 		// this route is activated by a login button that redirects to /login.
// 		.when('/', {
// 			// templateURL is injected whereever ng-View directive is present in markup.
// 			templateUrl : '/views/index', 
// 			// this is the frontend controller that grabs the data from the back-end controller and 
// 			// is sent along with the template to append data and handle behavior etc!
// 			controller  : 'homeController' 
// 		});
// 	// because route is dynamic on backend this front end route still uses a param to send template. 
// 	$routeProvider
// 		// this route is activated by a login button that redirects to /login.
// 		.when('/login', {
// 			// templateURL is injected whereever ng-View directive is present in markup.
// 			templateUrl : '/views/login', 
// 			controller  : 'loginController' 
// 		});
// 	// this will add in template url after data has been sent back from the controller which got its data from the factory and & back
// 	// end route. 
// 	$routeProvider
// 		.when('/profile/:username', {
// 			templateUrl : '/views/rolodex',
// 			controller  : 'roloController'
// 		});
// });

// Profiles Controller 
myApp.controller('roloController', function($scope, $http) {
	$scope.user = 'name';
	// $scope.userContainer = user;
	// $scope.profileUser = userFactory.model.get( { username : $routeParams.username } ); 
	// $scope.editing = false;
	// $scope.onEditing = function() {
	// 	$scope.editing = true;
	// };
	// $scope.submitToServer = function() {
	// 	userFactory.model.save($scope.profileUser)
	// 	$scope.editing = false;
	// };
});

// // Search Controller. 
// myApp.controller('searchController', function($scope, $http) {
// 	$scope.userContainer = authUser;
// 	$http.get('/api/allUsers').
// 		then(function(returnData){
// 			$scope.profiles = returnData.data
// 		});
// });

