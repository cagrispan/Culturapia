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
                        }
                    }

                    self.reports = {
                        'Video': {},
                        'Foto': {},
                        'Postagem': {}
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

            self.openReport = function (report) {
                switch (report.mediaType) {
                    case 'Video':
                        var video = new Video();
                        video.videoId = report.mediaId;
                        video._loadByAdmin($rootScope.admin)
                            .then(function () {
                                ModalService.reportContent(video);
                            });
                        break;
                    case 'Foto':
                        webService.get('/admins/' + $rootScope.admin.adminId + '/photos/' + report.mediaId, {token: $rootScope.admin.token})
                            .then(function (response) {
                                ModalService.reportContent(response.data.photo);
                            });
                        break;
                    case 'Postagem':
                        webService.get('/admins/' + $rootScope.admin.adminId + '/notices/' + report.mediaId, {token: $rootScope.admin.token})
                            .then(function (response) {
                                ModalService.reportContent(response.data.notice);
                            });
                        break;
                }
            };
        }]);
})(angular);