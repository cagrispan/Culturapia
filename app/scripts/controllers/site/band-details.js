(function (angular) {
    'use strict';
    angular.module('culturapia.band')
        .controller('BandDetailCtrl', ['shareData', 'band', '$uibModalInstance', 'lists',
            function (shareData, band, $uibModalInstance, lists) {

                var self = this;

                function init() {
                    self.user = shareData.get('user');

                    self.band = band;

                    self.state = lists.states[self.band.state].name;
                    self.city = lists.states[self.band.state].cities[self.band.city];
                }

                self.cancel = function () {
                    $uibModalInstance.dismiss();
                };

                init();

            }]);
})(angular);