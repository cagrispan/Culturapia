angular.module('culturapia')
    .directive('videoCard', function () {
        return {
            restrict:'AE',
            transclude: true,
            templateUrl: 'views/components/video-card.html',
            scope: {
                videoCard: '=currentController',
                video: '=video'
            }
        };
    });
