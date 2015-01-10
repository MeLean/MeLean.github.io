'use strict';
adsApp.factory('authentification', function () {
    var key = 'user';

    var saveUser = function (data) {
        localStorage.setItem(key, angular.toJson(data));
    }

    var getUser = function () {
        var user = angular.fromJson(localStorage.getItem(key));
        return user;
    }

    var getHeaders = function () {
        var headers = {};
        var user = getUser();

        if (user) {
            headers.Authorization = 'Bearer ' + user.access_token;
        }

        return headers;
    }

    var isLogged = function () {
        return !!getUser();
    }

    var clearUser = function() {
        localStorage.removeItem(key);
    }

    return {
        saveUser : saveUser,
        getUser : getUser,
        getHeaders : getHeaders,
        clearUser: clearUser,
        isLogged : isLogged

    }
});