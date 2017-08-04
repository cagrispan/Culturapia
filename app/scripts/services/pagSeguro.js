'use strict';
angular.module('utils')
    .service('pagSeguro', ['webService', 'ngToast', '$q', function (webService, ngToast, $q) {

        var self = this;

        self.getSession = function (user) {

            return webService.post('/users/' + user.userId + '/sessions', {}, { token: user.token })
                .then(function (response) {
                    PagSeguroDirectPayment.setSessionId(response.data);
                }, function (err) {
                    console.log(err);
                });

        };

        self.startPayment = function () {

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

        self.getCreditCardImage = function (creditCardBrand) {

            return 'https://stc.pagseguro.uol.com.br/' + creditCardBrand.images.SMALL.path;

        };

        self.createCardToken = function (creditCard) {

            var token = null;

            PagSeguroDirectPayment.createCardToken({
                cardNumber: creditCard.cardNumber,
                brand: creditCard.brand,
                cvv: creditCard.cvv,
                expirationMonth: creditCard.expirationMonth,
                expirationYear: creditCard.expirationYear,
                success: function (response) {
                    token = response.card.token
                },
                error: function () { },
                complete: function () { }
            });

            return token;

        };

        self.getHash = function () {
            return PagSeguroDirectPayment.getSenderHash();
        }

        self.getPremium = function (user, band, form, token) {

            var param = {
                "plan": "824943678989DD8884A2EFA5E7E9F442",
                "reference": band.bandId,
                "sender": {
                    "name": form.name,
                    "email": form.email,
                    "hash": PagSeguroDirectPayment.getSenderHash(),
                },
                "paymentMethod": {
                    "type": "CREDITCARD",
                    "creditCard": {
                        "token": token,
                        "holder": {
                            "name": form.creditCardName,
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
        };

    }]);


