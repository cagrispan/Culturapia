/**
 * Created by Carlos on 23/07/2016.
 */
angular.module('culturapia')
    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'src/views/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'loginCtrl'
            })
            .when('/home', {
                templateUrl: 'src/views/home.html',
                controller: 'HomeCtrl',
                controllerAs: 'homeCtrl'
            })
            .when('/my-home', {
                templateUrl: 'src/views/my-home.html',
                controller: 'MyHomeCtrl',
                controllerAs: 'myHomeCtrl'
            })
            .when('/my-band', {
                templateUrl: 'src/views/my-band.html',
                controller: 'MyBandCtrl',
                controllerAs: 'myBandCtrl'
            })
            .otherwise({redirectTo: '/home'});
    }]);