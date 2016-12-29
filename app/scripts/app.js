(function (angular) {
    'use strict';
    // Declare app level module which depends on views, and components
    angular.module('culturapia', [
        'angularSoundManager',
        'ui.utils.masks',
        'ui.bootstrap',
        'ngRoute',
        'ngFileUpload',
        'ngFacebook',
        'ngToast',
        'utils',
        'culturapia.user',
        'culturapia.band'
    ]);
})(angular);
