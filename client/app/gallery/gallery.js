'use strict';

angular.module('scottsAppApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/gallery', {
        templateUrl: 'app/gallery/gallery.html',
        controller: 'GalleryCtrl'
      });
  });
