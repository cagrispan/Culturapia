'use strict';
angular.module('utils')
    .service('quizResponse', ['webService', function (webService) {

        var self = this;

        self.response = function (alternative, user) {

            var userResponse = {
                userId: user.userId,
                questionId: alternative.questionId,
                alternativeId: alternative.alternativeId
            };

            return webService.post('/users/' + user.userId + '/responses', userResponse, {token:user.token})
                .catch(function (err) {
                    console.log('Response Service Error');
                    console.log(err);
                });

        };

    }]);


