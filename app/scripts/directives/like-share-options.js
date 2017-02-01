'use strict';
angular.module('culturapia')
    .directive('likeShareOptions', function () {
        return {
            restrict:'AE',
            templateUrl: 'views/components/like-share-options.html',
            scope: {
                currentCtrl: '=currentCtrl',
                content: '=content'
            }
        };
    });
