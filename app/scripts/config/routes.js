/**
 * Created by Carlos on 23/07/2016.
 */
'use strict';
angular.module('culturapia')
    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'loginCtrl'
            })
            .when('/home', {
                templateUrl: 'views/home.html',
                controller: 'HomeCtrl',
                controllerAs: 'homeCtrl'
            })
            .when('/my-home', {
                templateUrl: 'views/my-home.html',
                controller: 'MyHomeCtrl',
                controllerAs: 'myHomeCtrl'
            })
            .when('/my-band', {
                templateUrl: 'views/my-band.html',
                controller: 'MyBandCtrl',
                controllerAs: 'myBandCtrl'
            })
            .otherwise({redirectTo: '/home'});
    }]);