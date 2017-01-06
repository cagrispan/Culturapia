/**
 * Created by Carlos on 15/08/2016.
 */
'use strict';
angular.module('utils').factory('ModalService', ['$uibModal', function ($uibModal) {


    function info(band) {
        return $uibModal.open({
            animation: true,
            backdrop: true,
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
            backdrop: true,
            templateUrl: '../views/modals/band-info.html',
            controller: 'AddBandCtrl',
            controllerAs: 'bandCtrl',
            size: 'lg'
        });
    }

    function videos(band) {
        return $uibModal.open({
            animation: true,
            backdrop: true,
            templateUrl: '../views/modals/band-videos.html',
            controller: 'BandVideoCtrl',
            controllerAs: 'videoCtrl',
            size: 'md',
            resolve: {
                band: function () {
                    return band;
                }
            }
        });
    }

    function video(videoObject) {
        return $uibModal.open({
            animation: true,
            backdrop: true,
            templateUrl: '../views/modals/video.html',
            controller: 'VideoCtrl',
            controllerAs: 'videoCtrl',
            size: 'lg',
            resolve: {
                videoObject: function () {
                    return videoObject;
                }
            }
        });
    }

    function photos(band) {
        return $uibModal.open({
            animation: true,
            backdrop: true,
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

    function profilePicture(band) {
        return $uibModal.open({
            animation: true,
            backdrop: true,
            templateUrl: '../views/modals/band-profile-pic.html',
            controller: 'ProfilePicCtrl',
            controllerAs: 'photoCtrl',
            size: 'md',
            resolve: {
                band: function () {
                    return band;
                }
            }
        });
    }

    function audios(band) {
        return $uibModal.open({
            animation: true,
            backdrop: true,
            templateUrl: '../views/modals/band-audios.html',
            controller: 'BandAudioCtrl',
            controllerAs: 'audioCtrl',
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
            backdrop: true,
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

    function login() {
        return $uibModal.open({
            animation: true,
            backdrop: true,
            templateUrl: '../views/modals/login.html',
            controller: 'LoginCtrl',
            controllerAs: 'loginCtrl',
            size: 'sm'
        });
    }

    function photoAlbum(band) {
        return $uibModal.open({
            animation: true,
            backdrop: true,
            templateUrl: '../views/modals/photo-album.html',
            controller: 'PhotoAlbumCtrl',
            controllerAs: 'photoAlbumCtrl',
            size: 'md',
            resolve: {
                band: function () {
                    return band;
                }
            }
        });
    }

    function stats(band) {
        return $uibModal.open({
            animation: true,
            backdrop: true,
            templateUrl: '../views/modals/band-stats.html',
            controller: 'BandStatsCtrl',
            controllerAs: 'bandStatsCtrl',
            size: 'lg',
            resolve: {
                band: function () {
                    return band;
                }
            }
        });
    }

    function register() {
        return $uibModal.open({
            animation: true,
            backdrop: true,
            templateUrl: '../views/modals/register.html',
            controller: 'RegisterCtrl',
            controllerAs: 'registerCtrl',
            size: 'md'
        });
    }

    return {
        info: info,
        videos: videos,
        audios: audios,
        photos: photos,
        config: config,
        addBand: addBand,
        video: video,
        profilePicture: profilePicture,
        login: login,
        photoAlbum: photoAlbum,
        stats: stats,
        register: register
    };

}]);