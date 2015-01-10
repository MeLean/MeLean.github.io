'use strict';
adsApp.controller('MainController', ['$scope', 'requestManager', 'baseUrl', 'messaging', 'authentification',
    function ($scope, requestManager, baseUrl, messaging, authentification) {

        // todo do some messaging
        requestManager.getDataFromUrl(baseUrl + 'ads').then(function (data) {
            displayAds(data);
        });

        requestManager.getDataFromUrl(baseUrl + 'towns').then(function (data) {
        $scope.towns = data;
    });

        requestManager.getDataFromUrl(baseUrl + 'categories').then(function (data) {
        $scope.categories = data;
    });

        $scope.updateAds = function (categoryFilter, townFilter, startPage, adsPerPage) {
        var categoryUrlRequest = makeUrlForRequest(categoryFilter, 'CategoryId=');
        var townRequest = makeUrlForRequest(townFilter, '&TownId=');
        var pageRequest = startPage || 1;
        var pageSizeRequest = adsPerPage || 10;

        requestManager.getDataFromUrl(baseUrl + 'Ads?' + categoryUrlRequest + townRequest +
            '&StartPage=' + pageRequest + '&PageSize=' + pageSizeRequest)
                   .then(
                       function (data) {
                           displayAds(data);
                       },
                       function (data) {
                           messaging.errorMsg('request failed');
                           console.log(data);
                       });
        }  

        $scope.checkForLogin = function () {
            return authentification.isLogged();
        }

        $scope.username = function() {
            if (authentification.isLogged()) {
                return authentification.getUser().username;
            } else {
                return 'Guest';
            }
        }

        function makeUrlForRequest(filter, str) {
        if (filter) {
            return str + filter;
        } else {
            return '';
        }
    }

        function displayAds(data)  {
        var ads = data.ads;
        if (ads.length > 0) {
            var pages = data.numPages;
            var pagesArr = [];

            $scope.ads = ads;

            for (var i = 1; i <= pages; i++) {
                pagesArr.push(i);
            }

            $scope.pagesArr = pagesArr;
        } else {
            $scope.ads = ads; 
            messaging.errorMsg('There are no such ads!');
        }
    }

      
    }]);