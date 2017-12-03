(function (angular) {
    'use strict';
    angular.module('culturapia.band')
        .controller('BandCtrl', ['Band', '$routeParams', 'like', 'shareData', 'ModalService', 'facebookAPI', 'lists', 'report', 'globals', 'bandTypes', '$location',
            function (Band, $routeParams, like, shareData, ModalService, facebookAPI, lists, report, globals, bandTypes, $location) {

                var self = this;

                self.baseUrl = globals.baseUrl;

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

                self.bandDetails = function () {
                    ModalService.bandDetails(self.band).result
                        .then(function () {
                            init();
                        });
                };

                self.quiz = function () {
                    ModalService.quizResponse(self.band).result
                        .then(function () {
                            init();
                        });
                };

                self.feed = function (content) {
                    facebookAPI.feed(content);
                };

                self.openVideo = function (video) {
                    ModalService.video(video).result
                        .finally(function () {
                            init();
                        });
                };

                self.nextPage = function () {
                    if (self.busy) return;
                    if (!self.band.notices || self.band.notices.length < parseInt(self.band.noticesTotal)) {
                        self.busy = true;
                        self.band._getNotices(self.user)
                            .then(function () {
                                like.verifyLiked(self.band.notices, self.user.userId);
                                self.busy = false;
                            }, function () {
                                self.busy = false;
                            });
                    }
                };

                self.getInfo = function () {
                    self.band._getInfo().then(function () {
                        if (self.band.isReported === '1' || self.band.isDeleted === '1') $location.path('404');
                        self.state = lists.states[self.band.state].name;
                        self.city = lists.states[self.band.state].cities[self.band.city];

                        bandTypes.getBandTypes()
                            .then(function (bandTypes) {
                                self.videoSize = parseInt(bandTypes[self.band.type].video);
                                self.audioSize = parseInt(bandTypes[self.band.type].audio);
                                self.haveCalendar = !!parseInt(bandTypes[self.band.type].calendar);
                                self.haveQuiz = !!parseInt(bandTypes[self.band.type].quiz);
                                self.haveDonation = !!parseInt(bandTypes[self.band.type].donation);

                                self.videos = [];
                                for (var i in self.band.videos) {
                                    if (self.band.videos[i].isReported === '0' && self.band.videos[i].isDeleted === '0' && self.videos.length < self.videoSize) {
                                        self.videos.push(self.band.videos[i]);
                                    }
                                }

                                if (self.user) {
                                    self.band._getEvents(self.user)
                                        .then(function () {
                                            self.events = self.band.eventsList;
                                            self.eventSources = [self.band.events];
                                            self.showCalendar = true;
                                            like.verifyLiked(self.band.events, self.user.userId);
                                        });

                                    like.verifyLiked(self.band.videos, self.user.userId);
                                    self.band.likedByUser = like.verifyItem(self.band, self.user.userId);
                                }
                            });
                    });
                };

                self.likedContent = function (content) {
                    if (self.user) {
                        like.like(content, self.user)
                            .then(function () {
                                content.likedByUser = !content.likedByUser;
                                if (content.likes.length) {
                                    for (var j = 0; j < content.likes.length; j++) {
                                        if (self.user && content.likes[j].userId === self.user.userId) {
                                            content.likes.splice(j, 1);
                                        } else {
                                            content.likes.push({ userId: self.user.userId });
                                        }
                                    }
                                } else {
                                    content.likes.push({ userId: self.user.userId });
                                }
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

                /* alert on eventClick */
                self.alertOnEventClick = function (date, jsEvent, view) {
                    ModalService.event(date);
                };
                /* remove event */
                self.remove = function (index) {
                    self.events.splice(index, 1);
                };

                self.uiConfig = {
                    calendar: {
                        height: 'auto',
                        editable: false,
                        header: {
                            left: 'title',
                            center: '',
                            right: 'prev,next'
                        },
                        eventClick: self.alertOnEventClick,
                        monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
                        timeFormat: 'HH:mm'
                    }
                };

            }]);
})(angular);
