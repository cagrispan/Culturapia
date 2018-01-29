(function (angular) {
    'use strict';
    angular.module('culturapia.band')
        .controller('BandDetailCtrl', ['shareData', 'band', '$uibModalInstance', 'lists', 'ModalService', 'report',
            function (shareData, band, $uibModalInstance, lists, ModalService, report) {

                var self = this;

                function init() {
                    self.user = shareData.get('user');

                    self.band = band;

                    self.state = lists.states[self.band.state].name;
                    self.city = lists.states[self.band.state].cities[self.band.city];
                }

                self.reportedContent = function (content) {
                    if (self.user) {
                        report.report(content, self.user)
                            .then(function () {
                                self.getInfo();
                            })
                            .catch(function (err) {
                                console.log(err);
                            });
                    } else {
                        ModalService.login().result
                            .then(function () {
                                init();
                            });
                    }
                };

                self.cancel = function () {
                    $uibModalInstance.dismiss();
                };

                init();

            }]);
})(angular);