'use strict';

adsApp.controller('EditAdController', ['$scope', '$location', '$routeParams', '$route', 'requestManager', 'baseUrl', 'messaging', 
    function ($scope, $location, $routeParams, $route, requestManager, baseUrl, messaging) {

        $scope.fileSelected = function (fileInputField) {
            var file = fileInputField.files[0];
            if (file.type.match(/image\/.*/)) {
                var reader = new FileReader();
                reader.onload = function () {
                    $scope.ad.imageDataUrl = reader.result;
                    $scope.ad.changeImage = true;
                    $(".image-box").html("<img src='" + reader.result + "'>");
                };
                reader.readAsDataURL(file);
            } else {
                $(".image-box").html("<p>File type not supported!</p>");
            }
        };

        $scope.init = function () {
            var databaseUrl = baseUrl + 'user/ads/' + $routeParams.id;
            requestManager.getDataFromUrl(databaseUrl).then(function(data) {
                $scope.ad = data;
            }, function(error) {
                messaging.errorMsg('Message: ' + error.message);
            });
        };

        $scope.editAd = function (ad) {
            console.log(ad);
            var databaseUrl = baseUrl + 'user/ads/' + ad.id;
            requestManager.putSomeData(ad, databaseUrl).then(function(data) {
                messaging.successMsg('Ad edited successful');
                $location.path('/user/ads');
            }, function(error) {
                messaging.errorMsg('There was a problem whit editing ad! Message: ' + error.message);
            });
        }

        $scope.deleteImgUrl = function () {
            $scope.ad.changeImage = true;
            $scope.ad.imageDataUrl = null;
            $(".image-box").html("<img src=''>");
        }
}]);