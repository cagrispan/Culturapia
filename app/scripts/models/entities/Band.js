/**
 * Created by Carlos on 28/07/2016.
 */

(function (angular) {
    'use strict';
    angular.module('culturapia.band').factory('Band', ['bandResource', 'Video', 'Notice', 'Event', 'Photo', 'Audio', 'Question', 'globals',
        function (bandResource, Video, Notice, Event, Photo, Audio, Question, globals) {

        Band.prototype.constructor = Band;

        function Band() {

            //identification
            this.bandId = null;

            //info
            this.name = null;
            this.foundation = null;
            this.about = null;
            this.isDeleted = null;
            this.isReported = null;
            this.type = null;
            this.donationEmail = null;
            this.allowDownload = null;
            this.showContact = null;

            //lists
            this.members = null;
            this.styles = null;
            this.influences = null;
            this.likes = null;
            this.contentLikes = null;
            this.events = null;

            //location
            this.city = null;
            this.state = null;

            //contact
            this.email = null;
            this.phone = null;

            //medias
            this.notices = null;
            this.noticesTotal = null;
            this.photos = null;
            this.videos = null;
            this.audios = null;
            this.musics = null;
            this.profilePicture = null;
            this.questions = null;

            this._getAll = function (user) {
                var band = this;
                return bandResource.getAll(band, user)
                    .then(function (resolve) {
                        band._set(resolve);
                        band.foundation = setDate(band.foundation);
                        band.isDeleted = parseInt(band.isDeleted);
                        band.allowDownload = parseInt(band.allowDownload);
                        band.showContact = parseInt(band.showContact);
                    });
            };

            this._getInfo = function () {
                var band = this;
                return bandResource.getInfo(band)
                    .then(function (resolve) {
                        band._set(resolve);
                        band.foundation = setDate(band.foundation);
                        band.isDeleted = parseInt(band.isDeleted);
                        band.allowDownload = parseInt(band.allowDownload);
                        band.showContact = parseInt(band.showContact);
                        setEventList(band);
                        setMusicList(band);
                        setNoticeList(band);
                    });
            };

            this._add = function (user) {
                var band = this;
                return bandResource.add(band, user)
                    .then(function (resolve) {
                        band.bandId = resolve.bandId;
                        band.isDeleted = parseInt(band.isDeleted);
                    });
            };

            this._save = function (user) {
                var band = this;
                return bandResource.save(band, user)
                    .then(function () {
                        band._getAll(user);
                    });
            };

            this._getVideos = function (user) {
                var band = this;
                return Video.loadListByBand(band, user)
                    .then(function (videoList) {
                        band.videos = videoList;
                    });
            };

            this._getNotices = function (user) {
                var band = this;
                return Notice.loadListByBand(band, user)
                    .then(function (noticeList) {
                        band.notices = band.notices ? band.notices.concat(noticeList) : noticeList;
                        setNoticeList(band);
                    });
            };

            this._getEvents = function (user) {
                var band = this;
                return Event.loadListByBand(band, user)
                    .then(function (eventList) {
                        band.events = eventList;
                    });
            };

            this._getPhotos = function (user) {
                var band = this;
                return Photo.loadListByBand(band, user)
                    .then(function (photoList) {
                        band.photos = photoList;
                    });
            };

            this._getAudios = function (user) {
                var band = this;
                return Audio.loadListByBand(band, user)
                    .then(function (audioList) {
                        band.audios = audioList;
                        setMusicList(band);
                    });
            };

            this._getQuestions = function (user) {
                var band = this;
                return Question.loadListByBand(band, user)
                    .then(function (questionList) {
                        band.questions = questionList;
                    });
            };

            this._set = function (data) {
                for (var ix in this) {
                    if (data && this.hasOwnProperty(ix)) {
                        if (data[ix] !== undefined) {
                            this[ix] = data[ix];
                        }
                    }
                }
                return this;
            };

            var setDate = function (date) {
                if (date) {
                    return new Date(date.replace(" ", "T") + '.000Z');
                }
                return null;
            };

            var setMusicList = function (band) {

                var index;

                band.musics = [];

                for (index in band.audios) {
                    if (band.audios[index].isDeleted === '0') {
                        var music = {};
                        music.id = band.audios[index].audioId;
                        music.title = band.audios[index].name;
                        music.artist = band.name;
                        music.url = globals.baseUrl + '/' + band.audios[index].path;
                        band.musics.push(music);
                    }
                }
            };

            var setEventList = function (band) {

                var index;

                for (index in band.events) {
                    band.events[index].start = setDate(band.events[index].start);
                }
            };

            var setNoticeList = function (band) {
                var index;
                for(index in band.notices){
                    band.notices[index].date = band.notices[index].date instanceof Date ? band.notices[index].date : setDate(band.notices[index].date);
                }
            };
        }

        Band.loadBandsByUser = function (user) {
            return bandResource.getBandsByUser(user);
        };

        return Band;
    }]);
})(angular);

