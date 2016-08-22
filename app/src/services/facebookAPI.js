/**
 * Created by Carlos on 23/07/2016.
 */
angular.module('utils')
    .service('facebookAPI', ['webService', '$rootScope', '$location', function (webService, $rootScope, $location) {

        var self = this;

        this.watchLoginChange = function() {

            FB.Event.subscribe('auth.authResponseChange', function(res) {

                if (res.status === 'connected') {
                    self.getUserInfo();
                }
                else {
                    /*
                     The user is not logged to the app, or into Facebook:
                     destroy the session on the server.
                     */
                }
            });
        };

        this.getUserInfo = function() {

            FB.api('/me?fields=id,name,picture', function(response) {
                $rootScope.$apply(function() {
                    self.user = response;
                    $location.path('/my-home');
                });
            });
        };

        this.logout = function() {

            FB.logout(function() {
                $rootScope.$apply(function() {
                    $rootScope.user = self.user = {};
                    $location.path('/home');
                });
            });

        };

    }]);