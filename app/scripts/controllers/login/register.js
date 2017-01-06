(function (angular) {
    'use strict';
    angular.module('culturapia')
        .controller('RegisterCtrl', ['$location', '$uibModalInstance', 'User', 'ngToast', 'md5',
            function ($location, $uibModalInstance, User, ngToast, md5) {

                var self = this;

                function init() {
                    self.newUser = new User();
                    self.confirmPassword = null;
                }

                self.save = function () {
                    if (self.newUser.password === self.confirmPassword){
                        self.newUser.password = md5.createHash(self.newUser.password);
                        self.newUser._add().then(function () {
                            $uibModalInstance.close();
                            ngToast.danger("Usuário cadastrado.");
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