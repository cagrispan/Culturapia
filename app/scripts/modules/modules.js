/**
 * Created by Carlos on 01/08/2016.
 */
(function (angular) {
    'use strict';
    angular.module('utils',[]);
    angular.module('culturapia.band', ['utils']);
    angular.module('culturapia.user', ['utils', 'culturapia.band']);
})(angular);

