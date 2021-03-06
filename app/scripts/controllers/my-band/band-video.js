(function (angular) {
    'use strict';
    angular.module('culturapia.band')
        .controller('BandVideoCtrl', ['shareData', '$location', 'band', '$uibModalInstance', 'ModalService', 'lists', 'Video', 'ngToast', 'bandTypes',
            function (shareData, $location, band, $uibModalInstance, ModalService, lists, Video, ngToast, bandTypes) {

                var self = this;

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
                                self.videoSize = parseInt(bandTypes[self.band.type].video);
                            });

                        self.band = band;
                        self.band._getVideos(self.user)
                            .then(isVideoDisable);

                        self.newVideo = new Video();
                        self.newVideoForm = false;

                        self.getStyles();
                    }
                }

                function isVideoDisable() {
                    var validVideos = self.band.videos.filter(function (video) {
                        return video.isDeleted === '0';
                    });
                    self.isDisabled = validVideos.length >= self.videoSize;
                }

                self.getStyles = function () {
                    lists.getStyles()
                        .then(function (result) {
                            self.styles = result.data.styles;
                        })
                        .catch(function (err) {
                            console.log(err);
                        });
                };

                // STYLE
                self.addVideo = function () {
                    var split;

                    self.newVideo.band = self.band.name;
                    self.newVideo.bandId = self.band.bandId;
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

                    self.newVideo._add(self.user)
                        .then(function () {
                            self.newVideo = new Video();
                            self.newVideoForm = !self.newVideoForm;
                            self.band._getVideos(self.user)
                                .then(isVideoDisable);
                            ngToast.success('Vídeo adicionado.');
                        }, function (err) {
                            ngToast.danger('Não foi possível adicionar o vídeo. Tente novamente.');
                            console.log(err.data.message);
                        })

                };

                self.removeVideo = function (video) {
                    var videoToRemove = angular.copy(video);
                    videoToRemove.isDeleted = 1;
                    videoToRemove._save(self.user)
                        .then(function () {
                            self.band._getVideos(self.user)
                                .then(isVideoDisable);
                            ngToast.success('Vídeo excluído.');
                        }, function (err) {
                            console.log(err.data.message);
                            ngToast.danger('Não foi possível excluir o vídeo. Tente novamente.');
                        });
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