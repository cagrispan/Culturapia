/**
 * Created by Carlos on 28/07/2016.
 */
(function (angular) {
    'use strict';

    angular.module('culturapia').factory('Address', [function () {

        Address.prototype.constructor = Address;

        function Address() {

            this.addressLine = null;
            this.city = null;
            this.state = null;
            this.zip = null;

        }

        return Address;
    }]);

})(angular);