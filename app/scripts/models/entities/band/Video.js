/**
 * Created by Carlos on 28/07/2016.
 */

(function (angular) {
    'use strict';
    angular.module('culturapia.band').factory('Video', [function () {

        Video.prototype.constructor = Video;
        
        function  Video() {

            this.videoId = null;
            this.title = null;
            this.band = null;
            this.city = null;
            this.state = null;
            this.style = null;
            this.isDeleted = null;

        }

        return Video;
    }]);
})(angular);

