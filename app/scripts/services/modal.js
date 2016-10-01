/**
 * Created by Carlos on 15/08/2016.
 */
'use strict';
angular.module('utils').factory('ModalService', ['$uibModal', function ($uibModal) {


    function info(band) {
        return $uibModal.open({
            animation: true,
            backdrop: 'static',
            templateUrl: '../views/modals/band-info.html',
            controller: 'BandInfoCtrl',
            controllerAs: 'bandCtrl',
            size: 'lg',
            resolve: {
                band: function () {
                    return band;
                }
            }
        });
    }

    function addBand() {
        return $uibModal.open({
            animation: true,
            backdrop: 'static',
            templateUrl: '../views/modals/band-info.html',
            controller: 'AddBandCtrl',
            controllerAs: 'bandCtrl',
            size: 'lg'
        });
    }

    function videos(band) {
        return $uibModal.open({
            animation: true,
            backdrop: 'static',
            templateUrl: '../views/modals/band-videos.html',
            controller: 'BandVideoCtrl',
            controllerAs: 'videoCtrl',
            size: 'lg',
            resolve: {
                band: function () {
                    return band;
                }
            }
        });
    }

    function photos(band) {
        return $uibModal.open({
            animation: true,
            backdrop: 'static',
            templateUrl: '../views/modals/band-photos.html',
            controller: 'BandPhotoCtrl',
            controllerAs: 'photoCtrl',
            size: 'md',
            resolve: {
                band: function () {
                    return band;
                }
            }
        });
    }

    function songs(band) {
        return $uibModal.open({
            animation: true,
            backdrop: 'static',
            templateUrl: '../views/modals/template.html',
            controller: 'BandInfoCtrl',
            controllerAs: 'bandCtrl',
            size: 'lg',
            resolve: {
                band: function () {
                    return band;
                }
            }
        });
    }

    function config(band) {
        return $uibModal.open({
            animation: true,
            backdrop: 'static',
            templateUrl: '../views/modals/template.html',
            controller: 'BandInfoCtrl',
            controllerAs: 'bandCtrl',
            size: 'lg',
            resolve: {
                band: function () {
                    return band;
                }
            }
        });
    }

    return {
        info: info,
        videos: videos,
        songs: songs,
        photos: photos,
        config: config,
        addBand: addBand
    };

}]);