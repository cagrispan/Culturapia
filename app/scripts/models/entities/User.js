/**
 * Created by Carlos on 28/07/2016.
 */

(function (angular) {
    'use strict';
    angular.module('culturapia.user').factory('User', ['webService',function (webService) {

        User.prototype.constructor = User;
        
        function  User() {

            //identification
            this.facebookId = null;
            this.facebookToken = null;

            //personal info
            this.name = null;

            //contact
            this.email = null;

            this._get = function(){
                return webService.read('/users').then(function(response){
                    return response.data;
                });
            };

            this._add = function(){
                return webService.add('/users', this).then(function(response){
                    return response.data;
                });
            };
        }

        return User;
    }]);
})(angular);

