'use strict';
angular.module('utils')
    .service('pagSeguro', ['webService', 'ngToast', '$q', function (webService, ngToast, $q) {

        var self = this;

        self.getSession = function (user) {

            return webService.post('/users/' + user.userId + '/sessions', {}, { token: user.token })
                .then(function (response) {
                    PagSeguroDirectPayment.setSessionId(response.data.id);
                }, function (err) {
                    console.log(err);
                });

        };

        self.getCreditCards = function () {

            var deferred = $q.defer();

            PagSeguroDirectPayment.getPaymentMethods({
                amount: 30.00,
                success: function (response) {
                    deferred.resolve(response.paymentMethods.CREDIT_CARD.options);
                },
                error: function (err) {
                    deferred.resolve(err);
                },
                complete: function (response) { }
            });

            return deferred.promise;

        };

        self.getBrand = function (creditCard) {

            var deferred = $q.defer();

            PagSeguroDirectPayment.getBrand({
                cardBin: creditCard,
                success: function (response) {
                    deferred.resolve(response.brand);
                },
                error: function (err) {
                    deferred.resolve(err);
                },
                complete: function (response) { }
            });

            return deferred.promise;

        };

        self.getCreditCardImage = function (creditCards, creditCardBrand) {
            return creditCards && creditCardBrand ? creditCards[creditCardBrand.name.toUpperCase()].images.SMALL.path : null;
        };

        self.createCardToken = function (creditCard) {

            var deferred = $q.defer();

            PagSeguroDirectPayment.createCardToken({
                cardNumber: creditCard.cardNumber.toString(),
                brand: creditCard.brand,
                cvv: creditCard.cvv.toString(),
                expirationMonth: creditCard.expirationMonth.toString(),
                expirationYear: creditCard.expirationYear.toString(),
                success: function (response) {
                    deferred.resolve(response.card.token);
                },
                error: function (err) {
                    console.log(err);
                },
                complete: function () { }
            });

            return deferred.promise;

        };

        self.getHash = function () {
            return PagSeguroDirectPayment.getSenderHash();
        }

        self.startPayment = function (user, reference, sender, creditCard, creditCardHolder) {

            return self.createCardToken(creditCard)
                .then(function (token) {

                    sender.phone.areaCode = sender.phone.number.toString().substring(0, 2);
                    sender.phone.number = sender.phone.number.toString().substring(2);
                    sender.address.number = sender.address.number.toString();

                    var param = {
                        "plan": "206AC8C63232D5D664350FB57A85F10C",
                        "reference": reference,
                        "sender": sender,
                        "paymentMethod": {
                            "type": "CREDITCARD",
                            "creditCard": {
                                "token": token,
                                "holder": {
                                    "name": creditCardHolder.name,
                                    "birthDate": creditCardHolder.birthDate,
                                    "documents": sender.documents,
                                    "phone": sender.phone
                                }
                            }
                        }
                    }

                    return webService.post('/users/' + user.userId + '/get-premium', param, { token: user.token })
                        .then(function (response) {
                            console.log(response);
                        }, function (err) {
                            console.log(err);
                        });

                })


        };

        self.cancelPremium = function (user, band) {

            return webService.post('/users/' + user.userId + '/bands/' + band.bandId + '/cancel-premium', {}, { token: user.token })
                .then(function (response) {
                    console.log(response);
                }, function (err) {
                    console.log(err);
                });


        };

    }]);


