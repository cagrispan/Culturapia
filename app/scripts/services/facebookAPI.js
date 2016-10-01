/**
 * Created by Carlos on 23/07/2016.
 */
'use strict';
angular.module('utils')
    .service('facebookAPI', ['$rootScope', '$location', 'User', function ($rootScope, $location, User) {

        var self = this;

        this.watchLoginChange = function() {

            FB.Event.subscribe('auth.authResponseChange', function(res) {

                if (res.status === 'connected') {
                    self.getUserInfo(res.authResponse.accessToken);
                }
                else {
                    /*
                     The user is not logged to the app, or into Facebook:
                     destroy the session on the server.
                     */
                }
            });
        };

        this.getUserInfo = function(token) {

            FB.api('/me?fields=id,name,first_name,last_name', function(response) {
                $rootScope.$apply(function() {

                    self.user = new User();

                    self.user._set(response);
                    self.user.facebookId = response.id;
                    self.user.facebookToken = token;

                    self.user._login().then(function () {
                        if ($location.path() === '/login') {
                            $location.path('/my-home');
                        }
                    }, function () {
                        $location.path('/login');
                    });
                });
            });
        };

        this.logout = function() {

            FB.logout(function() {
                $rootScope.$apply(function() {
                    $rootScope.user = self.user = null;
                    $location.path('/home');
                });
            });

        };

    }]);