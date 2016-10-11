/**
 * Created by Carlos on 23/07/2016.
 */
'use strict';
angular.module('culturapia')
    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $routeProvider

            .when('/home', {
                templateUrl: 'views/home.html',
                controller: 'HomeCtrl',
                controllerAs: 'homeCtrl'
            })
            .when('/bands', {
                templateUrl: 'views/bands.html'
            })
            .when('/about', {
                templateUrl: 'views/about.html'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'loginCtrl'
            })
            .when('/my-home', {
                templateUrl: 'views/my-home.html',
                controller: 'MyHomeCtrl',
                controllerAs: 'myHomeCtrl'
            })
            .when('/my-profile', {
                templateUrl: 'views/my-profile.html',
                controller: 'MyProfileCtrl',
                controllerAs: 'myProfileCtrl'
            })
            .when('/my-band/:bandId', {
                templateUrl: 'views/my-band.html',
                controller: 'MyBandCtrl',
                controllerAs: 'myBandCtrl'
            })
            .when('/bands/:bandId', {
                templateUrl: 'views/band.html',
                controller: 'BandCtrl',
                controllerAs: 'bandCtrl'
            })
            .when('/bands', {
                templateUrl: 'views/bands.html',
                controller: 'BandsCtrl',
                controllerAs: 'bandsCtrl'
            })
            .when('/admin', {
                templateUrl: 'views/admin-login.html'
            })
            .otherwise({redirectTo: '/home'});
    }]);