'use strict';

angular.module('scottsAppApp')
    .controller('GalleryItemCtrl', function ($scope, gallery, Auth, $upload, appSettings) {
        $scope.appSettings = appSettings;

        $scope.isAdmin = Auth.isAdmin();
    });