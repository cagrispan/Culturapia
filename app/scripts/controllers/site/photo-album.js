(function (angular) {
    'use strict';
    angular.module('culturapia')
        .controller('PhotoAlbumCtrl', ['$location', 'band', '$uibModalInstance', 'like', 'ModalService', 'shareData',
            function ($location, band, $uibModalInstance, like, ModalService, shareData) {

                var self = this;

                self.index = 0;
                self.band = band;
                self.length = self.band.photos.length;

                function init(){
                    self.user = shareData.get('user');
                }

                self.right = function(){
                    if(self.index<self.length){
                        self.index++;
                    }
                };

                self.left = function(){
                    if(self.index!=0){
                        self.index--;
                    }
                };

                self.getInfo = function () {
                    self.band._getInfo().then(function () {
                        like.verifyLiked(self.band.photos, self.user.userId);
                    });
                };

                self.likedContent = function (content) {
                    if (self.user) {
                        like.like(content, self.user)
                            .then(function () {
                                self.getInfo();
                            })
                            .then(function () {
                                init();
                            });
                    } else {
                        ModalService.login().result
                            .then(function () {
                                init();
                            });
                    }
                };

                self.cancel = function () {
                    $uibModalInstance.dismiss();
                };

                init();

            }]);
})(angular);