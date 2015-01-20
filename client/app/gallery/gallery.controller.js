'use strict';

angular.module('scottsAppApp')
    .controller('GalleryCtrl', function ($scope, gallery, Auth, $upload, appSettings) {
        $scope.message = 'Hello';

        $scope.appSettings = appSettings;
        $scope.filters = [];
        $scope.isAdmin = Auth.isAdmin();
        $scope.galleryItems = gallery.query();
        $scope.galleryItems.$promise.then(function () {

            angular.forEach($scope.galleryItems, function (item) {

                if (item.category) {
                    angular.forEach(item.category, function (itemFilter) {
                        var found = false;
                        angular.forEach($scope.filters, function (filter) {
                            if (filter.name === itemFilter) {
                                found = true;
                                filter.count++;
                            }
                        });
                        if (!found) {
                            $scope.filters.push({
                                name: itemFilter,
                                count: 1
                            });
                        }

                    });
                }
            });
        });

        $scope.searchByCategory = function(category) {
            $scope.search = category;
        };
    });