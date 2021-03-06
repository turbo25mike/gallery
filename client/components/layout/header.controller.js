'use strict';

angular.module('scottsAppApp')
    .controller('HeaderCtrl', function ($scope, $location, Auth, appSettings) {

        $scope.menu = [{
            'title': 'Home',
            'link': '/'
    }];

        $scope.appSettings = appSettings;

        $scope.isCollapsed = true;
        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.isAdmin = Auth.isAdmin;
        $scope.getCurrentUser = Auth.getCurrentUser;

        $scope.logout = function () {
            Auth.logout();
            $location.path('/login');
        };

        $scope.isActive = function (route) {
            return route === $location.path();
        };
    });