(function (angular) {
    'use strict';
    angular.module('culturapia.band')
        .controller('BandAudioCtrl', ['shareData', '$location', 'band', '$uibModalInstance', 'Upload', 'ModalService', 'globals', 'ngToast', '$scope',
            function (shareData, $location, band, $uibModalInstance, Upload, ModalService, globals, ngToast, $scope) {

                var self = this;

                self.baseUrl = globals.baseUrl;

                function init() {
                    self.user = shareData.get('user');

                    if (!self.user) {
                        ModalService.login().result.then(function () {
                            self.user = shareData.get('user');
                            init();
                        });
                    }

                    self.file = null;
                    self.band = band;
                    self.band._getAudios(self.user);
                    self.newAudioName = '';
                    self.progressBar = false;
                    self.progress = 0;
                }

                self.submit = function () {
                    if (self.file) {
                        self.upload(self.file);
                    }
                };

                $scope.$watch(function () {
                        return self.file;
                    }, function (newValue, oldValue) {
                        if (newValue !== oldValue) {
                            if (self.file.type.split('/')[0] !== 'audio') {
                                self.file = null;
                                ngToast.danger('Tipo de arquivo não permitido.');
                            }
                        }
                    }
                );

                // upload on file select or drop
                self.upload = function (file) {
                    self.progressBar = true;
                    Upload.upload({
                        url: globals.baseUrl +
                        '/users/'
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
                        self.progressBar = false;
                        self.band._getAudios(self.user);
                    }, function (resp) {
                        console.log('Error status: ' + resp.status);
                    }, function (evt) {
                        self.progress = parseInt(100.0 * evt.loaded / evt.total);
                        console.log('progress: ' + self.progress + '% ' + evt.config.data.file.name);
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