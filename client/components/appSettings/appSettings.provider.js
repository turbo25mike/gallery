'use strict';

angular.module('scottsAppApp')
    .provider("appSettings", function () {
        return {
            $get: function ($resource) {
                return $resource('/api/appSettings/:id').get();
            }
        };
    });