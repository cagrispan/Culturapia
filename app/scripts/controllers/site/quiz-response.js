(function (angular) {
    'use strict';
    angular.module('culturapia.band')
        .controller('QuizResponseCtrl', ['shareData', '$location', 'band', '$uibModalInstance', 'Upload', 'ModalService', 'ngToast', 'quizResponse', 'report',
            function (shareData, $location, band, $uibModalInstance, Upload, ModalService, ngToast, quizResponse, report) {

                var self = this;

                self.selected = {};

                function init() {
                    self.user = shareData.get('user');

                    if (!self.user) {
                        ModalService.login().result.then(function () {
                            self.user = shareData.get('user');
                            init();
                        });
                    }

                    for (var questionIndex in band.questions){
                        var question = band.questions[questionIndex];
                        for(var responseIndex in question.responses){
                            var response = question.responses[responseIndex];
                            if(response.userId === self.user.userId){
                                self.selected[response.questionId] = response.alternativeId;
                            }
                        }
                    }

                    self.band = band;
                }

                self.setUserResponse = function (alternative) {
                    quizResponse.response(alternative, self.user)
                        .then(function () {
                            ngToast.success('Opção salva.');
                        }, function (err) {
                            ngToast.success('Falha ao salvar opção.');
                            console.log(err);
                        })
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