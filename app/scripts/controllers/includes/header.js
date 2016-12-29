/**
 * Created by Carlos on 15/08/2016.
 */
angular.module('culturapia')
    .controller('HeaderCtrl', ['$scope', '$location', 'facebookAPI', '$rootScope', 'ModalService', '$route', 'shareData',
        function ($scope, $location, facebookAPI, $rootScope, ModalService, $route, shareData) {

            var self = this;

            self.user = $rootScope.user;

            self.navCollapsed = true;

            self.login = function () {
                ModalService.login().result
                    .then(function () {
                        $route.reload();
                    });
            };

            self.logout = function () {
                $rootScope.user = null;
                shareData.set(null, 'user');
                $location.path('/');
            };

            self.navigate = function (path) {
                $location.path('/' + path);
            };

        }]);