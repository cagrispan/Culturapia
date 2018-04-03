(function (angular) {
    'use strict';
    angular.module('culturapia.band')
        .controller('SignCtrl', ['shareData', 'band', '$uibModalInstance', 'ModalService', 'pagSeguro', '$http',
            function (shareData, band, $uibModalInstance, ModalService, pagSeguro, $http) {

                var self = this;
                var reference = null;

                function init() {
                    self.user = shareData.get('user');

                    if (!self.user) {
                        ModalService.login().result
                            .then(function () {
                                self.user = shareData.get('user');
                                init();
                            });
                    } else {
                        self.band = band;
                        self.disabled = true;
                        pagSeguro.getSession(self.user)
                            .then(function () {
                                self.disabled = false;
                                return pagSeguro.getCreditCards();
                            })
                            .then(function (creditCards) {
                                self.creditCards = creditCards;
                            });;
                        reference = 'band_' + self.band.bandId;

                        self.cpf = null;

                        self.sender = {
                            name: null,
                            email: null,
                            hash: pagSeguro.getHash(),
                            phone: {
                                areaCode: null,
                                number: null
                            },
                            address: {
                                street: null,
                                number: null,
                                complement: '',
                                district: null,
                                city: null,
                                state: null,
                                country: 'BRA',
                                postalCode: null
                            },
                            documents: [
                                {
                                    type: 'CPF',
                                    value: null
                                }
                            ]
                        };

                        self.creditCard = {
                            cadNaumber: null,
                            cvv: null,
                            expirationMonth: null,
                            expirationYear: null
                        };

                        self.creditCardHolder = {
                            name: null,
                            birthDate: null
                        };
                    }
                }


                self.getBrand = function () {
                    if (self.creditCard.cardNumber.toString().length >= 6 && !self.creditCardImage) {
                        pagSeguro.getBrand(self.creditCard.cardNumber)
                            .then(function (brand) {
                                self.creditCardImage = pagSeguro.getCreditCardImage(self.creditCards, brand);
                            })
                    } else if (self.creditCard.cardNumber.toString().length < 6) {
                        self.creditCardImage = null;
                        self.creditCardLength = null;
                    }
                };

                self.getCep = function () {
                    if (self.sender.address.postalCode && self.sender.address.postalCode.length === 8) {
                        $http.get('https://viacep.com.br/ws/' + self.sender.address.postalCode + '/json/', {})
                            .then(function (response) {

                                if (response && response.data) {
                                    self.sender.address.street = response.data.logradouro;
                                    self.sender.address.district = response.data.bairro;
                                    self.sender.address.city = response.data.localidade;
                                    self.sender.address.state = response.data.uf;
                                } else {
                                    self.sender.address.street = '';
                                    self.sender.address.district = '';
                                    self.sender.address.city = '';
                                    self.sender.address.state = '';
                                }

                            }, function (err) {
                                console.log(err);
                            });
                    }
                };



                self.save = function () {

                    self.sender.documents[0].value = self.cpf;

                    pagSeguro.startPayment(self.user, reference, self.sender, self.creditCard, self.creditCardHolder)
                        .then(function () {
                            self.band.paid = 1;
                            self.band._save(self.user);
                        }, function (err) {
                            console.log('Error message: ' + err.message);
                        });

                };

                self.cancel = function () {
                    $uibModalInstance.dismiss();
                };


                init();

            }]);
})(angular);
