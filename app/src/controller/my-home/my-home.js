(function (angular) {
    'use strict';
    angular.module('culturapia')
        .controller('MyHomeCtrl', ['facebookAPI', '$location', function (facebookAPI, $location) {

            var self = this;

            if (!facebookAPI.user) {
                $location.path('/login');
            }

            self.user = facebookAPI.user;

        }]);
})(angular);