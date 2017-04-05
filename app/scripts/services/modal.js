/**
 * Created by Carlos on 15/08/2016.
 */
'use strict';
angular.module('utils').factory('ModalService', ['$uibModal', function ($uibModal) {


    function info(band) {
        return $uibModal.open({
            animation: true,
            backdrop: true,
            templateUrl: 'views/modals/band-info.html',
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
            templateUrl: 'views/modals/band-info.html',
            controller: 'AddBandCtrl',
            controllerAs: 'bandCtrl',
            size: 'lg'
        });
    }

    function videos(band) {
        return $uibModal.open({
            animation: true,
            backdrop: true,
            templateUrl: 'views/modals/band-videos.html',
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

    function event(event) {
        return $uibModal.open({
            animation: true,
            backdrop: true,
            templateUrl: 'views/modals/event.html',
            controller: 'EventCtrl',
            controllerAs: 'eventCtrl',
            size: 'md',
            resolve: {
                event: function () {
                    return event;
                }
            }
        });
    }

    function addEvent(band) {
        return $uibModal.open({
            animation: true,
            backdrop: true,
            templateUrl: 'views/modals/addEvent.html',
            controller: 'AddEventCtrl',
            controllerAs: 'addEventCtrl',
            size: 'md',
            resolve: {
                band: function () {
                    return band;
                }
            }
        });
    }

    function editEvent(event, band) {
        return $uibModal.open({
            animation: true,
            backdrop: true,
            templateUrl: 'views/modals/editEvent.html',
            controller: 'EditEventCtrl',
            controllerAs: 'editEventCtrl',
            size: 'md',
            resolve: {
                band: function () {
                    return band;
                },
                event: function () {
                    return event;
                }
            }
        });
    }

    function video(videoObject) {
        return $uibModal.open({
            animation: true,
            backdrop: true,
            templateUrl: 'views/modals/video.html',
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
            templateUrl: 'views/modals/band-photos.html',
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
            templateUrl: 'views/modals/band-profile-pic.html',
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
            templateUrl: 'views/modals/band-audios.html',
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
            templateUrl: 'views/modals/template.html',
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
            templateUrl: 'views/modals/login.html',
            controller: 'LoginCtrl',
            controllerAs: 'loginCtrl',
            size: 'sm'
        });
    }

    function photoAlbum(band) {
        return $uibModal.open({
            animation: true,
            backdrop: true,
            templateUrl: 'views/modals/photo-album.html',
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
            templateUrl: 'views/modals/band-stats.html',
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
            backdrop: false,
            templateUrl: 'views/modals/register.html',
            controller: 'RegisterCtrl',
            controllerAs: 'registerCtrl',
            size: 'md'
        });
    }

    function recover() {
        return $uibModal.open({
            animation: true,
            backdrop: true,
            templateUrl: 'views/modals/recover.html',
            controller: 'RecoverCtrl',
            controllerAs: 'recoverCtrl',
            size: 'md'
        });
    }

    function reportContent(reportContent) {
        return $uibModal.open({
            animation: true,
            backdrop: true,
            templateUrl: 'views/modals/report.html',
            controller: 'ReportContentCtrl',
            controllerAs: 'reportContentCtrl',
            size: 'md',
            resolve: {
                reportContent: function () {
                    return reportContent;
                }
            }
        });
    }

    function mediaPlayer() {
        return $uibModal.open({
            animation: true,
            backdrop: true,
            templateUrl: 'views/modals/media-player.html',
            controller: 'MediaPlayerCtrl',
            controllerAs: 'mediaPlayerCtrl',
            size: 'md'
        });
    }

    function bandDetails(band) {
        return $uibModal.open({
            animation: true,
            backdrop: true,
            templateUrl: 'views/modals/band-details.html',
            controller: 'BandDetailCtrl',
            controllerAs: 'bandCtrl',
            size: 'lg',
            resolve: {
                band: function () {
                    return band;
                }
            }
        });
    }

    function quiz(band) {
        return $uibModal.open({
            animation: true,
            backdrop: true,
            templateUrl: 'views/modals/quiz.html',
            controller: 'QuizCtrl',
            controllerAs: 'quizCtrl',
            size: 'lg',
            resolve: {
                band: function () {
                    return band;
                }
            }
        });
    }

    function quizResponse(band) {
        return $uibModal.open({
            animation: true,
            backdrop: true,
            templateUrl: 'views/modals/quiz-response.html',
            controller: 'QuizResponseCtrl',
            controllerAs: 'quizResponseCtrl',
            size: 'lg',
            resolve: {
                band: function () {
                    return band;
                }
            }
        });
    }

    function setLocation(user) {
        return $uibModal.open({
            animation: true,
            backdrop: true,
            templateUrl: 'views/modals/set-location.html',
            controller: 'SetLocationCtrl',
            controllerAs: 'setLocationCtrl',
            size: 'lg',
            resolve: {
                user: function () {
                    return user;
                }
            }
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
        register: register,
        event: event,
        addEvent: addEvent,
        editEvent: editEvent,
        reportContent: reportContent,
        recover: recover,
        mediaPlayer: mediaPlayer,
        bandDetails: bandDetails,
        setLocation: setLocation,
        quiz: quiz,
        quizResponse: quizResponse
    };

}]);