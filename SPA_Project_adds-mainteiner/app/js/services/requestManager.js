'use strict';
adsApp.factory('requestManager', ['$http', '$q', 'authentification', function ($http, $q, authentification) {
    var requester = function (obj, url, method) {
        var defer = $q.defer();
        var requestingHeaders = authentification.getHeaders() || {};
        $http({
            headers: requestingHeaders,
            url: url,
            method: method,
            data: obj
        }).success(function (data, status, headers, config) {
                defer.resolve(data);
            })
            .error(function (data, status, headers, config) {
                defer.reject(data);  
        });

        return defer.promise;
    }

    var getDataFromUrl = function (databaseUrl) {
        return requester(null, databaseUrl, 'GET');
    }

    var loginToSystem = function (obj, databaseUrl) {
        return requester(obj, databaseUrl, 'POST');
    }

    var uploadUserAd = function(obj, databaseUrl) {
        return requester(obj, databaseUrl, 'POST');
    }

    var putSomeData = function (obj, databaseUrl) {
        return requester(obj, databaseUrl, 'PUT');
    }
    
    var deleteData = function (databaseUrl) {
        return requester(null, databaseUrl, 'DELETE');
    }

    return {
        getDataFromUrl: getDataFromUrl,
        loginToSystem: loginToSystem,
        uploadUserAd: uploadUserAd,
        putSomeData: putSomeData,
        deleteData: deleteData
    }
}]);