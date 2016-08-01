/**
 * Created by Carlos on 23/07/2016.
 */
angular.module('utils')
    .service('faceAPI', ['webService', '$rootScope', '$location', function (webService, $rootScope, $location) {

        var self = this;

        this.watchLoginChange = function() {

            FB.Event.subscribe('auth.authResponseChange', function(res) {

                if (res.status === 'connected') {

                    self.getUserInfo();

                    console.log(res.authResponse);
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

            FB.api('/me', function(response) {
                $rootScope.$apply(function() {
                    self.user = response;
                    $location.path('/home');
                });
            });
        };

        this.logout = function() {

            FB.logout(function() {
                $rootScope.$apply(function() {
                    $rootScope.user = self.user = {};
                });
            });

        }

    }]);