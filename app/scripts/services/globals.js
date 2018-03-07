'use strict';
angular.module('utils')
    .service('globals', [function () {

        var self = this;

        /**
         * Production
         * */
        // self.baseUrl = 'http://server.culturapia.com.br';
        // self.frontEndUrl = 'http://www.culturapia.com.br';

        /**
         * Homolog
         * */
        self.baseUrl = 'http://hserver.culturapia.com.br';
        self.frontEndUrl = 'http://homolog.culturapia.com.br';

        /**
         * Development
         * */
        // self.baseUrl = 'http://dserver.culturapia.com.br';
        // self.frontEndUrl = 'http://local.culturapia.com.br:9000';

    }]);
