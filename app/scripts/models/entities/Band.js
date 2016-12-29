/**
 * Created by Carlos on 28/07/2016.
 */

(function (angular) {
    'use strict';
    angular.module('culturapia.band').factory('Band', ['bandResource', function (bandResource) {

        Band.prototype.constructor = Band;

        function Band() {

            //identification
            this.bandId = null;

            //info
            this.name = null;
            this.foundation = null;
            this.about = null;

            //lists
            this.members = null;
            this.styles = null;
            this.influences = null;

            //location
            this.city = null;
            this.state = null;

            //contact
            this.email = null;
            this.phone = null;

            //medias
            this.likes = null;
            this.notices = null;
            this.photos = null;
            this.videos = null;
            this.audios = null;
            this.musics = null;
            this.profilePicture = null;

            this._getAll = function (user) {
                var band = this;
                return bandResource.getAll(band, user)
                    .then(function (resolve) {

                        var index;

                        band._set(resolve);

                        band.foundation = new Date(
                            band.foundation.replace(" ", "T") + '.000Z'
                        );

                        for(index in band.notices){
                            band.notices[index].date = new Date(
                                band.notices[index].date.replace(" ", "T") + '.000Z'
                            );
                        }

                        band.musics =[];

                        for(index in band.audios){
                            if(band.audios[index].isDeleted === '0'){
                                var music = {};
                                music.id = index;
                                music.title = band.audios[index].name;
                                music.artist = band.name;
                                music.url = 'http://server.culturapia.com.br/'+band.audios[index].path;
                                band.musics.push(music);
                            }
                        }

                    });
            };

            this._getInfo = function () {
                var band = this;
                return bandResource.getInfo(band)
                    .then(function (resolve) {

                        band._set(resolve);

                        band.foundation = new Date(
                            band.foundation.replace(" ", "T") + '.000Z'
                        );

                        band.musics =[];

                        for(var index in band.audios){
                            if(band.audios[index].isDeleted === '0'){
                                var music = {};
                                music.id = index;
                                music.title = band.audios[index].name;
                                music.artist = band.name;
                                music.url = 'http://server.culturapia.com.br/'+band.audios[index].path;
                                band.musics.push(music);
                            }
                        }

                        for(var index in band.notices){
                            band.notices[index].date = new Date(
                                band.notices[index].date.replace(" ", "T") + '.000Z'
                            );
                        }

                    });
            };

            this._add = function (user) {
                var band = this;
                return bandResource.add(band, user)
                    .then(function (resolve) {
                        band.bandId = resolve.bandId;
                    });
            };

            this._save = function (user) {
                var band = this;
                return bandResource.save(band, user)
                    .then(function () {
                        band._getAll(user);
                    });
            };

            this.addNotice = function (notice, user) {
                var band = this;
                return bandResource.addNotice(band, notice, user)
                    .then(function () {
                        band._getAll(user);
                    });
            };

            this.removeNotice = function (notice, user) {
                var band = this;
                return bandResource.removeNotice(band, notice, user)
                    .then(function () {
                        band._getAll(user);
                    });
            };

            this.addVideo = function (video, user) {
                var band = this;
                return bandResource.addVideo(band, video, user)
                    .then(function () {
                        band._getAll(user);
                    });
            };

            this.removeVideo = function (video, user) {
                var band = this;
                return bandResource.removeVideo(band, video, user)
                    .then(function () {
                        band._getAll(user);
                    });
            };

            this.removePhoto = function (photo, user) {
                var band = this;
                return bandResource.removePhoto(band, photo, user)
                    .then(function () {
                        band._getAll(user);
                    });
            };

            this.removeAudio = function (audio, user) {
                var band = this;
                return bandResource.removeAudio(band, audio, user)
                    .then(function () {
                        band._getAll(user);
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
            }
        }

        Band.loadBandsByUser = function(user){
            return bandResource.getBandsByUser(user);
        };

        return Band;
    }]);
})(angular);

