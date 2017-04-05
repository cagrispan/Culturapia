(function (angular) {
    'use strict';
    angular.module('culturapia.band')
        .controller('BandPhotoCtrl', ['shareData', '$location', 'band', '$uibModalInstance', 'Upload', 'ModalService', 'globals',
            function (shareData, $location, band, $uibModalInstance, Upload, ModalService, globals) {

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

                self.band = band;
                self.band._getPhotos(self.user);
                self.description = null;
                self.progressBar = false;
                self.progress = 0;
            }

            self.submit = function() {
                if (self.file) {
                    self.upload(self.file);
                }
            };

            // upload on file select or drop
            self.upload = function (file) {
                self.progressBar = true;
                Upload.upload({
                    url: globals.baseUrl +
                    '/users/'
                    +self.user.userId+
                    '/bands/'
                    +self.band.bandId+
                    '/photos',
                    headers:{
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
                    self.band._getPhotos(self.user);
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                }, function (evt) {
                    self.progress = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + self.progress + '% ' + evt.config.data.file.name);
                });
            };

            self.removePhoto = function (photo) {
                photo.isDeleted = 1;
                photo._save(self.user);
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