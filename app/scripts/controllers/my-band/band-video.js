(function (angular) {
    'use strict';
    angular.module('culturapia.band')
        .controller('BandVideoCtrl', ['shareData', '$location', 'band', '$uibModalInstance', 'ModalService', 'lists',
            function (shareData, $location, band, $uibModalInstance, ModalService, lists) {

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

                    self.newVideo = {};
                    self.newVideoForm = false;

                    self.styles = lists.getStyles();

                }

                // STYLE
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
                        self.newVideo = {};
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

                init();

            }]);
})(angular);