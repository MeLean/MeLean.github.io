'use strict';
var adsApp = angular.module('adsApp', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider 
            .when('/', {
                templateUrl: 'app/templates/home.html'
            }).when('/login-form', {
                templateUrl: 'app/templates/login-form.html'
            }).when('/register-form', {
                templateUrl: 'app/templates/register-form.html'
            }).when('/user/home', {
                templateUrl: 'app/templates/home.html'
            }).when('/user/ads/publish', {
                templateUrl: 'app/templates/publish-ad.html'
            }).when('/user/ads', {
                templateUrl: 'app/templates/user-ads.html'
            }).when('/user/profile', {
                templateUrl: 'app/templates/edit-profile.html'
            }).when('/please-login', {
                templateUrl: 'app/templates/please-login.html'
            }).when('/user/ads/edit/:id', {
                templateUrl: 'app/templates/edit-ad.html'
            }).when('/user/ads/delete/:id', {
                templateUrl: 'app/templates/delete-ad.html'
            })
            .otherwise({ redirectTo: 'app/templates/home.html' });
    }])
    .constant('baseUrl', 'http://softuni-ads.azurewebsites.net/api/');
