(function (angular) {
    'use strict';
    angular.module('culturapia.band')
        .controller('MyBandCtrl', ['shareData', '$location', 'ModalService', 'Band', '$routeParams', 'Notice', 'ngToast', 'globals', 'pagSeguro', 'bandTypes',
            function (shareData, $location, ModalService, Band, $routeParams, Notice, ngToast, globals, pagSeguro, bandTypes) {

                var self = this;

                self.baseUrl = globals.baseUrl;

                function init() {
                    self.user = shareData.get('user');



                    if (!self.user) {
                        ModalService.login()
                            .result.then(function () {
                                self.user = shareData.get('user');
                                init();
                            }, function () {
                                $location.path('/');
                            });
                    } else {
                        self.band = new Band();
                        self.band.bandId = $routeParams.bandId;

                        self.newNotice = new Notice();

                        self.band._getNotices(self.user);
                        self.band._getAudios(self.user);
                        self.band._getEvents(self.user).then(function () {
                            self.events = self.band.events;
                            self.eventSources = [self.band.events];
                            self.showCalendar = true;
                        });

                        self.band._getAll(self.user)
                            .then(function () {
                                bandTypes.getBandTypes()
                                    .then(function (bandTypes) {
                                        self.haveCalendar = !!parseInt(bandTypes[self.band.type].calendar);
                                        self.haveQuiz = !!parseInt(bandTypes[self.band.type].quiz);
                                        self.haveStats = !!parseInt(bandTypes[self.band.type].stats);
                                        self.haveDonation = !!parseInt(bandTypes[self.band.type].donation);
                                    });
                            });
                    }
                }

                self.addNotice = function () {
                    if (self.newNotice.notice) {
                        self.newNotice.date = new Date();
                        self.newNotice.bandId = self.band.bandId;
                        self.newNotice._add(self.user)
                            .then(function () {
                                ngToast.success("Postagem realizada");
                                self.band._getNotices(self.user);
                                self.newNotice = new Notice();
                            }, function () {
                                ngToast.danger("Não foi possível realizar a postagem. Tente novamente.");
                            });

                    }
                };

                self.removeNotice = function (notice) {
                    var noticeToRemove = angular.copy(notice);
                    noticeToRemove.isDeleted = 1;
                    noticeToRemove._save(self.user)
                        .then(function () {
                            ngToast.success("Postagem excluida");
                            self.band._getNotices(self.user);
                        }, function () {
                            ngToast.danger("Não foi possível excluir a postagem. Tente novamente.");
                        });
                };

                self.visualize = function () {
                    $location.path('/bands/' + self.band.bandId);
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
                    self.haveStats ? ModalService.stats(self.band) : ModalService.getPremium(self.band);
                };

                self.quiz = function () {
                    self.haveQuiz ? ModalService.quiz(self.band) : ModalService.getPremium(self.band);
                };

                self.profilePicture = function () {
                    ModalService.profilePicture(self.band);
                };

                self.config = function () {
                    ModalService.config(self.band);
                };

                self.addEvent = function () {
                    if (self.haveCalendar) {
                        ModalService.addEvent(self.band).result
                            .then(function () {
                                self.showCalendar = false;
                                init();
                            });
                    } else {
                        ModalService.getPremium(self.band);
                    }
                };

                //-------------------------------------------------------------------------------------------

                /* alert on eventClick */
                self.alertOnEventClick = function (date, jsEvent, view) {
                    ModalService.editEvent(date, self.band).result
                        .then(function () {
                            self.showCalendar = false;
                            init();
                        });
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

                init();

            }]);
})(angular);