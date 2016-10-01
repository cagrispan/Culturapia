'use strict';
angular.module('utils')
    .service('webService', ['$http', '$q',  function ($http, $q) {

        var baseUrl = 'http://server.culturapia.com.br';

        this.get = function (endpoint, headers) {
            headers['Content-Type'] = 'application/json';
            var req = {
                method: 'GET',
                url: baseUrl + endpoint,
                headers: headers
            };

            return request(req);
        };

        this.post = function (endpoint, params, headers) {
            headers['Content-Type'] = 'application/json';
            var req = {
                method: 'POST',
                url: baseUrl + endpoint,
                headers: headers,
                data: params
            };

            return request(req);
        };


        this.put = function (endpoint, params, headers) {
            headers['Content-Type'] = 'application/json';
            var req = {
                method: 'PUT',
                url: baseUrl + endpoint,
                headers: headers,
                data: params
            };

            return request(req);

        };

        this.del = function (endpoint, headers) {
            headers['Content-Type'] = 'application/json';
            var req = {
                method: 'DELETE',
                url: baseUrl + endpoint,
                headers: headers
            };

            return request(req);

        };

        var request = function (req) {
            var d = new $q.defer();

            $http(req).success(function (data, status, headers, config) {
                d.resolve({
                    data: data,
                    status: status,
                    headers: headers,
                    config: config
                });
            }).error(function (data, status, headers, config) {
                //$log.error('Request to endpoint ' + endpoint + ' failed');
                d.reject({
                    data: data,
                    status: status,
                    headers: headers,
                    config: config
                });
            });

            var promise = d.promise;
            return promise;
        };
    }]);
