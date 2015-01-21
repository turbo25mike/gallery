'use strict';

angular.module('scottsAppApp')
    .controller('MainCtrl', function ($scope, $http, $interval, gallery, appSettings) {

    $scope.appSettings = appSettings;
        $scope.images = gallery.getHome();
        $scope.images.$promise.then(function () {
            // Default to a random image.
            $scope.selectedImage = Math.floor(
                (Math.random() * $scope.images.length * 2) % $scope.images.length
            );

            $interval(function () {
                $scope.selectedImage = Math.floor(
                    (Math.random() * $scope.images.length * 2) % $scope.images.length
                );
            }, 5000);
        });

        $scope.setSelected = function (selected) {
            $scope.selectedImage = selected;
        };
    });