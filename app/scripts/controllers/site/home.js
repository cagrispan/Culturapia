(function (angular) {
    'use strict';
    angular.module('culturapia')
        .controller('HomeCtrl', ['location', function (location) {

            var self = this;

            self.location = location.location;

            self.state = self.location[17];
            self.cities = self.state.cities;
            self.city = self.state.cities[93];


            self.setState = function () {
                self.cities = self.state.cities;
            };

            self.styles = [
                'Sertanejo',
                'Samba',
                'Rock'
            ];

            self.style = self.styles[0];

            self.videos = [
                {
                    videoId: 'i3JchZ2Bvas',
                    name: 'Back in Black',
                    band: 'AC/DC',
                    id: 1
                }, {
                    videoId: 'i3JchZ2Bvas',
                    name: 'video name',
                    band: 'AC/DC',
                    id: 2
                }, {
                    videoId: 'i3JchZ2Bvas',
                    band: 'AC/DC',
                    name: 'video name',
                    id: 3
                }, {
                    videoId: 'i3JchZ2Bvas',
                    name: 'video name',
                    band: 'AC/DC',
                    id: 4
                }, {
                    videoId: 'i3JchZ2Bvas',
                    name: 'video name',
                    band: 'AC/DC',
                    id: 5
                }, {
                    videoId: 'i3JchZ2Bvas',
                    name: 'video name',
                    band: 'AC/DC',
                    id: 6
                }
            ];

        }]);
})(angular);