'use strict';

adsApp.controller('DeleteAdController', ['$scope', '$location', '$routeParams', 'requestManager', 'baseUrl', 'messaging', 
    function ($scope, $location, $routeParams, requestManager, baseUrl, messaging) {

        $scope.init = function () {
            var databaseUrl = baseUrl + 'user/ads/' + $routeParams.id;
            requestManager.getDataFromUrl(databaseUrl).then(function (data) {
                $scope.ad = data;
            }, function (error) {
                messaging.errorMsg('Message: ' + error.message);
            });
        };

        $scope.deleteAd = function (ad) {
            var databaseUrl = baseUrl + 'user/ads/' + ad.id;
            requestManager.deleteData(databaseUrl).then(function (data) {
                messaging.successMsg('Ad deleted successful');
                $location.path('/user/ads');
            }, function (error) {
                messaging.errorMsg('There was a problem whit deleting ad! Message: ' + error.message);
            });

        }
    }]);