'use strict';

angular.module('scottsAppApp')
  .service('gallery', function ($resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return $resource('/api/gallery/:id/', {
            id: '@_id'
        }, {
            create: {
                method: 'POST'
            },
            update: {
                method: 'PUT'
            },
            get: {
                method: 'GET',
                params: {
                    id: '@_id'
                }
            },
            getHome: {
                method: 'GET',
                params: {
                    id: 'home'
                },
                isArray: true
            }
        });
  });
