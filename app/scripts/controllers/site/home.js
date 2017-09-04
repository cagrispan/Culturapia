(function (angular) {
    'use strict';
    angular.module('culturapia')
        .controller('HomeCtrl', ['lists', 'ModalService', 'like', '$location', 'shareData', 'report', 'facebookAPI', 'Video',
            function (lists, ModalService, like, $location, shareData, report, facebookAPI, Video) {

                var self = this;

                function init() {
                    self.user = shareData.get('user');

                    self.getStates();
                    self.getStyles();
                    self.nextPage();

                    self.search = {};

                    self.search.isDeleted = "0";
                    self.search.isReported = "0";
                }

                self.setState = function () {
                    if (self.state) {
                        self.cities = self.states[self.state].cities;
                        self.search.state = self.state;
                    } else {
                        self.cities = {};
                        self.search.state = '';
                    }

                };

                self.getStates = function () {
                    self.states = lists.getStates();
                };

                self.getStyles = function () {
                    lists.getStyles()
                        .then(function (result) {
                            self.styles = result.data.styles;
                        })
                        .catch(function (err) {
                            console.log(err);
                        });
                };

                self.nextPage = function () {
                    debugger
                    if (self.busy) return;
                    if (!self.videos || self.videos.length < self.videosTotal){
                        self.busy = true;
                        var size = self.videos ? self.videos.length : 0;
                        Video.loadList(size)
                            .then(function (response) {
                                self.videos = self.videos ? self.videos.concat(response.videoList) : response.videoList;
                                self.videosTotal = response.size;
                                self.busy = false;
                                verifyLikedVideos();
                            },function (err) {
                                console.log(err);
                            });
                    }
                };

                self.openVideo = function (video) {
                    ModalService.video(video).result
                        .finally(function () {
                            init();
                        });
                };

                self.feed = function (content) {
                    facebookAPI.feed(content);
                };

                self.likedContent = function (content) {
                    if (self.user) {
                        like.like(content, self.user)
                            .then(function () {
                                self.getVideos();
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
                        report.report(content, self.user);
                    } else {
                        ModalService.login().result
                            .then(function () {
                                init();
                            });
                    }
                };

                function verifyLikedVideos() {
                    for (var i in self.videos) {
                        self.videos[i].likedByUser = false;
                        for (var j in self.videos[i].likes) {
                            if (self.user && self.videos[i].likes[j].userId === self.user.userId) {
                                self.videos[i].likedByUser = true;
                            }
                        }
                    }
                }

                init();


            }]);
})(angular);