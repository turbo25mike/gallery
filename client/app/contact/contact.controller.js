'use strict';

angular.module('scottsAppApp')
    .controller('ContactCtrl', function ($scope, contact, toastr, appSettings) {
        $scope.user = {};
        $scope.errors = {};
        $scope.appSettings = appSettings;
        $scope.contact = contact.get();

        $scope.disabled = false;

        $scope.send = function (form) {
            $scope.submitted = true;

            if (form.$valid) {
                $scope.disabled = true;
                contact.send(
                    $scope.user,
                    function (scss) {
                        toastr.success('Your message has been sent.');
                    },
                    function (err) {
                        toastr.error('Your message failed to send.');
                    }
                );
            }
        };
    });