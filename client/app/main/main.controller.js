'use strict';

angular.module('scottsAppApp')
    .controller('MainCtrl', function ($scope, $http, $interval, appSettings) {

        appSettings.GetGoogleID().$promise.then(function (google) {
            ga('create', google.id);
            ga('send', 'pageview');
        });

        $scope.images = [
            {
                source: "assets/images/bear_1.jpg",
                title: "What are you smirking about?"
                    },
            {
                source: "assets/images/cougar_1.jpg",
                title: "No makeup - no problem."
                    },
            {
                source: "assets/images/indian_1.jpg",
                title: "Grace and beauty."
                    },
            {
                source: "assets/images/lumberjack_1.jpg",
                title: "Another smirk."
                    },
            {
                source: "assets/images/sass_1.jpg",
                title: "What are you looking at?"
                    },
            {
                source: "assets/images/seahawks_1.jpg",
                title: "Saddness."
                    }
                ];

        $scope.setSelected = function (selected) {
            $scope.selectedImage = selected;
        };

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