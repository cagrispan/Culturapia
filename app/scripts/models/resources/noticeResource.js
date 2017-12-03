/**
 * Created by Aliss on 11/08/2016.
 */
(function (angular) {
    'use strict';
    angular.module('culturapia.notice').service('noticeResource', ['webService', '$q', function (webService, $q) {
        var self = this;

        self.add = function (notice, user) {
            var headers = {};
            var endpoint = '';
            var objectToSend;

            if (user && user.token) {
                headers.token = user.token;
            }
            // else {
            //     console.log('Access token missing');
            //     return $q.reject({errorMessage: 'Access token missing'});
            // }

            if (user && user.userId && notice && notice.bandId) {
                endpoint = '/users/' + user.userId + '/bands/' + notice.bandId + '/notices';
            } else {
                console.log('UserId missing');
                return $q.reject({errorMessage: 'UserId missing'});
            }

            //Validate and Mapping
            objectToSend = angular.copy(notice);
            delete objectToSend.likes;
            delete objectToSend.url;

            //Make the request
            return webService.post(endpoint, objectToSend, headers).then(
                function (resolve) {
                    return resolve.data;
                }
            );
        };

        self.loadByAdmin = function (notice, admin) {
            var headers = {};
            var endpoint = "";

            //Validate and Mapping
            if (admin && admin.token) {
                headers.token = admin.token;
            } else {
                return $q.reject({errorMessage: 'Access token missing'});
            }

            if (admin && admin.adminId && notice && notice.noticeId) {
                endpoint = '/admins/' + admin.adminId + '/notices/' + notice.noticeId
            } else {
                return $q.reject({errorMessage: 'NoticeId missing'});
            }

            //Make the request
            return webService.get(endpoint, headers).then(
                function (resolve) {
                    return resolve.data;
                }
            );
        };

        self.save = function (notice, user) {
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

            if (user && user.userId && notice && notice.bandId && notice.noticeId) {
                endpoint = '/users/' + user.userId + '/bands/' + notice.bandId + '/notices/' + notice.noticeId;
            } else {
                console.log('UserId missing');
                return $q.reject({errorMessage: 'UserId missing'});
            }

            objectToSend = angular.copy(notice);
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
                headers.start = band && band.notices ? band.notices.length : 0;
            } else {
                console.log('Access token missing');
                return $q.reject({errorMessage: 'Access token missing'});
            }

            if (user && user.userId) {
                endpoint += '/users/' + user.userId;
            }
            if (band && band.bandId) {
                endpoint += '/bands/' + band.bandId + '/notices';
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
