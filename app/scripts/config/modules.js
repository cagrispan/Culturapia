/**
 * Created by Carlos on 01/08/2016.
 */
(function (angular) {
    'use strict';
    angular.module('utils',['culturapia.user']);
    angular.module('culturapia.band', ['utils']);
    angular.module('culturapia.user', ['utils', 'culturapia.band']);
    angular.module('culturapia.admin', ['utils']);
    angular.module('culturapia.video', ['utils']);
    angular.module('culturapia.notice', ['utils']);
    angular.module('culturapia.event', ['utils']);
    angular.module('culturapia.photo', ['utils']);
    angular.module('culturapia.audio', ['utils']);
    angular.module('culturapia.question', ['utils']);
    angular.module('culturapia.alternative', ['utils']);
})(angular);

