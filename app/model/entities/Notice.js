/**
 * Created by Carlos on 28/07/2016.
 */

(function (angular) {
    'use strict';
    angular.module('culturapia.band').factory('Notice', [function () {

        User.prototype.constructor = Notice;
        
        function  Notice() {

            //identification
            this.id = null;
            this.facebookId = null;
            this.token = null;

            //personal info
            this.name = null;
            this.birthday = null;

            //contact
            this.email = null;
            this.phone = null;

            //location
            this.address = null;

            //products
            this.products = null;

            //purchases
            this.purchases = null;
            this.bids = null;

        }

        return Notice
    }]);
})(angular);

