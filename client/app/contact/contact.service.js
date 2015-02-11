'use strict';

angular.module('scottsAppApp')
  .service('contact', function ($resource) {
    return $resource('/api/contact/:id/', {
            id: '@_id'
        }, {
            update: {
                method: 'PUT',
                params: {
                }
            },
            get: {
                method: 'GET',
                params: {
                    id: '@_id'
                }
            },
            send: {
                method: 'POST',
                params: {
                }
            }
        });
  });
