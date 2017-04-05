(function (angular) {
    'use strict';
    angular.module('culturapia')
        .controller('SetLocationCtrl', ['$location', '$uibModalInstance', 'shareData', 'ngToast', '$http',
            function ($location, $uibModalInstance, shareData, ngToast, $http) {

                var self = this;

                function init() {
                    self.user = shareData.get('user');
                }

                self.getCep = function () {
                    if(self.user.cep.length === 8){
                        console.log(self.user.cep.length);
                        $http.get('https://viacep.com.br/ws/' + self.user.cep + '/json/', {})
                            .then(function (response) {

                                if (response && response.data) {
                                    self.user.address = response.data.logradouro;
                                    self.user.neighborhood = response.data.bairro;
                                    self.user.city = response.data.localidade;
                                    self.user.state = response.data.uf;
                                } else {
                                    self.user.address = '';
                                    self.user.neighborhood = '';
                                    self.user.city = '';
                                    self.user.state = '';
                                }

                            }, function (err) {
                                console.log(err);
                            });
                    }
                };

                self.save = function () {
                    self.user._save().then(function () {
                        ngToast.success("Salvo com sucesso");
                        $uibModalInstance.dismiss();
                        shareData.set(self.user, 'user');
                    }, function (err) {
                        ngToast.danger(err);
                    });
                };

                self.cancel = function () {
                    $uibModalInstance.dismiss();
                };

                init();

            }]);
})(angular);