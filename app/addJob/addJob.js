'use strict';

angular.module('myApp.addJob', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/addJob', {
    templateUrl: 'addJob/addJob.html',
    controller: 'AddJobCtrl'
  });
}])

.controller('AddJobCtrl', ['$scope','$firebase','$location','CommonProp',function($scope,$firebase,$location,CommonProp) {
    $scope.AddJob = function(){
  var title = $scope.job.title;
        var description = $scope.job.description;
  
  var firebaseObj = new Firebase("https://tdn.firebaseio.com/Jobs");
      var fb = $firebase(firebaseObj);

  fb.$push({ title: title,description: description,emailId: CommonProp.getUser() }).then(function(ref) {
      console.log(ref); 
    $location.path('/dashboard');
  }, function(error) {
      console.log("Error:", error);
  });

    }
}]);