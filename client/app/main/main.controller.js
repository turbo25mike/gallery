'use strict';

angular.module('scottsAppApp')
    .controller('MainCtrl', function ($scope, $http, $interval, gallery, appSettings, cloudinary) {

        $scope.appSettings = appSettings;

        $scope.images = gallery.getHome();
        $scope.images.$promise.then(function () {

            appSettings.$promise.then(function () {
                angular.forEach($scope.images, function (image) {
                    image.primaryImage = cloudinary.getPrimaryImage(image, appSettings);
                });
            });

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