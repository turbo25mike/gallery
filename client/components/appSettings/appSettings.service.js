'use strict';

angular.module('scottsAppApp')
    .service('appSettings', function ($resource) {

        var settings = $resource('/api/appSettings/:id').get();

        settings.$promise.then(function () {
            window.fbAsyncInit = function () {
                window.FB.init({
                    appId: settings.facebook_id,
                    xfbml: true,
                    version: 'v2.2'
                });
            };

            window.ga('create', settings.google.analytics_id);
            window.ga('send', 'pageview');
        });

        return settings;

    });