(function (angular) {
    'use strict';
    angular.module('culturapia.band')
        .controller('BandVideoCtrl', ['facebookAPI', '$location', 'band', '$uibModalInstance',
            function (facebookAPI, $location, band, $uibModalInstance) {

                if (!facebookAPI.user) {
                    $location.path('/login');
                }

                var self = this;

                self.user = facebookAPI.user;
                self.band = band;
                self.newVideo = {};

                self.styles = [
                    'Sertanejo',
                    'Samba',
                    'Rock'
                ];


                // STYLE

                self.newVideoForm = false;

                self.addVideo = function () {
                    var split;

                    self.newVideo.band = self.band.name;
                    self.newVideo.city = self.band.city;
                    self.newVideo.state = self.band.state;

                    if (self.newVideo.url.match('=')) {
                        split = self.newVideo.url.split("=");
                        split = split[1].split("&");
                        self.newVideo.videoId = split[0];
                    } else {
                        split = self.newVideo.url.split(".be/");
                        self.newVideo.videoId = split[1];
                    }

                    self.band.addVideo(self.newVideo, self.user).then(function () {
                        self.newVideo = new Video();
                        self.newVideoForm = !self.newVideoForm;
                    }, function (err) {
                        alert(err.message);
                    })

                };

                self.removeVideo = function (video) {
                    self.band.removeVideo(video, self.user);
                };

                self.ok = function () {
                    $uibModalInstance.dismiss();
                };

                self.cancel = function () {
                    $uibModalInstance.dismiss();
                };

            }]);
})(angular);