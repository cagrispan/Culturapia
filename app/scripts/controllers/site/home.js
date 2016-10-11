(function (angular) {
    'use strict';
    angular.module('culturapia')
        .controller('HomeCtrl', ['lists', 'ModalService', function (lists, ModalService) {

            var self = this;

            self.states = lists.states;

            self.search = {};

            self.search.isDeleted = "0";

            self.default = {
                value: '',
                state: '--Todos os Estados--',
                city: '--Todas as Cidades--',
                style: '--Todos os Estilos--'
            };

            self.setState = function () {
                if(self.state){
                    self.cities = self.states[self.state].cities;
                    self.search.state = self.states[self.state].name;
                }else{
                    self.cities = {};
                    self.search.state = '';
                }

            };

            self.styles = [
                'Sertanejo',
                'Samba',
                'Rock'
            ];

            lists.getVideos().then(function (resolve) {
                self.videos = resolve.data;
            });

            self.openVideo = function (video) {
                ModalService.video(video);
            }

        }]);
})(angular);