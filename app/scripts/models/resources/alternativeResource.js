/**
 * Created by Aliss on 11/08/2016.
 */
(function (angular) {
    'use strict';
    angular.module('culturapia.alternative').service('alternativeResource', ['webService', '$q', function (webService, $q) {
        var self = this;

        self.add = function (alternative, user) {
            var headers = {};
            var endpoint = '';
            var objectToSend;

            if (user && user.token) {
                headers.token = user.token;
            } else {
                console.log('Access token missing');
                return $q.reject({errorMessage: 'Access token missing'});
            }

            if (user && user.userId && alternative && alternative.questionId) {
                endpoint = '/users/' + user.userId + '/bands/' + alternative.bandId + '/questions/' + alternative.questionId + '/alternatives';
            } else {
                console.log('UserId missing');
                return $q.reject({errorMessage: 'UserId missing'});
            }

            //Validate and Mapping
            objectToSend = angular.copy(alternative);
            delete objectToSend.likes;
            delete objectToSend.url;

            //Make the request
            return webService.post(endpoint, objectToSend, headers).then(
                function (resolve) {
                    return resolve.data;
                }
            );
        };

        self.save = function (alternative, user) {
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

            if (user && user.userId && alternative && alternative.questionId && alternative.alternativeId) {
                endpoint = '/users/' + user.userId + '/bands/' + alternative.bandId + '/questions/' + alternative.questionId + '/alternatives/' + alternative.alternativeId;
            } else {
                console.log('UserId missing');
                return $q.reject({errorMessage: 'UserId missing'});
            }

            objectToSend = angular.copy(alternative);
            delete objectToSend.likes;
            delete objectToSend.url;

            //Make the request
            return webService.put(endpoint, objectToSend, headers).then(
                function (resolve) {
                    return resolve.data;
                }
            );
        };

        self.remove = function (alternative, user) {
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

            if (user && user.userId && alternative && alternative.questionId && alternative.alternativeId) {
                endpoint = '/users/' + user.userId + '/bands/' + alternative.bandId + '/questions/' + alternative.questionId + '/alternatives/' + alternative.alternativeId;
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

        self.getAllByQuestion = function (question, user) {

            var headers = {};
            var endpoint = '';
            //Validate and Mapping

            if (user && user.token) {
                headers.token = user.token;
            } else {
                console.log('Access token missing');
                return $q.reject({errorMessage: 'Access token missing'});
            }

            if (user && user.userId && question && question.questionId) {
                endpoint = '/users/' + user.userId + '/bands/' + question.bandId + '/questions/' + question.questionId + '/alternatives';
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
