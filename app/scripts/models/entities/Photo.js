/**
 * Created by Carlos on 28/07/2016.
 */

(function (angular) {
    'use strict';
    angular.module('culturapia.photo').factory('Photo', ['photoResource', function (photoResource) {

        Photo.prototype.constructor = Photo;

        function Photo() {

            this.photoId = null;
            this.bandId = null;

            this.path = null;
            this.description = null;

            this.isReported = null;
            this.isDeleted = null;

            this.likes = null;

            this._loadByAdmin = function (admin) {
                var photo = this;
                return photoResource.loadByAdmin(photo, admin)
                    .then(function (response) {
                        photo._set(response.photo);
                    });
            };

            this._save = function (user) {
                var photo = this;
                return photoResource.save(photo, user)
                    .then(function (photoReturned) {
                        photo._set(photoReturned);
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

        Photo.loadListByBand = function(band, user){
            return photoResource.getAllByBand(band, user)
                .then(function (response) {

                    var photoList = [];

                    for(var i in response.photos){
                        var photo = new Photo();
                        photo._set(response.photos[i]);
                        photoList.push(photo)
                    }

                    return photoList;
                });
        };

        return Photo;
    }]);
})(angular);

