(function (angular) {
    'use strict';
    angular.module('culturapia.band')
        .controller('MyBandCtrl', ['facebookAPI', '$location', 'ModalService', function (facebookAPI, $location, ModalService) {

            var self = this;

            self.band = {
                name: 'Nome da Banda',
                members: [
                    'carlos',
                    'fabiano',
                    'guto'
                ],
                influences: [
                    'pink floyd',
                    'ac/dc',
                    'creedence'
                ],
                styles: [
                    'rock',
                    'blues',
                    'jazz'
                ],
                notices: [
                    {
                        image: '../assets/images/1.png',
                        text: 'Mussum ipsum cacilds, vidis litro abertis. Consetis adipiscings elitis. Pra lá , depois divoltis porris, paradis. Paisis, filhis, espiritis santis. Mé faiz elementum girarzis, nisi eros vermeio, in elementis mé pra quem é amistosis quis leo. Manduma pindureta quium dia nois paga. Sapien in monti palavris qui num significa nadis i pareci latim. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis.',
                        time: '30 min'
                    },
                    {
                        image: '../assets/images/1.png',
                        text: 'Mussum ipsum cacilds, vidis litro abertis. Consetis adipiscings elitis. Pra lá , depois divoltis porris, paradis. Paisis, filhis, espiritis santis. Mé faiz elementum girarzis, nisi eros vermeio, in elementis mé pra quem é amistosis quis leo. Manduma pindureta quium dia nois paga. Sapien in monti palavris qui num significa nadis i pareci latim. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis.',
                        time: '30 min'
                    },
                    {
                        image: '../assets/images/1.png',
                        text: 'Mussum ipsum cacilds, vidis litro abertis. Consetis adipiscings elitis. Pra lá , depois divoltis porris, paradis. Paisis, filhis, espiritis santis. Mé faiz elementum girarzis, nisi eros vermeio, in elementis mé pra quem é amistosis quis leo. Manduma pindureta quium dia nois paga. Sapien in monti palavris qui num significa nadis i pareci latim. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis.',
                        time: '30 min'
                    }
                ],
                videos: [
                    {
                        url: 'https://www.youtube.com/embed/i3JchZ2Bvas',
                        name: 'Musica 1'
                    }, {
                        url: 'https://www.youtube.com/embed/i3JchZ2Bvas',
                        name: 'Musica 1'
                    }, {
                        url: 'https://www.youtube.com/embed/i3JchZ2Bvas',
                        name: 'Musica 1'
                    }
                ]
            };

            if (!facebookAPI.user) {
                $location.path('/login');
            }

            self.user = facebookAPI.user;

            self.info = function () {
                ModalService.info(self.band);
            };

            self.songs = function () {
                ModalService.songs(self.band);
            };

            self.videos = function () {
                ModalService.videos(self.band);
            };

            self.photos = function () {
                ModalService.photos(self.band);
            };

            self.config = function () {
                ModalService.config(self.band);
            };

        }]);
})(angular);