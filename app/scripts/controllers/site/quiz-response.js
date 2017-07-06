(function (angular) {
    'use strict';
    angular.module('culturapia.band')
        .controller('QuizResponseCtrl', ['shareData', '$location', 'band', '$uibModalInstance', 'Upload', 'ModalService', 'ngToast', 'quizResponse', 'report', 'bandTypes',
            function (shareData, $location, band, $uibModalInstance, Upload, ModalService, ngToast, quizResponse, report, bandTypes) {

                var self = this;

                self.selected = {};

                function init() {
                    self.user = shareData.get('user');

                    for (var questionIndex in band.questions){
                        var question = band.questions[questionIndex];
                        for(var responseIndex in question.responses){
                            var response = question.responses[responseIndex];
                            if(self.user && response.userId === self.user.userId){
                                self.selected[response.questionId] = response.alternativeId;
                            }
                        }
                    }

                    self.band = band;

                    bandTypes.getBandTypes()
                        .then(function (bandTypes) {
                            self.quizSize = parseInt(bandTypes[self.band.type].quizSize);
                        });
                }

                self.setUserResponse = function (alternative, event) {
                    if (!self.user) {
                        event.preventDefault();
                        ModalService.login().result.then(function () {
                            self.user = shareData.get('user');
                            quizResponse.response(alternative, self.user)
                                .then(function () {
                                    self.band._getQuestions(self.user);
                                    ngToast.success('Opção salva.');
                                }, function (err) {
                                    ngToast.danger('Falha ao salvar opção.');
                                    console.log(err);
                                });
                        }, function () {
                            self.selected[alternative.questionId] = null;
                            ngToast.danger('Falha ao salvar opção. Faça login para responder ao quiz.');
                        });
                    } else {
                        quizResponse.response(alternative, self.user)
                            .then(function () {
                                ngToast.success('Opção salva.');
                            }, function (err) {
                                ngToast.danger('Falha ao salvar opção.');
                                console.log(err);
                            });
                    }
                };

                self.reportedContent = function (question) {
                    if (self.user) {
                        report.report(question, self.user)
                            .catch(function (err) {
                                console.log(err);
                            });
                    } else {
                        ModalService.login().result
                            .then(function () {
                                init();
                            });
                    }
                };

                self.cancel = function () {
                    $uibModalInstance.dismiss();
                };

                init();
            }]);
})(angular);