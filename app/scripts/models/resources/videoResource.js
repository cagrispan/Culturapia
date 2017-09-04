/**
 * Created by Aliss on 11/08/2016.
 */
(function (angular) {
    'use strict';
    angular.module('culturapia.video').service('videoResource', ['webService', '$q', function (webService, $q) {
        var self = this;

        self.add = function (video, user) {
            var headers = {};
            var endpoint = '';
            var objectToSend;

            if (user && user.token) {
                headers.token = user.token;
            } else {
                console.log('Access token missing');
                return $q.reject({errorMessage: 'Access token missing'});
            }

            if (user && user.userId && video && video.bandId) {
                endpoint = '/users/' + user.userId + '/bands/' + video.bandId + '/videos';
            } else {
                return $q.reject({errorMessage: 'UserId missing'});
            }

            //Validate and Mapping
            objectToSend = angular.copy(video);
            delete objectToSend.likes;
            delete objectToSend.url;

            //Make the request
            return webService.post(endpoint, objectToSend, headers).then(
                function (resolve) {
                    return resolve.data;
                }
            );
        };

        self.loadByAdmin = function (video, admin) {
            var headers = {};
            var endpoint = "";

            //Validate and Mapping
            if (admin && admin.token) {
                headers.token = admin.token;
            } else {
                return $q.reject({errorMessage: 'Access token missing'});
            }

            if (admin && admin.adminId && video && video.videoId) {
                endpoint = '/admins/' + admin.adminId + '/videos/' + video.videoId
            } else {
                return $q.reject({errorMessage: 'VideoId missing'});
            }

            //Make the request
            return webService.get(endpoint, headers).then(
                function (resolve) {
                    return resolve.data;
                }
            );
        };

        self.save = function (video, user) {
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

            if (user && user.userId && video && video.bandId && video.videoId) {
                endpoint = '/users/' + user.userId + '/bands/' + video.bandId + '/videos/' + video.videoId;
            } else {
                console.log('UserId missing');
                return $q.reject({errorMessage: 'UserId missing'});
            }

            objectToSend = angular.copy(video);
            delete objectToSend.likes;
            delete objectToSend.url;

            //Make the request
            return webService.put(endpoint, objectToSend, headers).then(
                function (resolve) {
                    return resolve.data;
                }
            );
        };

        self.getAll = function (size) {

            var headers = {};
            headers.start = size;
            var endpoint = '/videos';
            //Validate and Mapping

            //Make the request
            return webService.get(endpoint, headers).then(
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
                return $q.reject({errorMessage: 'VideoId missing'});
            }

            if (user && user.userId && band && band.bandId) {
                endpoint = '/users/' + user.userId + '/bands/' + band.bandId + '/videos';
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

    }]);
})(angular);
