(function (angular) {
    'use strict';
    angular.module('culturapia.band')
        .controller('BandVideoCtrl', ['facebookAPI', '$location', 'band', '$uibModalInstance', function (facebookAPI, $location, band, $uibModalInstance) {

            if (!facebookAPI.user) {
                $location.path('/login');
            }

            var self = this;

            self.user = facebookAPI.user;
            self.band = band;

            // STYLE

            self.newVideoForm = false;

            self.cancel = function () {
                $uibModalInstance.dismiss();
            };

            self.save = function () {
                $uibModalInstance.dismiss();
            };

        }]);
})(angular);