(function (angular) {
    'use strict';
    angular.module('culturapia.band')
        .controller('BandStatsCtrl', ['shareData', '$location', 'band', '$uibModalInstance', 'Upload', 'ModalService',
            function (shareData, $location, band, $uibModalInstance, Upload, ModalService) {

                var self = this;

                function init() {
                    self.user = shareData.get('user');

                    if (!self.user) {
                        ModalService.login().result.then(function () {
                            self.user = shareData.get('user');
                            init();
                        });
                    }

                    self.band = band;

                    self.videoLikes = videoLikes(self.band);
                    self.photoLikes = photoLikes(self.band);
                    self.noticeLikes = noticeLikes(self.band);
                    self.cityLikes = cityLikes(self.band);

                }

                function videoLikes(band) {
                    var count = 0;
                    for(var index in band.likes){
                        if (band.likes[index].videoId != 0){
                            count++;
                        }
                    }
                    return count;
                }

                function photoLikes(band) {
                    var count = 0;
                    for(var index in band.likes){
                        if (band.likes[index].photoId != 0){
                            count++;
                        }
                    }
                    return count;
                }

                function noticeLikes(band) {
                    var count = 0;
                    for(var index in band.likes){
                        if (band.likes[index].noticeId != 0){
                            count++;
                        }
                    }
                    return count;
                }

                function cityLikes (band){
                    var cities = {};

                    if(band.likes){
                        band.likes.map(function (a) {
                            if (a.city in cities) {
                                cities[a.city].count++;
                                if (a.neighborhood in cities[a.city].neighborhoods) {
                                    cities[a.city].neighborhoods[a.neighborhood]++;
                                } else {
                                    cities[a.city].neighborhoods[a.neighborhood] = 1;
                                }
                            } else {
                                cities[a.city] = {
                                    count: 1,
                                    neighborhoods: {}
                                };
                                if (a.neighborhood in cities[a.city].neighborhoods) {
                                    cities[a.city].neighborhoods[a.neighborhood]++;
                                } else {
                                    cities[a.city].neighborhoods[a.neighborhood] = 1;
                                }
                            }
                        });
                    }

                    return cities;
                }


                self.cancel = function () {
                    $uibModalInstance.dismiss();
                };

                self.save = function () {
                    $uibModalInstance.dismiss();
                };

                init();

            }]);
})(angular);