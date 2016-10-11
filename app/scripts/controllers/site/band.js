(function (angular) {
    'use strict';
    angular.module('culturapia.band')
        .controller('BandCtrl', ['Band', '$routeParams',
            function (Band, $routeParams) {

                var self = this;

                self.band = new Band();
                self.band.bandId = $routeParams.bandId;

                self.band._getInfo();

            }]);
})(angular);