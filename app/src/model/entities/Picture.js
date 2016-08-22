/**
 * Created by Carlos on 28/07/2016.
 */

(function (angular) {
    'use strict';
    angular.module('culturapia.band').factory('Picture', [function () {

        User.prototype.constructor = Picture;
        
        function  Picture() {

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

        return Picture;
    }]);
})(angular);

