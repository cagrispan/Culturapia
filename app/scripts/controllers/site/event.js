(function (angular) {
    'use strict';
    angular.module('culturapia.band')
        .controller('EventCtrl', ['event', '$uibModalInstance', 'ModalService', 'shareData', 'like', 'facebookAPI', 'report',
            function (event, $uibModalInstance, ModalService, shareData, like, facebookAPI, report) {

                var self = this;

                function init() {
                    self.user = shareData.get('user');
                    self.event = event;
                    if (self.event.start) self.event.start = new Date(self.event.start);
                    if (self.event.end) self.event.end = new Date(self.event.end);
                    self.getEventLikes();
                }

                self.getEventLikes = function () {
                    self.event._getLikes()
                        .then(function () {
                            self.event.likedByUser = like.verifyItem(self.event, self.user.userId);
                        });
                };

                self.feed = function (content) {
                    facebookAPI.feed(content);
                };

                self.likedContent = function (content) {
                    if (self.user) {
                        like.like(content, self.user)
                            .then(function () {
                                self.getEventLikes();
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