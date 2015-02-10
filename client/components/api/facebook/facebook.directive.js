'use strict';

angular.module('scottsAppApp')
    .directive('facebook', function ($sce, appSettings) {
        return {
            template: '<div ng-bind-html="apiScript"></div>',
            restrict: 'EA',
            link: function (scope, element, attrs) {
                appSettings.$promise.then(function () {
                    var script = '<div id="fb-root"></div>' +
                        '<script>(function(d, s, id) {' +
                        'var js, fjs = d.getElementsByTagName(s)[0];' +
                        'if (d.getElementById(id)) return;' +
                        'js = d.createElement(s); js.id = id;' +
                        'js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&appId=' + appSettings.facebookID + '&version=v2.0";' +
                        'fjs.parentNode.insertBefore(js, fjs);' +
                        '}(document, \'script\', \'facebook-jssdk\'));</script>' +
                        '<div class="fb-like-box" data-href="' + appSettings.facebookPage + '" data-colorscheme="light" data-show-faces="false" data-header="false" data-stream="false" data-show-border="false"></div>';
                    scope.apiScript = $sce.trustAsHtml(script);
                });
            }
        };
    });