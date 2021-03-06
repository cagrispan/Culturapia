/**
 * Created by Aliss on 11/08/2016.
 */
(function (angular) {
    'use strict';
    angular.module('culturapia.user').service('userResource', ['webService', '$q', function (webService, $q) {
        var self = this;

        self.facebookLogin = function (user) {
            var headers = {type: 'facebook'};
            var endpoint = '/auth';

            //Make the request
            return webService.post(endpoint, user, headers).then(
                function (resolve) {
                    return resolve.data;
                }
            );
        };

        self.load = function (user) {
            var headers = {};
            var endpoint = "";

            //Validate and Mapping
            if (user && user.token) {
                headers.token = user.token;
            } else {
                return $q.reject({errorMessage: 'Access token missing'});
            }

            if (user && user.userId) {
                endpoint = '/users/' + user.userId;
            } else {
                return $q.reject({errorMessage: 'UserId missing'});
            }

            //Make the request
            return webService.get(endpoint, headers).then(
                function (resolve) {
                    return resolve.data;
                }
            );
        };

        self.save = function (user) {
            var headers = {};
            var endpoint = "";
            var objectToSend;
            //Validate and Mapping
            objectToSend = angular.copy(user);

            if (user && user.token) {
                headers.token = user.token;
            } else {
                return $q.reject({errorMessage: 'Access token missing'});
            }

            if (user && user.userId) {
                endpoint = '/users/' + user.userId;
            } else {
                return $q.reject({errorMessage: 'UserId missing'});
            }

            delete objectToSend.token;
            delete objectToSend.bands;

            //Make the request
            return webService.put(endpoint, objectToSend, headers).then(
                function (resolve) {
                    return resolve.data;
                }
            );
        };

        self.add = function (user) {
            var headers = {};
            var endpoint = '/users';
            var objectToSend;
            //Validate and Mapping
            objectToSend = angular.copy(user);

            //Make the request
            return webService.post(endpoint, objectToSend, headers).then(
                function (resolve) {
                    return resolve.data;
                }
            );
        };

        self.changePassword = function (user, oldPassword, newPassword) {
            var headers = {};
            var endpoint = '';

            //Validate and Mapping
            var userPassword = {oldPassword: oldPassword, newPassword: newPassword};

            if (user && user.token) {
                headers.token = user.token;
            } else {
                return $q.reject({errorMessage: 'Access token missing'});
            }

            if (user && user.userId) {
                endpoint = '/users/' + user.userId + '/password';
            } else {
                return $q.reject({errorMessage: 'UserId missing'});
            }

            //Make the request
            return webService.post(endpoint, userPassword, headers).then(
                function (resolve) {
                    return resolve.data;
                }
            );
        };

    }]);
})(angular);
