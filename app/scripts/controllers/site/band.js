(function (angular) {
    'use strict';
    angular.module('culturapia.band')
        .controller('BandCtrl', ['Band', '$routeParams', 'like', 'shareData', 'ModalService', 'facebookAPI',
            function (Band, $routeParams, like, shareData, ModalService, facebookAPI) {

                var self = this;

                function init() {
                    self.user = shareData.get('user');

                    self.band = new Band();
                    self.band.bandId = $routeParams.bandId;

                    self.getInfo();
                }

                self.photoAlbum = function () {
                    ModalService.photoAlbum(self.band).result
                        .finally(function () {
                            init();
                        });
                };

                self.feed = function(){
                    facebookAPI.feed()
                };

                self.getInfo = function () {
                    self.band._getInfo().then(function () {
                        like.verifyLiked(self.band.notices, self.user.userId);
                        like.verifyLiked(self.band.videos, self.user.userId);
                    });
                };

                self.likedContent = function (content) {
                    if (self.user) {
                        like.like(content, self.user)
                            .then(function () {
                                self.getInfo();
                            });
                    } else {
                        ModalService.login()
                            .then(function () {
                                init();
                            });
                    }
                };

                init();

            }]);
})(angular);