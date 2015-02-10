'use strict';

angular.module('scottsAppApp')
    .directive('paypal', function ($sce, appSettings) {
        return {
            template: '<form ng-show="appSettings.$resolved && item.quantity > 0" name="_xclick" action="https://www.paypal.com/us/cgi-bin/webscr" method="post">' +
                '<input type="hidden" name="cmd" value="_xclick">' +
                '<input type="hidden" name="business" value="{{appSettings.paypalID}}">' +
                '<input type="hidden" name="currency_code" value="USD">' +
                '<input type="hidden" name="item_name" value="{{item.title}}">' +
                '<input type="hidden" name="amount" value="{{(item.salePrice || item.price)}}">' +
                '<input type="image" src="http://www.paypalobjects.com/en_US/i/btn/btn_buynow_LG.gif" border="0" name="submit" alt="Make payments with PayPal - it\'s fast, free and secure!">' +
                '</form>',
            restrict: 'EA',
            scope: {
                item: '='
            },
            link: function (scope, element, attrs) {
                scope.appSettings = appSettings;
            }
        };
    });