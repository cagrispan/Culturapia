(function (angular) {
    'use strict';
    angular.module('culturapia')
        .controller('CarouselCtrl', function () {

            var self = this;

            self.myInterval = 5000;
            self.noWrapSlides = false;
            self.active = 0;

            var slides = self.slides = [];
            var currIndex = 0;

            self.addSlide = function () {
                var newWidth = 1000 + slides.length + 1;
                slides.push({
                    image: 'http://lorempixel.com/' + newWidth + '/400',
                    text: ['Nice image', 'Awesome photograph', 'That is so cool', 'I love that'][slides.length % 4],
                    id: currIndex++
                });
            };

            self.randomize = function () {
                var indexes = generateIndexesArray();
                assignNewIndexesToSlides(indexes);
            };

            for (var i = 0; i < 4; i++) {
                self.addSlide();
            }
        });
})(angular);