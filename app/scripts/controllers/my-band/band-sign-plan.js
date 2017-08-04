(function (angular) {
    'use strict';
    angular.module('culturapia.band')
        .controller('SignCtrl', ['shareData', 'band', '$uibModalInstance', 'ModalService', 'pagSeguro',
            function (shareData, band, $uibModalInstance, ModalService, pagSeguro) {

                var self = this;

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
                                return pagSeguro.getCreditCards()
                            })
                            .then(function (creditCards) {
                                self.creditCards = creditCards;
                            });;
                        var reference = 'band_' + self.band.bandId;
                    }
                }

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
                }

                self.creditCard = {};

                self.creditCardHolder = {
                    name: null,
                    birthDate: null
                }

                self.getBrand = function () {
                    console.log(self.creditCard.cardNumber)
                    console.log(self.creditCard.cardNumber.length)
                    if(self.creditCard.cardNumber.toString().length >= 6){
                        pagSeguro.getBrand(self.creditCard.cardNumber)
                            .then(function(brand){
                                console.log(brand);
                            })
                    }
                }




                self.save = function () {
                    pagSeguro.getCreditCards().then(function (response) {
                        console.log(response);
                    });
                    // pagSeguro.startPayment(reference, self.sender, self.creditCard, self.creditCardHolder);

                    // self.band._save(self.user).then(function () {
                    //     $uibModalInstance.close();
                    // }, function (err) {
                    //     console.log('Error message: ' + err.message);
                    // });

                };

                self.cancel = function () {
                    $uibModalInstance.dismiss();
                };


                init();

            }]);
})(angular);