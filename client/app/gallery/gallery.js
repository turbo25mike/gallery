'use strict';

angular.module('scottsAppApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/gallery/:id', {
        templateUrl: 'app/gallery/galleryItem.html',
        controller: 'GalleryItemCtrl'
      })
      .when('/gallery', {
        templateUrl: 'app/gallery/gallery.html',
        controller: 'GalleryCtrl'
      });
  });
