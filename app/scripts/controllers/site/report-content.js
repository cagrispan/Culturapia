(function (angular) {
    'use strict';
    angular.module('culturapia')
        .controller('ReportContentCtrl', ['$location', 'reportContent', '$uibModalInstance', 'webService', '$rootScope', 'ngToast',
            function ($location, reportContent, $uibModalInstance, webService, $rootScope, ngToast) {

                var self = this;

                var path;
                var message;

                if (!$rootScope.admin) {
                    $location.path('/admin');
                }

                self.reportContent = reportContent;

                self.blockContent = function () {
                    self.reportContent.isReported = 1;
                    message = 'bloqueado.';
                    request(message);
                };

                self.unblockContent = function () {
                    self.reportContent.isReported = 0;
                    message = 'desbloqueado.';
                    request(message);
                };

                function request(message){

                    if (self.reportContent.videoId) {
                        path = '/admins/' + $rootScope.admin.adminId + '/videos/' + self.reportContent.videoId;
                    } else if (self.reportContent.photoId) {
                        path = '/admins/' + $rootScope.admin.adminId + '/photos/' + self.reportContent.photoId
                    } else if (self.reportContent.noticeId) {
                        path = '/admins/' + $rootScope.admin.adminId + '/notices/' + self.reportContent.noticeId
                    }

                    webService.put(path, self.reportContent, {token: $rootScope.admin.token})
                        .then(function () {
                            ngToast.success('Conteúdo ' + message);
                            $uibModalInstance.close();
                        },function () {
                            ngToast.danger('Falha na requisição. Tente novamente');
                        });
                }

                self.ok = function () {
                    $uibModalInstance.close();
                };

                self.cancel = function () {
                    $uibModalInstance.dismiss();
                };

            }]);
})(angular);