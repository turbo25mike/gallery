/* jshint camelcase: false */
'use strict';

angular.module('scottsAppApp')
    .controller('GalleryItemCtrl', function ($scope, $routeParams, $location, gallery, Auth, $upload, appSettings, toastr, confirmationModal) {


        $scope.appSettings = appSettings;
        $scope.isAdmin = Auth.isAdmin();
        $scope.itemFound = false;
        $scope.item = {
            images: []
        };

        if ($routeParams.id === 'new') {
            $scope.isNew = true;
            $scope.itemFound = true;
        } else {
            $scope.item = gallery.get({
                id: $routeParams.id
            });

            $scope.item.$promise.then(function () {
                $scope.item.categoriesString = ($scope.item.category) ? $scope.item.category.toString() : '';
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

            if (form.$valid && Auth.isAdmin()) {

                if ($scope.item.images.length === 0) {
                    toastr.warning('An image is required.');
                    return;
                }

                var saveData = {
                    _id: $scope.item._id,
                    title: form.title.$modelValue,
                    shortDescription: form.shortDescription.$modelValue,
                    description: form.description.$modelValue,
                    price: form.price.$modelValue,
                    salePrice: form.salePrice.$modelValue,
                    images: $scope.item.images,
                    quantity: form.quantity.$modelValue,
                    displayOnHome: form.displayOnHome.$modelValue,
                    active: form.active.$modelValue,
                    category: (form.categoriesString.$modelValue) ? form.categoriesString.$modelValue.split(',') : []
                };

                if ($scope.item._id) {
                    gallery.update(
                        saveData,
                        function () {
                            toastr.success('Item Saved.');
                        });
                } else {
                    gallery.save(
                        saveData,
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
                    if (!data.error) {
                        $scope.item.images.push({
                            id: data.public_id,
                            format: data.format,
                            order: $scope.item.images.length || 0,
                            transformations: 'w_300,h_300'
                        });
                    } else {
                        file.error = true;
                        toastr.error("failed to upload [" + file.name + "] error: " + data.error.code);
                    }
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

        $scope.move = function (itemOrder, direction) {
            if (direction === 'up') {
                angular.forEach($scope.item.images, function (image) {
                    if (image.order === itemOrder) {
                        image.order--;
                    } else if (image.order === itemOrder - 1) {
                        image.order++;
                    }
                });
            } else {
                angular.forEach($scope.item.images, function (image) {
                    if (image.order === itemOrder) {
                        image.order++;
                    } else if (image.order === itemOrder + 1) {
                        image.order--;
                    }
                });
            }
        };

        $scope.delete = function (image) {
            var foundIndex = null;
            for (var i = 0; i < $scope.item.images.length; i++) {
                if ($scope.item.images[i].id === image.id) {
                    foundIndex = i;
                    break;
                }
            }
            if (foundIndex !== null) {
                $scope.item.images.splice(foundIndex, 1);
                toastr.success('Your image has been removed.  Please remember to save this change to apply.');
            }

        };
    });