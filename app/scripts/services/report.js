'use strict';
angular.module('utils')
    .service('report', ['webService', 'ngToast', function (webService, ngToast) {

        var self = this;

        self.report = function (content, user) {

            var reportedContent = {
                photoId: -1,
                videoId: -1,
                audioId: -1,
                noticeId: -1,
                bandId: -1
            };

            for (var prop in content) {
                if (reportedContent.hasOwnProperty(prop)) {
                    reportedContent[prop] = content[prop];
                }
            }

            reportedContent.userId = user.userId;

            return webService.post('/users/' + user.userId + '/reports', reportedContent, {token:user.token})
                .then(function () {
                    ngToast.success('Denúncia realizada.');
                }, function (err) {
                    console.log(err);
                    ngToast.danger('Não foi possível realizar a denúncia. Tente novamente.');
                });

        };

    }]);


