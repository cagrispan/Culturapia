/**
 * Created by Carlos on 23/07/2016.
 */
'use strict';
angular.module('culturapia')
    .config(['$routeProvider', function ($routeProvider) {
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
                templateUrl: 'views/admin-login.html',
                controller: 'AdminLoginCtrl',
                controllerAs: 'adminLoginCtrl'
            })
            .when('/admin-moderation', {
                templateUrl: 'views/admin-moderation.html',
                controller: 'AdminModerationCtrl',
                controllerAs: 'adminModerationCtrl'
            })
            .when('/admin-lists', {
                templateUrl: 'views/admin-lists.html',
                controller: 'AdminListsCtrl',
                controllerAs: 'adminListsCtrl'
            })
            .when('/admin-manage', {
                templateUrl: 'views/admin-manage.html',
                controller: 'AdminManageCtrl',
                controllerAs: 'adminManageCtrl'
            })
            .otherwise({redirectTo: '/home'});
    }])
    .config(['$facebookProvider', function ($facebookProvider) {

        $facebookProvider.setAppId('221434191591128');
        $facebookProvider.setPermissions("email");
    }])
    .config(['ngToastProvider', function (ngToast) {

        ngToast.configure(
            {
                verticalPosition: 'bottom',
                horizontalPosition: 'right',
                dismissButton: true,
                className: 'info',
                timeout: 3000
            }
        );

    }])
    .config(function (localStorageServiceProvider) {

        localStorageServiceProvider
            .setPrefix('culturapia')
            .setStorageType('sessionStorage')
            .setNotify(false, false);

    })
    .run(function () {

        (function (d) {

            var js,
                id = 'facebook-jssdk',
                ref = d.getElementsByTagName('script')[0];

            if (d.getElementById(id)) {
                return;
            }

            js = d.createElement('script');
            js.id = id;
            js.async = true;
            js.src = '//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.7&appId=221434191591128';

            ref.parentNode.insertBefore(js, ref);

        }(document));
    });
