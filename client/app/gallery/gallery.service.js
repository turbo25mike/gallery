'use strict';

angular.module('scottsAppApp')
  .service('gallery', function ($resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return $resource('/api/gallery/:id/', {
            id: '@_id'
        }, {
            create: {
                method: 'POST',
                params: {
                    controller: 'password'
                }
            },
            update: {
                method: 'PUT',
                params: {
                    controller: 'password'
                }
            },
            get: {
                method: 'GET',
                params: {
                    id: '@_id'
                }
            }
        });
  });
