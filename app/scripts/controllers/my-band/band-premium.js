(function (angular) {
    'use strict';
    angular.module('culturapia.band')
        .controller('BandPremiumCtrl', ['shareData', 'band', '$uibModalInstance', 'ModalService',
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

                self.getPremium = function () {
                    $uibModalInstance.close();
                    ModalService.signPlan(self.band);
                };

                self.cancel = function () {
                    $uibModalInstance.dismiss();
                };


                init();

            }]);
})(angular);