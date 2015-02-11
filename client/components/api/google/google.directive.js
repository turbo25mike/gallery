'use strict';

angular.module('scottsAppApp')
    .directive('google', function ($sce, appSettings, contact) {
        return {
            template: '<div ng-bind-html="apiScript"></div>',
            restrict: 'EA',
            link: function (scope, element, attrs) {
                appSettings.$promise.then(function () {
                    
                    var contactInfo = contact.get();
                    
                    contactInfo.$promise.then(function(){
                    
                        window.googleMapOptions = {
                        zoom: contactInfo.map_zoom,
                        lat: contactInfo.latitude,
                        lon: contactInfo.longitude
                    }
                    
                    var script = '<script src="http://maps.googleapis.com/maps/api/js?key=' + appSettings.google.map_id + '&callback=initializeGoogleMap"></script>';
                    script += '<div id="map-canvas" style="width: 100%; height: 400px"></div>';
                    scope.apiScript = $sce.trustAsHtml(script);
                        
                    });
                    
                });
            }
        };
    });

function initializeGoogleMap(){
    var mapOptions = {
    zoom: googleMapOptions.zoom,
    center: new google.maps.LatLng(googleMapOptions.lat, googleMapOptions.lon)
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
}

