'use strict';
angular.module('utils')
    .service('webService', ['$http', 'globals', function ($http, globals) {

        var self = this;

        var baseUrl = globals.baseUrl;

        self.get = function (endpoint, headers) {
            headers['Content-Type'] = 'application/json';
            var req = {
                method: 'GET',
                url: baseUrl + endpoint,
                headers: headers
            };

            return $http(req);
        };

        self.post = function (endpoint, params, headers) {
            headers['Content-Type'] = 'application/json';
            var req = {
                method: 'POST',
                url: baseUrl + endpoint,
                headers: headers,
                data: params
            };

            return $http(req);
        };


        self.put = function (endpoint, params, headers) {
            headers['Content-Type'] = 'application/json';
            var req = {
                method: 'PUT',
                url: baseUrl + endpoint,
                headers: headers,
                data: params
            };

            return $http(req);
        };

        self.del = function (endpoint, headers) {
            headers['Content-Type'] = 'application/json';
            var req = {
                method: 'DELETE',
                url: baseUrl + endpoint,
                headers: headers
            };

            return $http(req);
        };
    }]);
