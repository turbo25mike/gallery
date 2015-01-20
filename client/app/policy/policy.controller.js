'use strict';

angular.module('scottsAppApp')
  .controller('PolicyCtrl', function ($scope, appSettings) {
    $scope.appSettings = appSettings;
  });
