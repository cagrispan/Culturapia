(function (angular) {
    'use strict';
    angular.module('culturapia.band')
        .controller('MyBandCtrl', ['shareData', '$location', 'ModalService', 'Band', '$routeParams',
            function (shareData, $location, ModalService, Band, $routeParams) {

                var self = this;

                function init() {
                    self.user = shareData.get('user');

                    if (!self.user) {
                        ModalService.login().result.then(function () {
                            self.user = shareData.get('user');
                            init();
                        });
                    }

                    self.band = new Band();
                    self.band.bandId = $routeParams.bandId;

                    self.newNotice = {};

                    self.band._getAll(self.user);
                }

                self.addNotice = function () {
                    if (self.newNotice.notice) {
                        self.newNotice.date = new Date();
                        self.band.addNotice(self.newNotice, self.user);
                        self.newNotice.notice = '';
                    }
                };

                self.removeNotice = function (notice) {
                    self.band.removeNotice(notice, self.user);
                };

                self.info = function () {
                    ModalService.info(self.band);
                };

                self.audios = function () {
                    ModalService.audios(self.band);
                };

                self.videos = function () {
                    ModalService.videos(self.band);
                };

                self.photos = function () {
                    ModalService.photos(self.band);
                };

                self.stats = function () {
                    ModalService.stats(self.band);
                };

                self.profilePicture = function () {
                    ModalService.profilePicture(self.band);
                };

                self.config = function () {
                    ModalService.config(self.band);
                };

                init();
            }]);
})(angular);