/* jshint camelcase: false */
'use strict';

angular.module('scottsAppApp')
    .controller('GalleryItemCtrl', function ($scope, $routeParams, $location, gallery, Auth, $upload, appSettings, toastr, confirmationModal) {

        $scope.appSettings = appSettings;
        $scope.isAdmin = Auth.isAdmin();
        $scope.itemFound = false;
        $scope.item = {};

        if ($routeParams.id === 'new') {
            $scope.isNew = true;
            $scope.itemFound = true;
        } else {
            $scope.item = gallery.get({
                id: $routeParams.id
            });
            $scope.item.$promise.then(function () {
                $scope.item.categoriesString = $scope.item.category.toString();
                $scope.itemFound = true;
            });
        }

        $scope.deleteItem = function () {
            confirmationModal.Open('Delete Item', 'This item will be permanently removed. Are you sure you want to continue?<br /><br />', ['OK', 'Cancel']).result.then(function (result) {
                if (result === 'OK') {
                    gallery.delete({
                            id: $scope.item._id
                        },
                        function () {
                            toastr.success('Item removed successfully');
                            $location.path('gallery');
                        });
                }
            });
        };


        $scope.createGallery = function (form) {
            $scope.submitted = true;

            if (!$scope.item.imageID || !$scope.item.imageFormat) {
                return;
            }

            if (form.$valid && Auth.isAdmin()) {
                var saveData = {
                    _id: $scope.item._id,
                    title: form.title.$modelValue,
                    shortDescription: form.shortDescription.$modelValue,
                    description: form.description.$modelValue,
                    imageID: $scope.item.imageID,
                    imageFormat: $scope.item.imageFormat,
                    transformations: form.transformations.$modelValue,
                    price: form.price.$modelValue,
                    salePrice: form.salePrice.$modelValue,
                    quantity: form.quantity.$modelValue,
                    commissionOnly: form.commissionOnly.$modelValue,
                    displayOnHome: form.displayOnHome.$modelValue,
                    active: form.active.$modelValue,
                    category: (form.categoriesString.$modelValue) ? form.categoriesString.$modelValue.split(',') : []
                };

                if ($scope.item._id) {
                    gallery.update(saveData,
                        function () {
                            toastr.success('Item Saved.');
                        });
                } else {
                    gallery.save(saveData,
                        function () {
                            toastr.success('Item Saved.');
                        });
                }
            }
        };

        $scope.$watch('files', function () {
            if (!$scope.files) {
                return;
            }
            $scope.files.forEach(function (file) {
                $scope.upload = $upload.upload({
                    url: 'api/gallery/upload',
                    data: {},
                    file: file
                }).progress(function (e) {
                    file.progress = Math.round((e.loaded * 100.0) / e.total);
                    file.status = 'Uploading... ' + file.progress + '%';
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                }).success(function (data) {
                    $scope.item.imageID = data.public_id;
                    $scope.item.imageFormat = data.format;
                    file.data = data;
                });
            });
        });

        $scope.dragOverClass = function ($event) {
            var items = $event.dataTransfer.items;
            var hasFile = false;
            if (items !== null) {
                for (var i = 0; i < items.length; i++) {
                    if (items[i].kind === 'file') {
                        hasFile = true;
                        break;
                    }
                }
            } else {
                hasFile = true;
            }
            return hasFile ? 'dragover' : 'dragover-err';
        };
    });