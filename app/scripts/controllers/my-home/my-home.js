(function (angular) {
    'use strict';
    angular.module('culturapia')
        .controller('MyHomeCtrl', ['shareData', '$location', 'Band', 'ModalService', function (shareData, $location, Band, ModalService) {

            var self = this;

            function init() {
                self.user = shareData.get('user');

                if (!self.user) {
                    ModalService.login().result.then(function () {
                        self.user = shareData.get('user');
                    });
                }
            }

            self.myBand = function () {
                self.user._getBands().then(function () {
                    if (self.user.bands[0]) {
                        $location.path('/my-band/' + self.user.bands[0].bandId);
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

            init();

        }]);
})(angular);