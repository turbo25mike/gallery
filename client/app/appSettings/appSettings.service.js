'use strict';

angular.module('scottsAppApp')
  .service('appSettings', function ($resource) {
    return $resource('/api/appSettings/:id', {}, {
            GetGoogleID: {
                method: 'GET',
                params: {
                    id: 'googleID'
                }
            },
        GetAppName: {
                method: 'GET',
                params: {
                    id: 'appName'
                }
            }
        });
  });
