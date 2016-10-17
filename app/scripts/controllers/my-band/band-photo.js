(function (angular) {
    'use strict';
    angular.module('culturapia.band')
        .controller('BandPhotoCtrl', ['facebookAPI', '$location', 'band', '$uibModalInstance', 'Upload', function (facebookAPI, $location, band, $uibModalInstance, Upload) {

            if (!facebookAPI.user) {
                $location.path('/login');
            }

            var self = this;

            self.user = facebookAPI.user;
            self.band = band;

            self.submit = function() {
                if (self.file) {
                    self.upload(self.file);
                }
            };

            // upload on file select or drop
            self.upload = function (file) {
                Upload.upload({
                    url: 'http://server.culturapia.com.br/users/'
                    +self.user.facebookId+
                    '/bands/'
                    +self.band.bandId+
                    '/photos',
                    headers:{
                        token: self.user.token
                    },
                    data: {
                        file: file,
                        band: self.band.bandId
                    }
                }).then(function () {

                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                }, function (evt) {
                    self.band._getAll(self.user);
                    self.file = null;
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

            self.save = function () {
                $uibModalInstance.dismiss();
            };

        }]);
})(angular);