(function (angular) {
    'use strict';
    angular.module('culturapia.user')
        .controller('MyProfileCtrl', ['facebookAPI', '$location', 'webService', '$http', 'shareData', 'ModalService', 'ngToast', 'md5',
            function (facebookAPI, $location, webService, $http, shareData, ModalService, ngToast, md5) {

                var self = this;

                function init() {
                    self.user = shareData.get('user');

                    if (!self.user) {
                        ModalService.login().result.then(function () {
                            self.user = shareData.get('user');
                        });
                    }

                    self.user._load();

                    self.oldPassword = null;
                    self.newPassword = null;
                    self.confirmPassword = null;
                }

                self.save = function () {
                    self.user._save().then(function () {
                        ngToast.success("Salvo com sucesso");
                        $location.path('/');
                        shareData.set(self.user, 'user');
                    }, function (err) {
                        ngToast.danger(err);
                    });
                };

                self.changePassword = function () {
                    if (self.newPassword === self.confirmPassword) {
                        var oldPassword = md5.createHash(self.oldPassword);
                        var newPassword = md5.createHash(self.newPassword);
                        self.user._changePassword(oldPassword, newPassword).then(function () {
                            ngToast.success("Senha alterada com sucesso");
                            self.oldPassword = null;
                            self.newPassword = null;
                            self.confirmPassword = null;
                        }, function (err) {
                            ngToast.danger(err);
                        });
                    } else {
                        ngToast.danger('Confirmação de senha incorreta. Digite novamente.');
                        self.newPassword = null;
                        self.confirmPassword = null;
                    }


                };

                self.getCep = function () {
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
                };

                init();

            }]);
})(angular);