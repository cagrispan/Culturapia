(function (angular) {
    'use strict';
    angular.module('culturapia')
        .controller('MyHomeCtrl', ['facebookAPI', '$location', 'Band', 'ModalService', function (facebookAPI, $location, Band, ModalService) {

            var self = this;

            if (!facebookAPI.user) {
                $location.path('/login');}

            self.user = facebookAPI.user;

            self.myBand = function () {
                self.user._getBands().then(function () {
                    if (self.user.bands[0]){
                        $location.path('/my-band/'+self.user.bands[0].bandId);
                    } else {
                        ModalService.addBand();
                    }
                });
            };

            self.myProfile = function () {
                self.user._load().then(function () {
                    $location.path('/my-profile');
                });
            };

        }]);
})(angular);