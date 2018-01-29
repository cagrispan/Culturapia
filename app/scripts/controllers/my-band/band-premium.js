(function (angular) {
    'use strict';
    angular.module('culturapia.band')
        .controller('BandPremiumCtrl', ['shareData', 'band', '$uibModalInstance', 'ModalService', 'bandTypes',
            function (shareData, band, $uibModalInstance, ModalService, bandTypes) {

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
                        bandTypes.getBandTypes()
                            .then(function (bandTypes) {
                                self.bandTypes = bandTypes.map(function(type){
                                    var typeClone = {};
                                    var typeKeys = Object.keys(type);
                                    typeKeys.forEach(function(key){
                                        typeClone[key] = key !== 'type' ? parseInt(type[key]) : type[key];
                                    })
                                    return typeClone;
                                })
                            });
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