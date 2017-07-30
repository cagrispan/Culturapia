(function (angular) {
    'use strict';
    angular.module('culturapia.band')
        .controller('BandCtrl', ['Band', '$routeParams', 'like', 'shareData', 'ModalService', 'facebookAPI', 'lists', 'report', 'globals', 'bandTypes',
            function (Band, $routeParams, like, shareData, ModalService, facebookAPI, lists, report, globals, bandTypes) {

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

                self.getInfo = function () {
                    self.band._getInfo().then(function () {
                        self.state = lists.states[self.band.state].name;
                        self.city = lists.states[self.band.state].cities[self.band.city];

                        bandTypes.getBandTypes()
                            .then(function (bandTypes) {
                                self.videoSize = parseInt(bandTypes[self.band.type].video);
                                self.audioSize = parseInt(bandTypes[self.band.type].audio);
                                self.haveCalendar = !!parseInt(bandTypes[self.band.type].calendar);
                                self.haveQuiz = !!parseInt(bandTypes[self.band.type].quiz);

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

                                    like.verifyLiked(self.band.notices, self.user.userId);
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