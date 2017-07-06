(function (angular) {
    'use strict';
    angular.module('culturapia.band')
        .controller('ProfilePicCtrl', ['shareData', '$location', 'band', '$uibModalInstance', 'Upload', 'ModalService', 'globals', 'ngToast', '$scope',
            function (shareData, $location, band, $uibModalInstance, Upload, ModalService, globals, ngToast, $scope) {

                var self = this;

                function init() {
                    self.user = shareData.get('user');

                    if (!self.user) {
                        ModalService.login().result.then(function () {
                            self.user = shareData.get('user');
                            init();
                        });
                    }

                    self.progressBar = false;
                    self.progress = 0;

                    self.band = band;
                    self.file = null;

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
                        '/profile-pictures',
                        headers: {
                            token: self.user.token
                        },
                        data: {
                            file: file
                        }
                    }).then(function () {
                        self.file = null;
                        self.progressBar = false;
                        self.band._getAll(self.user).then(function () {
                            $uibModalInstance.dismiss();
                        });
                    }, function (resp) {
                        console.log('Error status: ' + resp.status);
                    }, function (evt) {
                        self.progress = parseInt(100.0 * evt.loaded / evt.total);
                        console.log('progress: ' + self.progress + '% ' + evt.config.data.file.name);
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