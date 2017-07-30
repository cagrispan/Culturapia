(function (angular) {
    'use strict';
    angular.module('culturapia.band')
        .controller('BandPhotoCtrl', ['shareData', '$location', 'band', '$uibModalInstance', 'Upload', 'ModalService', 'globals', 'ngToast', '$scope', 'bandTypes',
            function (shareData, $location, band, $uibModalInstance, Upload, ModalService, globals, ngToast, $scope, bandTypes) {

                var self = this;

                self.baseUrl = globals.baseUrl;

                function init() {
                    self.user = shareData.get('user');

                    if (!self.user) {
                        ModalService.login().result.then(function () {
                            self.user = shareData.get('user');
                            init();
                        });
                    } else {
                        bandTypes.getBandTypes()
                            .then(function (bandTypes) {
                                self.photoSize = parseInt(bandTypes[self.band.type].photo);
                            });

                        self.band = band;
                        self.band._getPhotos(self.user)
                            .then(isPhotoDisable);
                        self.description = null;
                        self.progressBar = false;
                        self.progress = 0;
                    }
                }

                function isPhotoDisable() {
                    var validPhotos = self.band.photos.filter(function (photo) {
                        return photo.isDeleted === '0';
                    });
                    self.isDisabled = validPhotos.length >= self.photoSize;
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
                        if (self.file && self.file.type.split('/')[0] !== 'image') {
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
                        '/photos',
                        headers: {
                            token: self.user.token
                        },
                        data: {
                            file: file,
                            band: self.band.bandId,
                            description: self.description
                        }
                    }).then(function () {
                        self.file = null;
                        self.description = null;
                        self.progressBar = false;
                        self.band._getPhotos(self.user)
                            .then(isPhotoDisable);
                    }, function (resp) {
                        console.log('Error status: ' + resp.status);
                    }, function (evt) {
                        self.progress = parseInt(100.0 * evt.loaded / evt.total);
                        console.log('progress: ' + self.progress + '% ' + evt.config.data.file.name);
                    });
                };

                self.removePhoto = function (photo) {
                    photo.isDeleted = 1;
                    photo._save(self.user)
                        .then(isPhotoDisable);
                };

                self.cancel = function () {
                    $uibModalInstance.dismiss();
                };

                init();

            }]);
})(angular);