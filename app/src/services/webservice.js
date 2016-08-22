/**
 * Created by Carlos on 23/07/2016.
 */
angular.module('utils')
    .service('webService', ['$http', '$q', '$log', function ($http, $q, $log) {

        var baseUrl = 'http://localhost:7780';

        this.read = function (endpoint) {

            var req = {
                method: 'GET',
                url: baseUrl + endpoint,
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            return request(req);
        };

        this.add = function (endpoint, params) {

            var req = {
                method: 'POST',
                url: baseUrl + endpoint,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: params
            };

            return request(req);

        };

        this.update = function (endpoint, params) {

            var req = {
                method: 'PUT',
                url: baseUrl + endpoint,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: params
            };

            return request(req);

        };

        this.remove = function (endpoint) {

            var req = {
                method: 'DELETE',
                url: baseUrl + endpoint,
                headers: {
                    'Content-Type': 'application/json'
                }
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
                $log.error('Request to endpoint ' + endpoint + ' failed');
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