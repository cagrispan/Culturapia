(function (angular) {
    'use strict';
    angular.module('culturapia')
        .controller('RecoverCtrl', ['$location', '$uibModalInstance', 'webService',
            function ($location, $uibModalInstance, webService) {

                var self = this;

                function init() {
                    self.email = null;
                    self.message = null;
                    self.confirmPassword = null;
                }

                self.send = function () {
                    self.message = 'Aguarde...';
                    webService.post('/recover', {email:self.email}, {}).then(function () {
                        self.message = 'Senha alterada. Verifique seu email.'
                    }, function () {
                        self.message = 'Email não cadastrado.'
                    });
                };

                self.cancel = function () {
                    $uibModalInstance.dismiss();
                };

                init();

            }]);
})(angular);