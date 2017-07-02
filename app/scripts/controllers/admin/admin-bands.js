(function (angular) {
    'use strict';
    angular.module('culturapia')
        .controller('AdminBandsCtrl', ['$rootScope', '$location', 'webService', 'ngToast',
            function ($rootScope, $location, webService, ngToast) {

                var self = this;

                if (!$rootScope.admin) {
                    $location.path('/admin');
                } else {
                    getBands();
                }

                var bandsCopy;

                var filter = {};

                function getBands() {
                    webService.get('/bands', {})
                        .then(function (response) {
                            bandsCopy
                            self.bands = response.data;
                            self.bands.forEach(function (band) {
                                band.isReported = parseInt(band.isReported);
                            });
                            bandsCopy = angular.copy(self.bands);
                        });
                };

                self.toggleBlockContent = function (band) {
                    band.isReported = band.isReported ? 0 : 1;
                };

                self.save = function (band) {

                    webService.put('/admins/' + $rootScope.admin.adminId + '/bands/' + band.bandId, band, { token: $rootScope.admin.token })
                        .then(function () {
                            ngToast.success('Salvo com sucesso.');
                        }, function (err) {
                            ngToast.danger('Falha ao salvar.');
                            console.log(err);
                        });

                };

                self.cancel = function (index) {
                    self.bands[index] = angular.copy(bandsCopy[index]);
                };

            }]);
})(angular);