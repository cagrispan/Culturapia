(function (angular) {
    'use strict';
    angular.module('culturapia.band')
        .controller('BandConfigCtrl', ['shareData', '$location', 'band', '$uibModalInstance', 'lists', 'ModalService', 'pagSeguro',
            function (shareData, $location, band, $uibModalInstance, lists, ModalService, pagSeguro) {

                var self = this;

                function init() {
                    self.user = shareData.get('user');
                    self.band = band;

                    if (!self.user) {
                        ModalService.login().result
                            .then(function () {
                                self.user = shareData.get('user');
                                init();
                            });
                    }
                }

                self.cancel = function () {
                    $uibModalInstance.dismiss();
                };

                self.activate = function () {
                    var band = angular.copy(self.band);
                    band.isDeleted = 0;
                    save(band);
                };

                self.deactivate = function () {
                    var band = angular.copy(self.band);
                    band.isDeleted = 1;
                    save(band);
                };

                self.notAllow = function () {
                    var band = angular.copy(self.band);
                    band.allowDownload = 0;
                    save(band);
                };

                self.allow = function () {
                    var band = angular.copy(self.band);
                    band.allowDownload = 1;
                    save(band);
                };

                self.hideContact = function () {
                    var band = angular.copy(self.band);
                    band.showContact = 0;
                    save(band);
                };

                self.showContact = function () {
                    var band = angular.copy(self.band);
                    band.showContact = 1;
                    save(band);
                };

                self.cancelPremium = function () {
                    pagSeguro.cancelPremium(self.user, self.band)
                        .then(function(){
                            self.band._getInfo();
                        });
                }

                function save(band) {
                    band._save(self.user).then(function () {
                        self.band._set(band);
                    }, function (err) {
                        console.log('Error message: ' + err.message);
                    });
                }

                init();

            }]);
})(angular);