(function (angular) {
    'use strict';
    angular.module('culturapia.band')
        .controller('BandVideoCtrl', ['facebookAPI', '$location', 'band', '$uibModalInstance', 'Video',
            function (facebookAPI, $location, band, $uibModalInstance, Video) {

                if (!facebookAPI.user) {
                    $location.path('/login');
                }

                var self = this;

                self.user = facebookAPI.user;
                self.band = band;
                self.newVideo = new Video();

                // STYLE

                self.newVideoForm = false;

                self.addVideo = function () {
                    var split;

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
                    }, function (err) {
                        alert(err.message);
                    })

                };

                self.removeVideo = function (video) {
                    self.band.removeVideo(video, self.user);
                };

                self.cancel = function () {
                    $uibModalInstance.dismiss();
                };

                self.save = function () {
                    $uibModalInstance.dismiss();
                };

            }]);
})(angular);