'use strict';

angular.module('scottsAppApp')
  .controller('GalleryCtrl', function ($scope, gallery, Auth, $upload) {
    $scope.message = 'Hello';
    
    
    $scope.isAdmin = Auth.isAdmin();
    $scope.galleryItems = gallery.query();
    
    $scope.createGallery = function (form){
        $scope.submitted = true;

      if(form.$valid && Auth.isAdmin()) {
          gallery.save({name: form.name.$modelValue, description: form.description.$modelValue});
       
      }
    };
    
    $scope.$watch('files', function() {
      if (!$scope.files) return;
      $scope.files.forEach(function(file){
        $scope.upload = $upload.upload({
          url: "api/gallery/upload",
          data: {},
          file: file
        }).progress(function (e) {
          file.progress = Math.round((e.loaded * 100.0) / e.total);
          file.status = "Uploading... " + file.progress + "%";
          if(!$scope.$$phase) {
            $scope.$apply();
          }
        }).success(function (data, status, headers, config) {
          $rootScope.photos = $rootScope.photos || [];
          data.context = {custom: {photo: $scope.title}};
          file.result = data;
          $rootScope.photos.push(data);
          if(!$scope.$$phase) {
            $scope.$apply();
          }
        });
      });
    });
    
    $scope.dragOverClass = function($event) {
      var items = $event.dataTransfer.items;
      var hasFile = false;
      if (items != null) {
        for (var i = 0 ; i < items.length; i++) {
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
