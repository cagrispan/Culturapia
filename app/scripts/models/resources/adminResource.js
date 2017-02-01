/**
 * Created by Aliss on 11/08/2016.
 */
(function (angular) {
    'use strict';
    angular.module('culturapia.admin').service('adminResource', ['webService', '$q', function (webService, $q) {
        var self = this;

        self.login = function (admin) {
            var headers = {type: 'admin'};
            var endpoint = '/auth';

            //Make the request
            return webService.post(endpoint, admin, headers).then(
                function (resolve) {
                    return resolve.data;
                }
            );
        };

        self.add = function (adminToAdd, admin) {
            var headers = {};
            var endpoint = '/admins';
            var objectToSend;

            if (admin && admin.token) {
                headers.token = admin.token;
            } else {
                console.log('Access token missing');
                return $q.reject({errorMessage: 'Access token missing'});
            }

            if (admin && admin.adminId) {
                headers.adminId = admin.adminId;
            } else {
                console.log('AdminId missing');
                return $q.reject({errorMessage: 'AdminId missing'});
            }

            //Validate and Mapping
            objectToSend = angular.copy(adminToAdd);
            delete objectToSend.adminId;
            delete objectToSend.token;

            //Make the request
            return webService.post(endpoint, objectToSend, headers).then(
                function (resolve) {
                    return resolve.data;
                }
            );
        };

        self.load = function (admin) {
            var headers = {};
            var endpoint = "";

            //Validate and Mapping
            if (admin && admin.token) {
                headers.token = admin.token;
            } else {
                return $q.reject({errorMessage: 'Access token missing'});
            }

            if (admin && admin.adminId) {
                endpoint = '/admins/' + admin.adminId;
            } else {
                return $q.reject({errorMessage: 'AdminId missing'});
            }

            //Make the request
            return webService.get(endpoint, headers).then(
                function (resolve) {
                    return resolve.data;
                }
            );
        };

        self.save = function (admin) {
            var headers = {};
            var endpoint = "";
            var objectToSend;
            //Validate and Mapping
            objectToSend = angular.copy(admin);

            if (admin && admin.token) {
                headers.token = admin.token;
            } else {
                return $q.reject({errorMessage: 'Access token missing'});
            }

            if (admin && admin.adminId) {
                endpoint = '/admins/' + admin.adminId;
            } else {
                return $q.reject({errorMessage: 'AdminId missing'});
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

        self.remove = function (adminToRemove, admin) {
            var headers = {};
            var endpoint = "";

            if (admin && admin.token) {
                headers.token = admin.token;
            } else {
                return $q.reject({errorMessage: 'Access token missing'});
            }

            if (admin && admin.adminId) {
                headers.adminId = admin.adminId;
            } else {
                return $q.reject({errorMessage: 'AdminId missing'});
            }

            if (adminToRemove && adminToRemove.adminId) {
                endpoint = '/admins/' + adminToRemove.adminId;
            } else {
                return $q.reject({errorMessage: 'AdminId missing'});
            }

            //Make the request
            return webService.del(endpoint, headers).then(
                function (resolve) {
                    return resolve.data;
                }
            );
        };

        self.getAll = function (admin) {

            var headers = {};
            var endpoint = '/admins';
            //Validate and Mapping
            if (admin && admin.token) {
                headers.token = admin.token;
            } else {
                console.log('Access token missing');
                return $q.reject({errorMessage: 'Access token missing'});
            }

            if (admin && admin.adminId) {
                headers.adminId = admin.adminId;
            } else {
                console.log('AdminId missing');
                return $q.reject({errorMessage: 'AdminId missing'});
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
