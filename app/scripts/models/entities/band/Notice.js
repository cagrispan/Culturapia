/**
 * Created by Carlos on 28/07/2016.
 */

(function (angular) {
    'use strict';
    angular.module('culturapia.band').factory('Notice', [function () {

        Notice.prototype.constructor = Notice;
        
        function  Notice() {

            this.noticeId = null;
            this.notice = null;
            this.date = null;
            this.isDeleted = null;

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

        return Notice;
    }]);
})(angular);

