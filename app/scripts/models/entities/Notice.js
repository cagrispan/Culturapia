/**
 * Created by Carlos on 28/07/2016.
 */

(function (angular) {
    'use strict';
    angular.module('culturapia.notice').factory('Notice', ['noticeResource', function (noticeResource) {

        Notice.prototype.constructor = Notice;

        function Notice() {

            this.noticeId = null;
            this.bandId = null;

            this.notice = null;
            this.date = null;

            this.isReported = null;
            this.isDeleted = null;

            this.likes = null;
            
            this._add = function (user) {
                var notice = this;
                return noticeResource.add(notice, user)
                    .then(function (noticeId) {
                        notice.noticeId = noticeId;
                    });
            };

            this._loadByAdmin = function (admin) {
                var notice = this;
                return noticeResource.loadByAdmin(notice, admin)
                    .then(function (response) {
                        notice._set(response.notice);
                    });
            };

            this._save = function (user) {
                var notice = this;
                return noticeResource.save(notice, user)
                    .then(function (noticeReturned) {
                        notice._set(noticeReturned);
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

        Notice.loadListByBand = function(band, user){
            return noticeResource.getAllByBand(band, user)
                .then(function (response) {

                    var noticeList = [];

                    for(var i in response.notices){
                        var notice = new Notice();
                        notice._set(response.notices[i]);
                        noticeList.push(notice)
                    }

                    return noticeList;
                });
        };

        return Notice;
    }]);
})(angular);

