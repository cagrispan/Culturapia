/**
 * Created by Aliss on 11/08/2016.
 */
(function (angular) {
    'use strict';
    angular.module('culturapia.photo').service('photoResource', ['webService', '$q', function (webService, $q) {
        var self = this;

        self.loadByAdmin = function (photo, admin) {
            var headers = {};
            var endpoint = "";

            //Validate and Mapping
            if (admin && admin.token) {
                headers.token = admin.token;
            } else {
                return $q.reject({errorMessage: 'Access token missing'});
            }

            if (admin && admin.adminId && photo && photo.photoId) {
                endpoint = '/admins/' + admin.adminId + '/photos/' + photo.photoId
            } else {
                return $q.reject({errorMessage: 'PhotoId missing'});
            }

            //Make the request
            return webService.get(endpoint, headers).then(
                function (resolve) {
                    return resolve.data;
                }
            );
        };

        self.save = function (photo, user) {
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

            if (user && user.userId && photo && photo.bandId && photo.photoId) {
                endpoint = '/users/' + user.userId + '/bands/' + photo.bandId + '/photos/' + photo.photoId;
            } else {
                console.log('UserId missing');
                return $q.reject({errorMessage: 'UserId missing'});
            }

            objectToSend = angular.copy(photo);
            delete objectToSend.likes;
            delete objectToSend.url;

            //Make the request
            return webService.put(endpoint, objectToSend, headers).then(
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
                endpoint = '/users/' + user.userId + '/bands/' + band.bandId + '/photos';
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
