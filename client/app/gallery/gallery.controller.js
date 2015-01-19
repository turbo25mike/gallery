'use strict';

angular.module('scottsAppApp')
    .controller('GalleryCtrl', function ($scope, gallery, Auth, $upload, appSettings) {
        $scope.message = 'Hello';

        $scope.appSettings = appSettings;

        $scope.isAdmin = Auth.isAdmin();
        $scope.galleryItems = gallery.query();

        $scope.createGallery = function (form) {
            $scope.submitted = true;

            if (form.$valid && Auth.isAdmin() && $scope.files.length > 0 && $scope.files[0].data) {
                gallery.save({
                    title: form.title.$modelValue,
                    shortDescription: form.shortDescription.$modelValue,
                    description: form.description.$modelValue,
                    imageID: $scope.files[0].data.public_id,
                    imageFormat: $scope.files[0].data.format,
                    transformations: form.transformations.$modelValue,
                    price: form.price.$modelValue,
                    salePrice: form.salePrice.$modelValue,
                    quantity: form.quantity.$modelValue,
                    commissionOnly: form.commissionOnly.$modelValue,
                    displayOnHome: form.displayOnHome.$modelValue,
                    active: form.active.$modelValue,
                    category: (form.categories.$modelValue) ? form.categories.$modelValue.split(','):[]
                });
            }
        };
    
        $scope.$watch('files', function () {
            if (!$scope.files) return;
            $scope.files.forEach(function (file) {
                $scope.upload = $upload.upload({
                    url: "api/gallery/upload",
                    data: {},
                    file: file
                }).progress(function (e) {
                    file.progress = Math.round((e.loaded * 100.0) / e.total);
                    file.status = "Uploading... " + file.progress + "%";
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                }).success(function (data, status, headers, config) {
                    file.data = data;
                });
            });
        });

        $scope.dragOverClass = function ($event) {
            var items = $event.dataTransfer.items;
            var hasFile = false;
            if (items != null) {
                for (var i = 0; i < items.length; i++) {
                    if (items[i].kind == 'file') {
                        hasFile = true;
                        break;
                    }
                }
            } else {
                hasFile = true;
            }
            return hasFile ? "dragover" : "dragover-err";
        };
    });