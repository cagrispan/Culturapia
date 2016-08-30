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
                self.file = null;
                //if (self.form.file.$valid && self.file) {
                //    self.upload(self.file);
                //}
            };

            // upload on file select or drop 
            self.upload = function (file) {
                Upload.upload({
                    url: 'upload/url',
                    data: {file: file, 'username': self.user.name}
                }).then(function (resp) {
                    console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                }, function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });
            };
            // for multiple files: 
            self.uploadFiles = function (files) {
                if (files && files.length) {
                    for (var i = 0; i < files.length; i++) {
                        //Upload.upload({..., data: {file: files[i]}, ...})...;
                    }
                    // or send them all together for HTML5 browsers: 
                    //Upload.upload({..., data: {file: files}, ...})...;
                }
            };

            self.cancel = function () {
                $uibModalInstance.dismiss();
            };

            self.save = function () {
                $uibModalInstance.dismiss();
            };

        }]);
})(angular);