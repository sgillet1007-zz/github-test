var myApp = angular.module('myApp', []);

myApp.controller('userController', function($scope, $http) {
	$scope.editing = false;
	$scope.visible = false;
	
	$http.get('/users/get').then(function(response){
		var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		var joinedYear = response.data.created_at.slice(0, 4);
		var joinedMonth = monthNames[Number(response.data.created_at.slice(5, 7))-1];
		var joinedDate = joinedMonth + ", " + joinedYear;
		$scope.userData = {
			_id				    : String(response.data.id),
			name 			    : response.data.name,
			location		    : response.data.location,
			email			    : response.data.email,
			company			    : response.data.company,
			hireable		    : response.data.hireable,
			bio				    : response.data.bio,
			githubProfile	    : response.data.html_url,
			githubSince		    : joinedDate,
			reposNum		    : response.data.public_repos,
			followers		    : response.data.followers,
			starredRepos	    : response.data.starred_url,
			starredReposArray   : [], //an array of starred repos objects
			languagesList       : [], //array of 'language value' strings... use .count function and .join method to make string to display on card
			languagesSumStrings	: '', //string to display on card
			profilePhoto	   	: response.data.avatar_url
		};
	}).then(function(){
		return $http.get('/user/languages'); //github api call to get array of starred repo objects
	}).then(function(response){
		$scope.userData.starredReposArray = response.data;
		var languagesArray =[];
		for(var i = 0; i<response.data.length;i++){
			if (response.data[i].language != null){
				languagesArray.push(response.data[i].language); //only adds language to array if value exists
			}
		}
		return languagesArray
	}).then(function(response){
		$scope.userData.languagesList = response;
		var langCount = $scope.count($scope.userData.languagesList); //creates obj 'langCount' of format --> { language name : starred repo count }
		var langStringArray = [];
		for (lang in langCount){
			langStringArray.push(" "+lang+" ("+String(langCount[''+lang+'']) +" starred repos)"); //uses bracket notation to access count value for each language key in langCount obj
		}
		$scope.userData.languagesSumStrings = langStringArray.join();
	}).then(function(){
		$http.post('/users/create', $scope.userData);
	}).then(function(){
		return $http.get('/users/getUser');
	}).then(function(responseData){
		$scope.userData = responseData.data;
		$scope.visible = true;    //make the card visible only after data comes back from database
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
	//returns object with counts of each unique element from input array
	$scope.count = function(array, classifier) {
    	return array.reduce(function(counter, item) {
        	var p = (classifier || String)(item);
        	counter[p] = counter.hasOwnProperty(p) ? counter[p] + 1 : 1;
        	return counter;
    		}, {})
	};
});

myApp.controller('rolodexController', function($scope, $http){
	var self = this;
	$http.get('/getUsers').then(function(response){
		self.rolodex = response.data;
	}),function(error){
		console.log("Rolodex Error: ", error);
	};

});