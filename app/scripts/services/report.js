'use strict';
angular.module('utils')
    .service('report', ['webService', function (webService) {

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
                .catch(function (err) {
                    console.log('Like Service Error');
                    console.log(err);
                });

        };

    }]);


