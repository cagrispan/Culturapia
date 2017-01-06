/**
 * Created by Carlos on 28/07/2016.
 */

(function (angular) {
    'use strict';
    angular.module('culturapia.user').factory('User', ['userResource', 'Band', function (userResource, Band) {

        User.prototype.constructor = User;

        function User() {

            //identification
            this.userId = null;

            //facebook
            this.facebookId = null;
            this.facebookToken = null;

            //personal info
            this.name = null;
            this.email = null;
            this.phone = null;
            this.birthday = null;

            //location
            this.cep = null;
            this.address = null;
            this.number = null;
            this.complement = null;
            this.city = null;
            this.state = null;
            this.neighborhood = null;

            //lists
            this.bands = null;

            //auth
            this.token = null;

            //Methods
            this._login = function () {
                var user = this;
                return userResource.login(user)
                    .then(function (userReturned) {
                        user._set(userReturned);
                        if (user.birthday) {
                            user.birthday = new Date(
                                user.birthday.replace(" ", "T") + '.000Z'
                            );
                        }
                    });
            };

            this._load = function () {
                var user = this;
                return userResource.load(user)
                    .then(function (userReturned) {
                        user._set(userReturned);
                        if (user.birthday) {
                            user.birthday = new Date(
                                user.birthday.replace(" ", "T") + '.000Z'
                            );
                        }
                    });
            };

            this._save = function () {
                var user = this;
                return userResource.save(user)
                    .then(function (userReturned) {
                        user._set(userReturned);
                    });
            };

            this._add = function () {
                var user = this;
                return userResource.add(user);
            };

            this._getBands = function () {
                var user = this;
                return Band.loadBandsByUser(user).then(function (response) {
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

