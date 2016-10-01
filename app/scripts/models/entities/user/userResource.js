/**
 * Created by Aliss on 11/08/2016.
 */
(function (angular) {
    'use strict';
    angular.module('culturapia.user').service('userResource', ['webService', '$q', function (webService, $q) {
        var self = this;

        self.login = function (user) {
            //Config
            var endpoint = '/auth';
            var headers = {};
            //Validate
            if (user && user.facebookId) {
                headers.facebookId = user.facebookId;
            } else {
                return $q.reject({errorMessage: 'facebookId missing'});
            }

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

            if (user && user.facebookId) {
                endpoint = '/users/' + user.facebookId;
            } else {
                return $q.reject({errorMessage: 'FacebookId missing'});
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

            if (user && user.facebookId) {
                endpoint = '/users/' + user.facebookId;
            } else {
                return $q.reject({errorMessage: 'FacebookId missing'});
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

        // Bands
        self.loadBands = function (user) {
            var headers = {};
            var endpoint = '';
            //Validate and Mapping
            if (user && user.token) {
                headers.token = user.token;
            } else {
                console.log('Access token missing');
                return $q.reject({errorMessage: 'Access token missing'});
            }

            if (user && user.facebookId) {
                endpoint = '/users/' + user.facebookId + '/bands';
            } else {
                console.log('FacebookId missing');
                return $q.reject({errorMessage: 'FacebookId missing'});
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
