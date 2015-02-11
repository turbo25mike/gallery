'use strict';

angular.module('scottsAppApp')
    .controller('AdminCtrl', function ($scope, $http, Auth, User, toastr, contact) {

        // Use the User $resource to fetch all users
        $scope.users = User.query();
        $scope.auth = Auth;
        $scope.contact = contact.get();

        $scope.delete = function (user) {
            User.remove({
                id: user._id
            });
            angular.forEach($scope.users, function (u, i) {
                if (u === user) {
                    $scope.users.splice(i, 1);
                }
            });
        };

        $scope.setRole = function (user, role) {
            Auth.changeRole(user._id, role)
                .then(function () {
                    user.role = role;
                    toastr.success('Role was successfully changed.');
                })
                .catch(function () {
                    toastr.error('Role failed to change.');
                });
        };

        $scope.saveContact = function (form) {
            if (form.$valid) {
                var saveData = {
                    _id: $scope.contact._id,
                    email: form.email.$modelValue,
                    phone: form.phone.$modelValue,
                    address: form.address.$modelValue,
                    city: form.city.$modelValue,
                    state: form.state.$modelValue,
                    zip: form.zip.$modelValue,
                    latitude: form.latitude.$modelValue,
                    longitude: form.longitude.$modelValue,
                    map_zoom: form.map_zoom.$modelValue
                };
                
                if (contact._id) {
                    contact.update(
                        saveData,
                        function () {
                            toastr.success('Contact data saved.');
                        },
                    function () {
                        toastr.error('Failed to save contact details.');
                    });
                } else {
                    contact.save(
                        saveData,
                        function () {
                            toastr.success('Item Saved.');
                        },
                    function () {
                        toastr.error('Failed to save contact details.');
                    });
                }
            }
        };
    });