'use strict';
angular.module('utils')
    .service('pagSeguro', ['webService', 'ngToast', '$window', function (webService, ngToast, $window) {

        var self = this;

        self.getSession = function (user) {

            webService.post('/users/' + user.userId + '/sessions', {}, { token: user.token })
                .then(function (response) {
                    PagSeguroDirectPayment.setSessionId(response.data);
                }, function (err) {
                    console.log(err);
                });

        };

        self.getCreditCards = function () {

            var creditCardList = null;

            PagSeguroDirectPayment.getPaymentMethods({
                amount: 30.00,
                success: function (response) {
                    creditCardList = response.paymentMethods.CREDIT_CARD.options;
                },
                error: function (response) { },
                complete: function (response) { }
            });

            return creditCardList;

        };

        self.getBrand = function (creditCard) {

            var creditCardBrand = null;

            PagSeguroDirectPayment.getBrand({
                cardBin: creditCard,
                success: function (response) {
                    creditCardBrand = response.brand;
                },
                error: function (response) { },
                complete: function (response) { }
            });

            return creditCardBrand;

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


