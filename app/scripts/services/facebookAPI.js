/**
 * Created by Carlos on 23/07/2016.
 */
'use strict';
angular.module('utils')
    .service('facebookAPI', ['$rootScope', '$location', 'User', 'shareData', '$facebook', '$route', '$q',
        function ($rootScope, $location, User, shareData, $facebook, $route, $q) {

            var self = this;

            self.login = function () {

                var defer = $q.defer();
                $facebook.login()
                    .then(function (res) {
                        if (res.status === 'connected') {
                            getUserInfo(res.authResponse.accessToken, defer);
                        }
                        else {
                            shareData.set(null, 'user');
                        }
                    }, function (err) {
                        console.log(err);
                    });
                return defer.promise;

            };

            self.logout = function () {
                shareData.set(null, 'user');
                $rootScope.user = null;
                $location.path('/');
                $route.reload();

            };

            self.feed = function (path, message, title) {
                FB.ui({
                    method: 'feed',
                    name: title ? title : 'Culturapia. Seu portal de Música Autoral.',
                    description: message ? message : 'Faça terapia escutando boa música no Culturapia!',
                    link: path ? ('local.culturapia.com.br:9000/#' + path) : 'local.culturapia.com.br:9000',
                    caption: 'culturapia.com.br'
                });
            };

            var getUserInfo = function (facebookToken, defer) {

                FB.api('/me?fields=id,name', function (response) {
                    $rootScope.$apply(function () {

                        var user = new User();

                        user.name = response.name;
                        user.facebookId = response.id;

                        getUserPicture(user)
                            .then(function () {
                                return user._login();
                            })
                            .then(function () {
                                user.profilePicture = self.profilePicture;
                                user.facebookToken = facebookToken;
                                return user._save();
                            })
                            .then(function () {
                                shareData.set(user, 'user');
                                $rootScope.user = user;
                                defer.resolve();
                            });
                    }, function (err) {
                        console.log(err);
                        $location.path('/');
                    });
                });

            };

            var getUserPicture = function (user) {
                var defer = $q.defer();
                FB.api('/me/picture?type=large', function (response) {
                    $rootScope.$apply(function () {
                        user.profilePicture = response.data.url;
                        defer.resolve();
                    });
                });
                return defer.promise;
            };

        }]);