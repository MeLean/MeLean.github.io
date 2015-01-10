'use strict';

adsApp.controller('EditProfileController', ['$scope', '$location', 'requestManager', 'baseUrl', 'messaging', 'authentification',
    function ($scope, $location, requestManager, baseUrl, messaging, authentification) {
        var isLogged = authentification.isLogged();
        if (isLogged) {
         var databaseUrl = baseUrl + 'user/profile';
            requestManager.getDataFromUrl(databaseUrl).then(function(data) {
                $scope.user = data; 
            }, function(error) {
                messaging.errorMsg('Could not get user`s data from server! Message: ' + error.message);
            });
            $scope.updateUser = function(user) {
                var databaseUrl = baseUrl + 'user/profile';
                requestManager.putSomeData(user, databaseUrl).then(function (data) {
                    messaging.successMsg('Profile was successful updated!');
                    $location.path('/user/home');
                }, function(error) {
                    messaging.errorMsg('Profile update falied! Message:' + error.message);
                });
            }

            $scope.changePassword = function (password) {
                var url = baseUrl + 'user/ChangePassword';
                alert(JSON.stringify(password));
                if (password.newPassword === password.confirmPassword) {
                    requestManager.putSomeData(password, url).then(function (data) {
                        messaging.successMsg('Password changed successful updated!');
            }, function (error) {
                        messaging.errorMsg('Password change falied! Message:' + error.message);
                    });
                } else {
                    messaging.errorMsg('New password and confirm password do not match!');
                }
            }

        } else {
            $location.path('/please-login');
        }
    }]);