(function (angular) {
    'use strict';
    angular.module('culturapia')
        .controller('TestCtrl', ['webService', 'User', 'facebookAPI', '$location', function (webService, User, facebookAPI, $location) {

            var self = this;

            if (!facebookAPI.user) {
                $location.path('/login');
            }else{
                self.user = new User();

                self.user.name = facebookAPI.user.name;
                self.user.facebookId = facebookAPI.user.id;
                self.user.facebookToken = facebookAPI.user.facebookToken;
                self.user.email = facebookAPI.user.email;
                self.user.firstName = facebookAPI.user.first_name;
                self.user.lastName = facebookAPI.user.last_name;

                self.user._add().then(function (response) {
                    console.log(response.data);
                });
            }








        }]);
})(angular);