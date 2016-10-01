(function (angular) {
    'use strict';
    angular.module('culturapia.band')
        .controller('MyBandCtrl', ['facebookAPI', '$location', 'ModalService', 'Band', '$routeParams', 'Notice',
            function (facebookAPI, $location, ModalService, Band, $routeParams, Notice) {

                var self = this;

                if (!facebookAPI.user) {
                    $location.path('/login');
                }

                self.user = facebookAPI.user;

                self.band = new Band();
                self.band.bandId = $routeParams.bandId;

                self.newNotice = new Notice();

                self.band._getAll(self.user);

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

                self.songs = function () {
                    ModalService.songs(self.band);
                };

                self.videos = function () {
                    ModalService.videos(self.band);
                };

                self.photos = function () {
                    ModalService.photos(self.band);
                };

                self.config = function () {
                    ModalService.config(self.band);
                };
            }]);
})(angular);