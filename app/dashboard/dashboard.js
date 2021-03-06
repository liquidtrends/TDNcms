'use strict';

angular.module('myApp.dashboard', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/dashboard', {
        templateUrl: 'dashboard/dashboard.html',
        controller: 'DashboardCtrl'
    });
}])

.controller('DashboardCtrl', ['$scope','$firebase','$location','CommonProp', function($scope,$firebase,$location,CommonProp) {
  
  $scope.username = CommonProp.getUser();

  if(!$scope.username){
    $location.path('/home');
  }

  $scope.username = CommonProp.getUser();
  var firebaseObj = new Firebase("https://tdn.firebaseio.com/Jobs");
  var sync = $firebase(firebaseObj);
  $scope.jobs = sync.$asArray();
  
  $scope.logout = function() {
    CommonProp.logoutUser();
  }

  $scope.editJob = function(id) {
    var firebaseObj = new Firebase("https://tdn.firebaseio.com/Jobs/" + id);
    var syn = $firebase(firebaseObj);
    $scope.jobToUpdate = syn.$asObject();
    $('#editModal').modal();
  }

  $scope.update = function() {
    var fb = new Firebase("https://tdn.firebaseio.com/Jobs/" + $scope.jobToUpdate.$id);
    var job = $firebase(fb);
    job.$update({
        title: $scope.jobToUpdate.title,
        description: $scope.jobToUpdate.description,
        emailId: $scope.jobToUpdate.emailId
    }).then(function(ref) {
        $('#editModal').modal('hide');
    }, function(error) {
        console.log("Error:", error);
    });
  }

  $scope.confirmDelete = function(id) {
        var fb = new Firebase("https://tdn.firebaseio.com/Jobs/" + id);
        var job = $firebase(fb);
        $scope.jobToDelete = job.$asObject();
        $('#deleteModal').modal();
    }

  $scope.deleteJob = function() {
        var fb = new Firebase("https://tdn.firebaseio.com/Jobs/" + $scope.jobToDelete.$id);
        var job = $firebase(fb);
        job.$remove().then(function(ref) {
            $('#deleteModal').modal('hide');
        }, function(error) {
            console.log("Error:", error);
        });
    }

}]);