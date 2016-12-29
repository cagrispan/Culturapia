(function (angular) {
    'use strict';
    angular.module('culturapia.band')
        .controller('ProfilePicCtrl', ['shareData', '$location', 'band', '$uibModalInstance', 'Upload', 'ModalService',
            function (shareData, $location, band, $uibModalInstance, Upload, ModalService) {

            var self = this;

            function init() {
                self.user = shareData.get('user');

                if (!self.user) {
                    ModalService.login().result.then(function () {
                        self.user = shareData.get('user');
                        init();
                    });
                }

                self.band = band;

            }

            self.submit = function () {
                if (self.file) {
                    self.upload(self.file);
                }
            };

            // upload on file select or drop
            self.upload = function (file) {
                Upload.upload({
                    url: 'http://server.culturapia.com.br/users/'
                    + self.user.userId +
                    '/bands/'
                    + self.band.bandId +
                    '/profile-pictures',
                    headers: {
                        token: self.user.token
                    },
                    data: {
                        file: file
                    }
                }).then(function () {
                    self.file = null;
                    self.band._getAll(self.user).then(function () {
                        $uibModalInstance.dismiss();
                    });
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                }, function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });
            };

            self.removePhoto = function (photo) {
                self.band.removePhoto(photo, self.user);
            };

            self.cancel = function () {
                $uibModalInstance.dismiss();
            };

            init();

        }]);
})(angular);