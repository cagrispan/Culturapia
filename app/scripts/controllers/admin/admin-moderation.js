(function (angular) {
    'use strict';
    angular.module('culturapia')
        .controller('AdminModerationCtrl', ['$rootScope', '$location', 'lists', 'webService', 'ModalService', 'Video',
            function ($rootScope, $location, lists, webService, ModalService, Video) {

                var self = this;

                if (!$rootScope.admin) {
                    $location.path('/admin');
                } else {
                    getReports();
                }

                function getReports() {
                    lists.getReports($rootScope.admin).then(function (result) {
                        for (var index in result.data.reports) {
                            var report = result.data.reports[index];
                            if (report.videoId !== '-1') {
                                report.mediaId = report.videoId;
                                report.mediaType = 'Video';
                            } else if (report.photoId !== '-1') {
                                report.mediaId = report.photoId;
                                report.mediaType = 'Foto';
                            } else if (report.noticeId !== '-1') {
                                report.mediaId = report.noticeId;
                                report.mediaType = 'Postagem';
                            } else if (report.questionId !== '-1') {
                                report.mediaId = report.questionId;
                                report.mediaType = 'Pergunta';
                            } else if (report.profilePictureId !== '-1') {
                                report.mediaId = report.profilePictureId;
                                report.mediaType = 'Foto de Perfil';
                            } else if (report.eventId !== '-1') {
                                report.mediaId = report.eventId;
                                report.mediaType = 'Evento';
                            }
                            getStatus(report);
                        }

                        self.reports = {
                            'Video': {},
                            'Foto': {},
                            'Postagem': {},
                            'Pergunta': {},
                            'Evento': {},
                            'Foto de Perfil': {}
                        };

                        result.data.reports.map(function (a) {
                            if (self.reports[a.mediaType][a.mediaId]) {
                                self.reports[a.mediaType][a.mediaId].count++;
                            } else {
                                self.reports[a.mediaType][a.mediaId] = a;
                                self.reports[a.mediaType][a.mediaId].count = 1
                            }
                        });
                    });
                }

                function getStatus(report) {
                    var isReported = null;
                    switch (report.mediaType) {
                        case 'Video':
                            var video = new Video();
                            video.videoId = report.mediaId;
                            video._loadByAdmin($rootScope.admin)
                                .then(function () {
                                    report.status = video.isReported;
                                });
                            break;
                        case 'Foto':
                            webService.get('/admins/' + $rootScope.admin.adminId + '/photos/' + report.mediaId, { token: $rootScope.admin.token })
                                .then(function (response) {
                                    report.status = response.data.photo.isReported;
                                });
                            break;
                        case 'Postagem':
                            webService.get('/admins/' + $rootScope.admin.adminId + '/notices/' + report.mediaId, { token: $rootScope.admin.token })
                                .then(function (response) {
                                    report.status = response.data.notice.isReported;
                                });
                            break;
                        case 'Pergunta':
                            webService.get('/admins/' + $rootScope.admin.adminId + '/questions/' + report.mediaId, { token: $rootScope.admin.token })
                                .then(function (response) {
                                    report.status = response.data.question.isReported;
                                });
                            break;
                        case 'Foto de Perfil':
                            webService.get('/admins/' + $rootScope.admin.adminId + '/profile-pictures/' + report.mediaId, { token: $rootScope.admin.token })
                                .then(function (response) {
                                    report.status = response.data.profilePicture.isReported;
                                });
                            break;
                        case 'Evento':
                            webService.get('/admins/' + $rootScope.admin.adminId + '/events/' + report.mediaId, { token: $rootScope.admin.token })
                                .then(function (response) {
                                    report.status = response.data.event.isReported;
                                });
                            break;
                    }
                }

                self.openReport = function (report) {
                    switch (report.mediaType) {
                        case 'Video':
                            var video = new Video();
                            video.videoId = report.mediaId;
                            video._loadByAdmin($rootScope.admin)
                                .then(function () {
                                    ModalService.reportContent(video).result
                                        .then(function () {
                                            self.reports = null;
                                            getReports();
                                        });
                                });
                            break;
                        case 'Foto':
                            webService.get('/admins/' + $rootScope.admin.adminId + '/photos/' + report.mediaId, { token: $rootScope.admin.token })
                                .then(function (response) {
                                    ModalService.reportContent(response.data.photo).result
                                        .then(function () {
                                            self.reports = null;
                                            getReports();
                                        });
                                });
                            break;
                        case 'Postagem':
                            webService.get('/admins/' + $rootScope.admin.adminId + '/notices/' + report.mediaId, { token: $rootScope.admin.token })
                                .then(function (response) {
                                    ModalService.reportContent(response.data.notice).result
                                        .then(function () {
                                            self.reports = null;
                                            getReports();
                                        });
                                });
                            break;
                        case 'Pergunta':
                            webService.get('/admins/' + $rootScope.admin.adminId + '/questions/' + report.mediaId, { token: $rootScope.admin.token })
                                .then(function (response) {
                                    ModalService.reportContent(response.data.question).result
                                        .then(function () {
                                            self.reports = null;
                                            getReports();
                                        });
                                });
                            break;
                        case 'Foto de Perfil':
                            webService.get('/admins/' + $rootScope.admin.adminId + '/profile-pictures/' + report.mediaId, { token: $rootScope.admin.token })
                                .then(function (response) {
                                    ModalService.reportContent(response.data.profilePicture).result
                                        .then(function () {
                                            self.reports = null;
                                            getReports();
                                        });
                                });
                            break;
                        case 'Evento':
                            webService.get('/admins/' + $rootScope.admin.adminId + '/events/' + report.mediaId, { token: $rootScope.admin.token })
                                .then(function (response) {
                                    ModalService.reportContent(response.data.event).result
                                        .then(function () {
                                            self.reports = null;
                                            getReports();
                                        });
                                });
                            break;
                    }
                };
            }]);
})(angular);