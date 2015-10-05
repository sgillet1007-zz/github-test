var myApp = angular.module('myApp', []);

myApp.controller('userController', function($scope, $http) {
	var self = this;
	self.editing = false;
	
	$http.get('/users/get').then(function(response){
		var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		var joinedYear = response.data.created_at.slice(0, 4);
		var joinedMonth = monthNames[Number(response.data.created_at.slice(5, 7))-1];
		var joinedDate = joinedMonth + ", " + joinedYear;
		self.userData = {
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
		self.userData.starredReposArray = response.data;
		var languagesArray =[];
		for(var i = 0; i<response.data.length;i++){
			if (response.data[i].language != null){
				languagesArray.push(response.data[i].language); //only adds language to array if value exists
			}
		}
		return languagesArray
	}).then(function(response){
		self.userData.languagesList = response;
		var langCount = self.count(self.userData.languagesList); //creates obj 'langCount' of format --> { language name : starred repo count }
		var langStringArray = [];
		for (lang in langCount){
			langStringArray.push(" "+lang+" ("+String(langCount[''+lang+'']) +" starred repos)"); //uses bracket notation to access count value for each language key in langCount obj
		}
		self.userData.languagesSumStrings = langStringArray.join();
	}).then(function(){
		$http.post('/users/create', self.userData);
	}).then(function(){
		return $http.get('/users/getUser');
	}).then(function(responseData){
		self.userData = responseData.data;
	}), function(error){
		console.log("Error: ", error);
	};

	self.editToggle = function(){
		self.editing = !self.editing;
	};
	
	self.updateUser = function(){
		$http.post('/users/putUser', self.userData).then(function(response){
			console.log('User updated!!')
		}), function(error){
		console.log("Error: ", error);
		};
		self.editing = !self.editing;
	};
	//returns object with counts of each unique element from input array
	self.count = function(array, classifier) {
    	return array.reduce(function(counter, item) {
        	var p = (classifier || String)(item);
        	counter[p] = counter.hasOwnProperty(p) ? counter[p] + 1 : 1;
        	return counter;
    		}, {})
	};
});

myApp.controller('rolodexController', function($http){
	var self = this;
	$http.get('/getUsers').then(function(response){
		self.rolodex = response.data;
		console.log("self.rolodex: ", self.rolodex)
	}),function(error){
		console.log("Rolodex Error: ", error);
	};

});