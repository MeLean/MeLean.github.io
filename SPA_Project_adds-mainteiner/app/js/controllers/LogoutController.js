'use strict';
adsApp.controller('LogoutController', ['$scope', '$location', '$rootScope', '$route', 'messaging', 'authentification',
    function ($scope, $location, $rootScope, $route, messaging, authentification) {
        $scope.logout = function() {
            authentification.clearUser();
            $rootScope.username = null;
            $location.path('/'); 
            $route.reload();
            messaging.successMsg('Logout successful!');
        }
    }]);