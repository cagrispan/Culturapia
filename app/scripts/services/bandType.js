'use strict';
angular.module('utils')
    .service('bandTypes', ['webService', function (webService) {

        var self = this;

        self.getBandTypes = function () {
            return webService.get('/band-types', {})
                .then(function (response) {
                    return response.data.types;
                });
        };

    }]);