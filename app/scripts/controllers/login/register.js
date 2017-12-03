(function (angular) {
    'use strict';
    angular.module('culturapia')
        .controller('RegisterCtrl', ['$location', '$uibModalInstance', 'User', 'ngToast', 'md5',
            function ($location, $uibModalInstance, User, ngToast, md5) {

                var self = this;

                function init() {
                    self.newUser = new User();
                    self.password = null;
                    self.confirmPassword = null;
                }

                self.save = function () {
                    if (self.newUser.email !== self.confirmEmail){
                        ngToast.danger("Os emails não coincidem.");
                        return;
                    }
                    if (self.password === self.confirmPassword){
                        self.newUser.password = md5.createHash(self.password);
                        self.newUser._add().then(function () {
                            $uibModalInstance.close();
                            ngToast.success("Usuário cadastrado.");
                        }, function (err) {
                            console.log(err);
                            ngToast.danger(err.data.message);
                        });
                    } else {
                        ngToast.danger("As senhas não coincidem.");
                    }
                };

                self.cancel = function () {
                    $uibModalInstance.dismiss();
                };

                init();

            }]);
})(angular);