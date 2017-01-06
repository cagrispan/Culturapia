/**
 * Created by Carlos on 23/07/2016.
 */
angular.module('culturapia')
    .controller('LoginCtrl', ['facebookAPI', 'webService', '$uibModalInstance', 'User', 'shareData', '$rootScope', 'ModalService', 'md5',
        function (facebookAPI, webService, $uibModalInstance, User, shareData, $rootScope, ModalService, md5) {

            var self = this;

            self.login = function () {

                var user = {
                    email: self.email,
                    password: md5.createHash(self.password)
                };

                webService.post('/auth', user, {})
                    .then(
                        function (response) {
                            var user = new User();
                            user._set(response.data);
                            if (user.birthday) {
                                user.birthday = new Date(
                                    user.birthday.replace(" ", "T") + '.000Z'
                                );
                            }
                            shareData.set(user, 'user');
                            $rootScope.user = user;
                            $uibModalInstance.close();
                        },
                        function (err) {
                            console.log(err);
                        });

            };

            self.facebookLogin = function () {
                facebookAPI.login()
                    .then(function () {
                        $uibModalInstance.close();
                    });
            };

            self.register = function () {
                ModalService.register().result.then(function () {
                    ModalService.login()
                });
                $uibModalInstance.dismiss();
            };

            self.cancel = function () {
                $uibModalInstance.dismiss();
            };

        }]);