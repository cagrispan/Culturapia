(function (angular) {
    'use strict';
    angular.module('culturapia')
        .controller('PhotoAlbumCtrl', ['$location', 'band', '$uibModalInstance', 'like', 'ModalService', 'shareData', 'report', 'facebookAPI', 'globals',
            function ($location, band, $uibModalInstance, like, ModalService, shareData, report, facebookAPI, globals) {

                var self = this;

                self.baseUrl = globals.baseUrl;

                self.index = 0;
                self.band = band;

                function init() {
                    self.user = shareData.get('user');

                    self.getInfo();
                }

                self.right = function () {
                    if (self.index < self.length) {
                        self.index++;
                    }
                };

                self.left = function () {
                    if (self.index != 0) {
                        self.index--;
                    }
                };

                self.getInfo = function () {
                    self.band._getInfo().then(function () {
                        self.photos = [];

                        for (var i in self.band.photos) {
                            if (self.band.photos[i].isDeleted === '0' &&
                                self.band.photos[i].isReported === '0') {
                                self.photos.push(self.band.photos[i]);
                            }
                        }

                        self.length = self.photos.length;
                        like.verifyLiked(self.photos, self.user.userId);
                    });
                };

                self.feed = function (content) {
                    facebookAPI.feed(content);
                };

                self.likedContent = function (content) {
                    if (self.user) {
                        like.like(content, self.user)
                            .then(function () {
                                self.getInfo();
                            })
                            .then(function () {
                                init();
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
                                self.index--;
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

                self.cancel = function () {
                    $uibModalInstance.dismiss();
                };

                init();

            }]);
})(angular);