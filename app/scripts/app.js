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
        'angular-md5',
        'ui.calendar',
        'LocalStorageModule',
        'mwl.confirm',
        'utils',
        'culturapia.user',
        'culturapia.band',
        'culturapia.admin',
        'culturapia.video',
        'culturapia.notice',
        'culturapia.event',
        'culturapia.photo',
        'culturapia.audio'
    ]);
})(angular);
