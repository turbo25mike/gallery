'use strict';

angular.module('scottsAppApp')
  .controller('HeaderCtrl', function ($scope, $location, Auth, appSettings) {
    
    $scope.appName = '';
    
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];
    
    appSettings.GetAppName().$promise.then(function(result){
            $scope.appName = result.name;
    });

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });