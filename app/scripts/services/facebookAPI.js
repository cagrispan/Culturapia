/**
 * Created by Carlos on 23/07/2016.
 */
'use strict';
angular.module('utils')
    .service('facebookAPI', ['$rootScope', '$location', 'User', 'shareData', '$facebook', '$route', '$q', 'ModalService', 'globals',
        function ($rootScope, $location, User, shareData, $facebook, $route, $q, ModalService, globals) {

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

            self.feed = function (content) {
                FB.ui({
                    method: 'feed',
                    name: content.title ? content.title : 'Culturapia. Seu portal de Música Autoral.',
                    description: content.description ? content.description : 'Faça terapia escutando boa música no Culturapia!',
                    link: content.bandId ? (globals.frontEndUrl + '/#!/bands/' + content.bandId) : globals.basfrontEndUrleUrl,
                    thumbnail: content.picture,
                    caption: 'culturapia.com.br'
                });
            };

            var getUserInfo = function (facebookToken, defer) {

                FB.api('/me?fields=id,name,email', function (response) {
                    $rootScope.$apply(function () {

                        var user = new User();

                        user.name = response.name;
                        user.facebookId = response.id;
                        user.email = response.email;

                        getUserPicture(user)
                            .then(function () {
                                return user._facebookLogin();
                            })
                            .then(function () {
                                user.facebookToken = facebookToken;
                                return user._save();
                            })
                            .then(function () {
                                if(!user.accepted){
                                    ModalService.accept(user).result.then(function(){
                                        shareData.set(user, 'user');
                                        $rootScope.user = user;
                                        defer.resolve();
                                    }, function(){
                                        $location.path('/');
                                        defer.reject();
                                    });
                                } else {
                                    shareData.set(user, 'user');
                                    $rootScope.user = user;
                                    defer.resolve();
                                }
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