(function (angular) {
    'use strict';
    angular.module('culturapia')
        .controller('HomeCtrl', [function () {

            var self = this;

            self.videos = [
                {
                    name: 'http://img.youtube.com/vi/i3JchZ2Bvas/mqdefault.jpg',
                    id: 1
                }, {
                    name: 'http://img.youtube.com/vi/i3JchZ2Bvas/mqdefault.jpg',
                    id: 2
                }, {
                    name: 'http://img.youtube.com/vi/i3JchZ2Bvas/mqdefault.jpg',
                    id: 3
                }, {
                    name: 'http://img.youtube.com/vi/i3JchZ2Bvas/mqdefault.jpg',
                    id: 4
                }, {
                    name: 'http://img.youtube.com/vi/i3JchZ2Bvas/mqdefault.jpg',
                    id: 5
                }, {
                    name: 'http://img.youtube.com/vi/i3JchZ2Bvas/mqdefault.jpg',
                    id: 6
                }
            ];



        }]);
})(angular);