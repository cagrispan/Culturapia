(function (angular) {
    'use strict';
    // Declare app level module which depends on views, and components
    angular.module('culturapia', [
        'angularSoundManager',
        'ui.bootstrap',
        'ngRoute',
        'ngFileUpload',
        'utils',
        'culturapia.user',
        'culturapia.band'
    ]);
})(angular);
