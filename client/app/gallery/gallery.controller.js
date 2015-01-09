'use strict';

angular.module('scottsAppApp')
  .controller('GalleryCtrl', function ($scope, gallery, Auth) {
    $scope.message = 'Hello';
    
    
    $scope.isAdmin = Auth.isAdmin();
    $scope.galleries = gallery.query();
    
    $scope.createGallery = function (form){
        $scope.submitted = true;

      if(form.$valid && Auth.isAdmin()) {
          gallery.save({name: form.name.$modelValue, description: form.description.$modelValue});
       
      }
    };
  });
