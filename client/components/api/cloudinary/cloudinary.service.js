'use strict';

angular.module('scottsAppApp')
    .service('cloudinary', function () {

        function getPrimaryImage(item, appSettings) {
            
            var baseUrl = 'http://res.cloudinary.com/' + appSettings.cloudName + '/image/upload/';

            var primaryThumbnailUrl = baseUrl;

            if (!item || item.images.length < 1) {
                return;
            }
            var primaryImg;

            for (var i = 0; i < item.images.length; i++) {
                if (item.images[i].mainView) {
                    primaryImg = item.images[i];
                    break;
                }
            }
            if (primaryImg) {
                primaryThumbnailUrl += ((primaryImg.transformations) ? primaryImg.transformations : '') + '/' + primaryImg.id + '.' + primaryImg.format;
            } else {
                primaryThumbnailUrl += ((item.images[0].transformations) ? item.images[0].transformations : '') + '/' + item.images[0].id + '.' + item.images[0].format;
            }

            return primaryThumbnailUrl;
        }

        return {
            getPrimaryImage: getPrimaryImage
        };
    });