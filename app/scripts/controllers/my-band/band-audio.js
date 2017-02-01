(function (angular) {
    'use strict';
    angular.module('culturapia.band')
        .controller('BandAudioCtrl', ['shareData', '$location', 'band', '$uibModalInstance', 'Upload', 'ModalService',
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
                self.band._getAudios(self.user);
                self.newAudioName = '';
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
                    '/audios',
                    headers: {
                        token: self.user.token
                    },
                    data: {
                        file: file,
                        band: self.band.bandId,
                        name: self.newAudioName
                    }
                }).then(function () {
                    self.file = null;
                    self.newAudioName = '';
                    self.band._getAudios(self.user);
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                }, function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });
            };

            self.removeAudio = function (audio) {
                audio.isDeleted = 1;
                audio._save(self.user);
            };

            self.cancel = function () {
                $uibModalInstance.dismiss();
            };

            self.save = function () {
                $uibModalInstance.dismiss();
            };

            init();
        }]);
})(angular);