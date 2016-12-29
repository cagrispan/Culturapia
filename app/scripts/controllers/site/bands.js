(function (angular) {
    'use strict';
    angular.module('culturapia')
        .controller('BandsCtrl', ['Band', '$routeParams', 'lists', '$location',
            function (Band, $routeParams, lists, $location) {

                var self = this;

                self.band = new Band();

                self.search = {};
                self.initial = '';


                lists.getBands().then(function(response){
                    self.bands = response.data;
                    self.filteredBands = self.bands;
                });



                self.alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

                self.states = lists.getStates();

                self.search = {};

                self.default = {
                    value: '',
                    state: '--Todos os Estados--',
                    city: '--Todas as Cidades--',
                    style: '--Todos os Estilos--'
                };

                self.setState = function () {
                    if (self.state) {
                        self.cities = self.states[self.state].cities;
                        self.search.state = self.states[self.state].name;
                    } else {
                        self.cities = {};
                        self.search.state = '';
                    }

                };

                self.filter = function (letter) {
                    self.filteredBands = [];
                    self.bands.forEach(function (item) {
                        //console.log("current item is", item, item.charAt(0));
                        if (item.name.charAt(0) == letter) {
                            self.filteredBands.push(item);
                        }
                    });
                };

                self.filterNumbers = function () {
                    self.filteredBands = [];
                    self.bands.forEach(function (item) {
                        //console.log("current item is", item, item.charAt(0));
                        if (item.name.charAt(0).match(/[0-9]/)) {
                            self.filteredBands.push(item);
                        }
                    });
                };

                self.filterAll = function () {
                    self.filteredBands = self.bands;
                };

                self.goBand = function (band) {
                    $location.path('/bands/'+band.bandId);
                };


            }]);
})(angular);