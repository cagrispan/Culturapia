/**
 * Created by Carlos on 15/08/2016.
 */
angular.module('culturapia')
    .controller('HeaderCtrl', ['$scope', '$location', 'facebookAPI', '$rootScope', 'ModalService', '$route', 'shareData',
        function ($scope, $location, facebookAPI, $rootScope, ModalService, $route, shareData) {

            var self = this;

            $rootScope.user = shareData.get('user');
            $rootScope.musics = [];

            self.user = $rootScope.user;

            self.navCollapsed = true;
            self.isOpen = false;

            self.login = function () {
                ModalService.login().result
                    .then(function () {
                        self.user = $rootScope.user;
                        $route.reload();
                    }, function () {
                        $location.path('/');
                    });
            };

            self.logout = function () {
                $rootScope.user = null;
                shareData.set(null, 'user');
                $location.path('/');
            };

            self.myBand = function () {
                $rootScope.user._getBands().then(function () {
                    if ($rootScope.user.bands[0]) {
                        $location.path('/my-band/' + $rootScope.user.bands[0].bandId);
                    } else {
                        ModalService.addBand();
                    }
                });
            };

            self.myProfile = function () {
                $rootScope.user._load().then(function () {
                    $location.path('/my-profile');
                });
            };

            self.navigate = function (path) {
                $location.path('/' + path);
            };

            self.openPlayer = function () {
                ModalService.mediaPlayer();
            };

        }]);