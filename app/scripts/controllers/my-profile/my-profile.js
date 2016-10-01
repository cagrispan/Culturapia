(function (angular) {
    'use strict';
    angular.module('culturapia.user')
        .controller('MyProfileCtrl', ['facebookAPI', '$location', 'ModalService', function (facebookAPI, $location, ModalService) {

            var self = this;

            if (!facebookAPI.user) {
                $location.path('/login');
            }

            self.user = facebookAPI.user;

            self.save = function () {
                self.user._update().then(function(){
                    $location.path('/my-home');
                });
            };

        }]);
})(angular);