'use strict';
adsApp.controller('RegisterController', ['$scope', '$location', '$rootScope', 'requestManager', 'baseUrl', 'messaging', 'authentification',
    function ($scope, $location, $rootScope, requestManager, baseUrl, messaging, authentification) {

    $scope.register = function () {
        var user = $scope.user;
        var url = baseUrl + 'user/register';
        if (user.password === user.confirmPassword) {
            requestManager.loginToSystem(user, url)
                .then(function (data) {
                    messaging.successMsg('Registration successful!');
                    authentification.saveUser(data); 
                    $rootScope.username = data.username;
                    $rootScope.isLogged = authentification.isLogged();
                    $location.path('/user/home'); 
                }, function (data) {
                    var details = angular.toJson(data.modelState);
                    var msgDetails = details.slice(5, (details.length - 2));
                    messaging.errorMsg('Registration failed! Details: ' + msgDetails); 
                });
        } else {
            messaging.errorMsg('Passwords do not match!');
        }
    }
}]);