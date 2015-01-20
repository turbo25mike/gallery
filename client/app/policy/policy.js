'use strict';

angular.module('scottsAppApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/policy', {
        templateUrl: 'app/policy/policy.html',
        controller: 'PolicyCtrl'
      });
  });
