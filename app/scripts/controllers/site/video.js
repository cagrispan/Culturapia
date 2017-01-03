(function (angular) {
    'use strict';
    angular.module('culturapia')
        .controller('VideoCtrl', ['$location', 'videoObject', '$uibModalInstance', 'like', 'report', 'ModalService', 'shareData', 'lists',
            function ($location, videoObject, $uibModalInstance, like, report, ModalService, shareData, lists) {

                var self = this;

                function init() {
                    self.user = shareData.get('user');
                    self.getLikes();
                }

                self.video = videoObject;

                self.getLikes = function () {
                    lists.getLikes(self.video.videoId)
                        .then(function (resolve) {
                            self.video.likes = resolve.data;
                            verifyLikedVideos();
                        })
                        .catch(function (err) {
                            console.log(err);
                        });
                };

                function verifyLikedVideos() {
                    self.video.likedByUser = false;
                    for (var i in self.video.likes) {
                        if (self.user && self.video.likes[i].userId === self.user.userId) {
                            self.video.likedByUser = true;
                        }
                    }
                }

                self.likedContent = function (content) {
                    console.log(content);
                    if (self.user) {
                        like.like(content, self.user)
                            .then(function () {
                                self.getLikes();
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

                self.reportedContent = function (content) {
                    if (self.user) {
                        report.report(content, self.user)
                            .then(function () {
                                self.getLikes();
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

                self.band = function () {
                    $location.path('/bands/' + self.video.bandId);
                    $uibModalInstance.dismiss();
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