/**
 * Created by Carlos on 23/07/2016.
 */
angular.module('culturapia')
    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'view/login.html'
            })
            .when('/home', {
                templateUrl: 'view/home.html',
                controller: 'HomeCtrl',
                controllerAs: 'home'
            })
            .otherwise({redirectTo: '/login'});
    }]);