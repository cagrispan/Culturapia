/**
 * Created by Carlos on 28/07/2016.
 */

(function (angular) {
    'use strict';
    angular.module('culturapia.video').factory('Video', ['videoResource', function (videoResource) {

        Video.prototype.constructor = Video;

        function Video() {

            this.videoId = null;
            this.bandId = null;

            this.band = null;

            this.title = null;
            this.description = null;
            this.style = null;

            this.city = null;
            this.state = null;

            this.isReported = null;
            this.isDeleted = null;

            this.likes = null;
            
            this._add = function (user) {
                var video = this;
                return videoResource.add(video, user)
                    .then(function (videoId) {
                        video.videoId = videoId;
                    });
            };

            this._loadByAdmin = function (admin) {
                var video = this;
                return videoResource.loadByAdmin(video, admin)
                    .then(function (response) {
                        video._set(response.video);
                    });
            };

            this._save = function (user) {
                var video = this;
                return videoResource.save(user)
                    .then(function (videoReturned) {
                        video._set(videoReturned);
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

        Video.loadList = function(){
            return videoResource.getAll()
                .then(function (response) {

                    var videoList = [];

                    for(var i in response.videos){
                        var video = new Video();
                        video._set(response.videos[i]);
                        videoList.push(video)
                    }

                    return videoList;
                });
        };

        Video.loadListByBand = function(band, user){
            return videoResource.getAllByBand(band, user)
                .then(function (response) {

                    var videoList = [];

                    for(var i in response.videos){
                        var video = new Video();
                        video._set(response.videos[i]);
                        videoList.push(video)
                    }

                    return videoList;
                });
        };

        return Video;
    }]);
})(angular);

