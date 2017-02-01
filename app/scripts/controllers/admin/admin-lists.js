(function (angular) {
    'use strict';
    angular.module('culturapia')
        .controller('AdminListsCtrl', ['$rootScope', '$location', 'lists', 'webService', function ($rootScope, $location, lists, webService) {

            var self = this;

            if (!$rootScope.admin) {
                $location.path('/admin');
            }

            self.styleInput = false;

            self.newStyle = null;

            function getStyles() {
                lists.getStyles().then(function (result) {
                    self.styles = result.data.styles;
                });
            }

            self.addStyle = function (style) {
                webService.post('/admins/' + $rootScope.admin.adminId + '/styles', {style: style}, {token: $rootScope.admin.token})
                    .then(function () {
                        self.newStyle = null;
                        getStyles();
                    });
            };

            self.removeStyle = function (style) {
                webService.del('/admins/' + $rootScope.admin.adminId + '/styles/' + style.styleId, {token: $rootScope.admin.token})
                    .then(function () {
                        getStyles();
                    });
            };

            getStyles();
        }]);
})(angular);