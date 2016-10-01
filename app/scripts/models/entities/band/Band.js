/**
 * Created by Carlos on 28/07/2016.
 */

(function (angular) {
    'use strict';
    angular.module('culturapia.band').factory('Band', ['bandResource', 'Notice', function (bandResource, Notice) {

        Band.prototype.constructor = Band;

        function Band() {

            //identification
            this.bandId = null;
            this.name = null;
            this.foundation = null;
            this.about = null;
            this.members = null;
            this.styles = null;
            this.influences = null;
            this.city = null;
            this.state = null;
            this.email = null;
            this.phone = null;
            this.notices = null;
            this.photos = null;
            this.videos = null;
            this.audios = null;

            this._getAll = function (user) {
                var band = this;
                return bandResource.getAll(band, user)
                    .then(function (resolve) {

                        band._set(resolve);

                        band.foundation = new Date(
                            band.foundation.replace(" ", "T") + '.000Z'
                        );

                        for (var index in band.notices) {
                            var notice = new Notice();
                            band.notices[index] = notice._set(band.notices[index]);

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

        return Band;
    }]);
})(angular);

