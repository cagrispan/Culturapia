'use strict';
angular.module('utils')
    .service('bandTypes', ['webService', function (webService) {

        var self = this;

        self.getBandTypes = function () {
            return webService.get('/band-types', {})
                .then(function (response) {
                    response.data.types.unshift('');
                    return response.data.types;
                });
        };

    }]);