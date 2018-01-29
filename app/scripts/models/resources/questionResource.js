/**
 * Created by Aliss on 11/08/2016.
 */
(function (angular) {
    'use strict';
    angular.module('culturapia.question').service('questionResource', ['webService', '$q', function (webService, $q) {
        var self = this;

        self.add = function (question, user) {
            var headers = {};
            var endpoint = '';
            var objectToSend;

            if (user && user.token) {
                headers.token = user.token;
            } else {
                console.log('Access token missing');
                return $q.reject({errorMessage: 'Access token missing'});
            }

            if (user && user.userId && question && question.bandId) {
                endpoint = '/users/' + user.userId + '/bands/' + question.bandId + '/questions';
            } else {
                console.log('UserId missing');
                return $q.reject({errorMessage: 'UserId missing'});
            }

            //Validate and Mapping
            objectToSend = angular.copy(question);
            delete objectToSend.likes;
            delete objectToSend.url;

            //Make the request
            return webService.post(endpoint, objectToSend, headers).then(
                function (resolve) {
                    return resolve.data;
                }
            );
        };

        self.loadByAdmin = function (question, admin) {
            var headers = {};
            var endpoint = "";

            //Validate and Mapping
            if (admin && admin.token) {
                headers.token = admin.token;
            } else {
                return $q.reject({errorMessage: 'Access token missing'});
            }

            if (admin && admin.adminId && question && question.questionId) {
                endpoint = '/admins/' + admin.adminId + '/questions/' + question.questionId
            } else {
                return $q.reject({errorMessage: 'QuestionId missing'});
            }

            //Make the request
            return webService.get(endpoint, headers).then(
                function (resolve) {
                    return resolve.data;
                }
            );
        };

        self.save = function (question, user) {
            var headers = {};
            var endpoint = "";
            var objectToSend;

            //Validate and Mapping
            if (user && user.token) {
                headers.token = user.token;
            } else {
                console.log('Access token missing');
                return $q.reject({errorMessage: 'Access token missing'});
            }

            if (user && user.userId && question && question.bandId && question.questionId) {
                endpoint = '/users/' + user.userId + '/bands/' + question.bandId + '/questions/' + question.questionId;
            } else {
                console.log('UserId missing');
                return $q.reject({errorMessage: 'UserId missing'});
            }

            objectToSend = angular.copy(question);
            delete objectToSend.likes;
            delete objectToSend.alternatives;
            delete objectToSend.responses;

            //Make the request
            return webService.put(endpoint, objectToSend, headers).then(
                function (resolve) {
                    return resolve.data;
                }
            );
        };

        self.remove = function (question, user) {
            var headers = {};
            var endpoint = "";
            var objectToSend;

            //Validate and Mapping
            if (user && user.token) {
                headers.token = user.token;
            } else {
                console.log('Access token missing');
                return $q.reject({errorMessage: 'Access token missing'});
            }

            if (user && user.userId && question && question.bandId && question.questionId) {
                endpoint = '/users/' + user.userId + '/bands/' + question.bandId + '/questions/' + question.questionId;
            } else {
                console.log('UserId missing');
                return $q.reject({errorMessage: 'UserId missing'});
            }

            //Make the request
            return webService.del(endpoint, headers).then(
                function (resolve) {
                    return resolve.data;
                }
            );
        };

        self.getAllByBand = function (band, user) {

            var headers = {};
            var endpoint = '';
            //Validate and Mapping

            if (user && user.token) {
                headers.token = user.token;
            } else {
                console.log('Access token missing');
                return $q.reject({errorMessage: 'Access token missing'});
            }

            if (user && user.userId && band && band.bandId) {
                endpoint = '/users/' + user.userId + '/bands/' + band.bandId + '/questions';
            } else {
                console.log('UserId missing');
                return $q.reject({errorMessage: 'UserId missing'});
            }

            //Make the request
            return webService.get(endpoint, headers).then(
                function (resolve) {
                    return resolve.data;
                }
            );

        };

    }]);
})(angular);
