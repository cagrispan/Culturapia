/**
 * Created by Carlos on 28/07/2016.
 */

(function (angular) {
    'use strict';
    angular.module('culturapia.audio').factory('Audio', ['audioResource', function (audioResource) {

        Audio.prototype.constructor = Audio;

        function Audio() {

            this.audioId = null;
            this.bandId = null;

            this.path = null;
            this.name = null;

            this.isReported = null;
            this.isDeleted = null;

            this._loadByAdmin = function (admin) {
                var audio = this;
                return audioResource.loadByAdmin(audio, admin)
                    .then(function (response) {
                        audio._set(response.audio);
                    });
            };

            this._save = function (user) {
                var audio = this;
                return audioResource.save(audio, user)
                    .then(function (audioReturned) {
                        audio._set(audioReturned);
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

        Audio.loadListByBand = function(band, user){
            return audioResource.getAllByBand(band, user)
                .then(function (response) {

                    var audioList = [];

                    for(var i in response.audios){
                        var audio = new Audio();
                        audio._set(response.audios[i]);
                        audioList.push(audio)
                    }

                    return audioList;
                });
        };

        return Audio;
    }]);
})(angular);

