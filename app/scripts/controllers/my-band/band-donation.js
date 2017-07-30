(function (angular) {
    'use strict';
    angular.module('culturapia.band')
        .controller('BandDonationCtrl', ['shareData', 'band', '$uibModalInstance', 'ModalService',
            function (shareData, band, $uibModalInstance, ModalService) {

                var self = this;

                function init() {
                    self.user = shareData.get('user');

                    if (!self.user) {
                        ModalService.login().result
                            .then(function () {
                                self.user = shareData.get('user');
                                init();
                            });
                    } else {
                        self.band = band;
                    }
                }

                self.save = function () {
                    self.band._save(self.user).then(function () {
                        $uibModalInstance.close();
                    }, function (err) {
                        console.log('Error message: ' + err.message);
                    });

                };

                self.cancel = function () {
                    $uibModalInstance.dismiss();
                };


                init();

            }]);
})(angular);