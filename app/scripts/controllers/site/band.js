(function (angular) {
    'use strict';
    angular.module('culturapia.band')
        .controller('BandCtrl', ['Band', '$routeParams', 'like', 'shareData', 'ModalService', 'facebookAPI', 'lists', 'report',
            function (Band, $routeParams, like, shareData, ModalService, facebookAPI, lists, report) {

                var self = this;

                function init() {
                    self.user = shareData.get('user');

                    self.band = new Band();
                    self.band.bandId = $routeParams.bandId;

                    self.getInfo();
                }

                self.photoAlbum = function () {
                    ModalService.photoAlbum(self.band).result
                        .then(function () {
                            init();
                        });
                };

                self.feed = function (content) {
                    facebookAPI.feed(content);
                };

                self.getInfo = function () {
                    self.band._getInfo().then(function () {
                        self.state = lists.states[self.band.state].name;
                        self.city = lists.states[self.band.state].cities[self.band.city];

                        self.videos = [];
                        for (var i in self.band.videos) {
                            if (self.band.videos[i].isReported === '0') {
                                self.videos.push(self.band.videos[i]);
                            }
                        }

                        if (self.user) {
                            like.verifyLiked(self.band.notices, self.user.userId);
                            like.verifyLiked(self.band.videos, self.user.userId);
                        }
                    });
                };

                self.likedContent = function (content) {
                    if (self.user) {
                        like.like(content, self.user)
                            .then(function () {
                                self.getInfo();
                            });
                    } else {
                        ModalService.login().result
                            .then(function () {
                                init();
                            });
                    }
                };

                self.reportedContent = function (content) {
                    if (self.user) {
                        report.report(content, self.user)
                            .then(function () {
                                self.getInfo();
                            })
                            .catch(function (err) {
                                console.log(err);
                            });
                    } else {
                        ModalService.login().result
                            .then(function () {
                                init();
                            });
                    }
                };

                init();

            }]);
})(angular);