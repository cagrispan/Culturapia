/**
 * Created by Carlos on 28/07/2016.
 */

(function (angular) {
    'use strict';
    angular.module('culturapia.user').factory('User', ['userResource', 'Band', function (userResource, Band) {

        User.prototype.constructor = User;

        function User() {

            //identification
            this.facebookId = null;
            this.facebookToken = null;

            //personal info
            this.name = null;
            this.email = null;

            this.bands = null;

            //auth
            this.token = null;

            //Method
            //If not exist, create a new user
            this._login = function () {
                var user = this;
                return userResource.login(user).then(function (resolve) {
                    if (resolve.token) {
                        user.token = resolve.token;
                    }
                });
            };

            this._load = function () {
                var user = this;
                return userResource.load(user)
                    .then(function (userReturned) {
                        user._set(userReturned);
                    });
            };

            this._update = function () {
                var user = this;
                return userResource.save(user)
                    .then(function (userReturned) {
                        user._set(userReturned);
                    });
            };

            this._getBands = function () {
                var user = this;
                return userResource.loadBands(user).then(function (response) {
                    if (response) {
                        user.bands = [];
                        for(var index in response){
                            var band = new Band();
                            band._set(response[index]);
                            user.bands.push(band);
                        }
                    }
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

        return User;
    }]);
})(angular);

