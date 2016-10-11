(function (angular) {
    'use strict';
    angular.module('culturapia.band').service('bandResource', ['webService', '$q', function (webService, $q) {
        var self = this;

        self.add = function (band, user) {
            var headers = {};
            var endpoint = "";
            var objectToSend;
            //Validate and Mapping
            objectToSend = angular.copy(band);

            if (user && user.token) {
                headers.token = user.token;
            } else {
                return $q.reject({errorMessage: 'Access token missing'});
            }

            if (user && user.facebookId) {
                endpoint = '/users/' + user.facebookId + '/bands';
            } else {
                return $q.reject({errorMessage: 'FacebookId missing'});
            }
            //Make the request
            return webService.post(endpoint, objectToSend, headers).then(
                function (resolve) {
                    return resolve.data;
                }
            );
        };

        self.save = function (band, user) {
            var headers = {};
            var endpoint = "";
            var objectToSend;
            //Validate and Mapping
            objectToSend = angular.copy(band);

            if (user && user.token) {
                headers.token = user.token;
            } else {
                return $q.reject({errorMessage: 'Access token missing'});
            }

            if (user && user.facebookId) {
                endpoint = '/users/' + user.facebookId + '/bands/' + band.bandId;
            } else {
                return $q.reject({errorMessage: 'FacebookId missing'});
            }

            delete objectToSend.videos;
            delete objectToSend.audios;
            delete objectToSend.photos;
            delete objectToSend.notices;
            delete objectToSend.musics;
            delete objectToSend.profilePicture;

            //Make the request
            return webService.put(endpoint, objectToSend, headers).then(
                function (resolve) {
                    return resolve.data;
                }
            );
        };

        self.addNotice = function (band, notice, user) {
            var headers = {};
            var endpoint = "";
            var objectToSend;
            //Validate and Mapping
            objectToSend = angular.copy(notice);

            if (user && user.token) {
                headers.token = user.token;
            } else {
                return $q.reject({errorMessage: 'Access token missing'});
            }

            if (user && user.facebookId && band && band.bandId) {
                endpoint = '/users/' + user.facebookId + '/bands/' + band.bandId + '/notices';
            } else {
                return $q.reject({errorMessage: 'FacebookId missing'});
            }

            delete objectToSend.noticeId;

            //Make the request
            return webService.post(endpoint, objectToSend, headers).then(
                function (resolve) {
                    return resolve.data;
                }
            );
        };

        self.removeNotice = function (band, notice, user) {
            var headers = {};
            var endpoint = "";
            var objectToSend;
            //Validate and Mapping
            objectToSend = angular.copy(notice);

            if (user && user.token) {
                headers.token = user.token;
            } else {
                return $q.reject({errorMessage: 'Access token missing'});
            }

            if (user && user.facebookId) {
                endpoint = '/users/' + user.facebookId + '/bands/' + band.bandId + '/notices/' + notice.noticeId;
            } else {
                return $q.reject({errorMessage: 'FacebookId missing'});
            }

            objectToSend.isDeleted = 1;

            //Make the request
            return webService.put(endpoint, objectToSend, headers).then(
                function (resolve) {
                    return resolve.data;
                }
            );
        };

        self.addVideo = function (band, video, user) {
            var headers = {};
            var endpoint = "";
            var objectToSend;
            //Validate and Mapping
            objectToSend = angular.copy(video);

            if (user && user.token) {
                headers.token = user.token;
            } else {
                return $q.reject({errorMessage: 'Access token missing'});
            }

            if (user && user.facebookId && band && band.bandId) {
                endpoint = '/users/' + user.facebookId + '/bands/' + band.bandId + '/videos';
            } else {
                return $q.reject({errorMessage: 'FacebookId missing'});
            }

            delete objectToSend.url;

            //Make the request
            return webService.post(endpoint, objectToSend, headers).then(
                function (resolve) {
                    return resolve.data;
                }
            );
        };

        self.removeVideo = function (band, video, user) {
            var headers = {};
            var endpoint = "";
            var objectToSend;
            //Validate and Mapping
            objectToSend = angular.copy(video);

            if (user && user.token) {
                headers.token = user.token;
            } else {
                return $q.reject({errorMessage: 'Access token missing'});
            }

            if (user && user.facebookId) {
                endpoint = '/users/' + user.facebookId + '/bands/' + band.bandId + '/videos/' + video.videoId;
            } else {
                return $q.reject({errorMessage: 'FacebookId missing'});
            }

            objectToSend.isDeleted = 1;

            //Make the request
            return webService.put(endpoint, objectToSend, headers).then(
                function (resolve) {
                    return resolve.data;
                }
            );
        };

        self.removePhoto = function (band, photo, user) {
            var headers = {};
            var endpoint = "";
            var objectToSend;
            //Validate and Mapping
            objectToSend = angular.copy(photo);

            if (user && user.token) {
                headers.token = user.token;
            } else {
                return $q.reject({errorMessage: 'Access token missing'});
            }

            if (user && user.facebookId) {
                endpoint = '/users/' + user.facebookId + '/bands/' + band.bandId + '/photos/' + photo.photoId;
            } else {
                return $q.reject({errorMessage: 'FacebookId missing'});
            }

            objectToSend.isDeleted = 1;

            //Make the request
            return webService.put(endpoint, objectToSend, headers).then(
                function (resolve) {
                    return resolve.data;
                }
            );
        };

        self.removeAudio = function (band, audio, user) {
            var headers = {};
            var endpoint = "";
            var objectToSend;
            //Validate and Mapping
            objectToSend = angular.copy(audio);

            if (user && user.token) {
                headers.token = user.token;
            } else {
                return $q.reject({errorMessage: 'Access token missing'});
            }

            if (user && user.facebookId) {
                endpoint = '/users/' + user.facebookId + '/bands/' + band.bandId + '/audios/' + audio.audioId;
            } else {
                return $q.reject({errorMessage: 'FacebookId missing'});
            }

            objectToSend.isDeleted = 1;

            //Make the request
            return webService.put(endpoint, objectToSend, headers).then(
                function (resolve) {
                    return resolve.data;
                }
            );
        };

        self.getAll = function (band, user) {
            var headers = {};
            var endpoint = "";
            var objectToSend;
            //Validate and Mapping
            objectToSend = angular.copy(band);

            if (user && user.token) {
                headers.token = user.token;
            } else {
                return $q.reject({errorMessage: 'Access token missing'});
            }

            if (user && user.facebookId) {
                endpoint = '/users/' + user.facebookId + '/bands/' + band.bandId;
            } else {
                return $q.reject({errorMessage: 'FacebookId missing'});
            }
            //Make the request
            return webService.get(endpoint, headers).then(
                function (resolve) {
                    return resolve.data;
                }
            );
        };

        self.getInfo = function (band) {
            var headers = {};
            var endpoint = '/bands/' + band.bandId;

            //Make the request
            return webService.get(endpoint, headers).then(
                function (resolve) {
                    return resolve.data;
                }
            );
        };
    }]);
})
(angular);
