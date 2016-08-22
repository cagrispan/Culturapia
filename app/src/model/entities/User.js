/**
 * Created by Carlos on 28/07/2016.
 */

(function (angular) {
    'use strict';
    angular.module('culturapia').factory('User', [function () {

        User.prototype.constructor = User;
        
        function  User() {

            //identification
            this.id = null;
            this.facebookId = null;
            this.token = null;

            //personal info
            this.name = null;
            this.birthday = null;

            //contact
            this.email = null;
        }

        return User;
    }]);
})(angular);

