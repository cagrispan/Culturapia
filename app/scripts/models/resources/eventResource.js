/**
 * Created by Aliss on 11/08/2016.
 */
(function (angular) {
    'use strict';
    angular.module('culturapia.event').service('eventResource', ['webService', '$q', function (webService, $q) {
        var self = this;

        self.add = function (event, user) {
            var headers = {};
            var endpoint = '';
            var objectToSend;

            if (user && user.token) {
                headers.token = user.token;
            } else {
                console.log('Access token missing');
                return $q.reject({errorMessage: 'Access token missing'});
            }

            if (user && user.userId && event && event.bandId) {
                endpoint = '/users/' + user.userId + '/bands/' + event.bandId + '/events';
            } else {
                console.log('UserId missing');
                return $q.reject({errorMessage: 'UserId missing'});
            }

            //Validate and Mapping
            objectToSend = angular.copy(event);

            //Make the request
            return webService.post(endpoint, objectToSend, headers).then(
                function (resolve) {
                    return resolve.data;
                }
            );
        };

        self.loadByAdmin = function (event, admin) {
            var headers = {};
            var endpoint = "";

            //Validate and Mapping
            if (admin && admin.token) {
                headers.token = admin.token;
            } else {
                return $q.reject({errorMessage: 'Access token missing'});
            }

            if (admin && admin.adminId && event && event.eventId) {
                endpoint = '/admins/' + admin.adminId + '/events/' + event.eventId
            } else {
                return $q.reject({errorMessage: 'EventId missing'});
            }

            //Make the request
            return webService.get(endpoint, headers).then(
                function (resolve) {
                    return resolve.data;
                }
            );
        };

        self.save = function (event, user) {
            var headers = {};
            var endpoint = "";
            var objectToSend;

            objectToSend = {
                bandId: event.bandId,
                description: event.description,
                id: event.id,
                local: event.local,
                start: event.start,
                title: event.title
            };

            //Validate and Mapping
            if (user && user.token) {
                headers.token = user.token;
            } else {
                console.log('Access token missing');
                return $q.reject({errorMessage: 'Access token missing'});
            }

            if (user && user.userId && event && event.bandId && event.id) {
                endpoint = '/users/' + user.userId + '/bands/' + event.bandId + '/events/' + event.id;
            } else {
                console.log('UserId missing');
                return $q.reject({errorMessage: 'UserId missing'});
            }


            //Make the request
            return webService.put(endpoint, objectToSend, headers).then(
                function (resolve) {
                    return resolve.data;
                }
            );
        };

        self.remove = function (event, user) {
            var headers = {};
            var endpoint = "";

            //Validate and Mapping
            if (user && user.token) {
                headers.token = user.token;
            } else {
                console.log('Access token missing');
                return $q.reject({errorMessage: 'Access token missing'});
            }

            if (user && user.userId && event && event.bandId && event.id) {
                endpoint = '/users/' + user.userId + '/bands/' + event.bandId + '/events/' + event.id;
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
                endpoint = '/users/' + user.userId + '/bands/' + band.bandId + '/events';
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
