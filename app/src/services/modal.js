/**
 * Created by Carlos on 15/08/2016.
 */
angular.module('utils').factory('ModalService', ['$uibModal', function ($uibModal) {


    function info(band) {
        return $uibModal.open({
            animation: true,
            backdrop: 'static',
            templateUrl: '../src/views/modals/band-info.html',
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

    function videos(band) {
        return $uibModal.open({
            animation: true,
            backdrop: 'static',
            templateUrl: '../src/views/modals/band-videos.html',
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
            templateUrl: '../src/views/modals/template.html',
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

    function songs(band) {
        return $uibModal.open({
            animation: true,
            backdrop: 'static',
            templateUrl: '../src/views/modals/template.html',
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
            templateUrl: '../src/views/modals/template.html',
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
        config: config
    };

}]);