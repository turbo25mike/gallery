'use strict';

angular.module('scottsAppApp')
    .service('confirmationModal', function ($modal) {

        var Open = function (pageTitle, messageBody, buttonOptions, alternateSize) {
            return $modal.open({
                size: alternateSize ? alternateSize : 'sm',
                template: 
                '<div class="modal-header"><h3 class="modal-title">{{ title }}</h3></div><div class="modal-body"><div data-ng-bind-html="message"></div></div><div class="modal-footer"><button class="btn btn-primary" ng-click="Click(option)" data-ng-repeat="option in options">{{option}}</button></div>',
                backdrop: 'static',
                controller: ['$scope', '$modalInstance', 'title', 'message', 'options',
                    function ($scope, $modalInstance, title, message, options) {

                        $scope.title = title;
                        $scope.message = message;
                        $scope.options = (options !== undefined) ? options : ['Yes', 'No'];

                        $scope.Click = function (value) {
                            $modalInstance.close(value);
                        };
                }],
                resolve: {
                    title: function () {
                        return pageTitle;
                    },
                    message: function () {
                        return messageBody;
                    },
                    options: function () {
                        return buttonOptions;
                    },
                }
            });
        };

        return {
            Open: Open
        };

    });