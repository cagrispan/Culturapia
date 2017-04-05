(function (angular) {
    'use strict';
    angular.module('culturapia.band')
        .controller('QuizCtrl', ['shareData', '$location', 'band', '$uibModalInstance', 'Upload', 'ModalService', 'ngToast', 'Question', 'Alternative',
            function (shareData, $location, band, $uibModalInstance, Upload, ModalService, ngToast, Question, Alternative) {

                var self = this;

                function init() {
                    self.user = shareData.get('user');

                    if (!self.user) {
                        ModalService.login().result.then(function () {
                            self.user = shareData.get('user');
                            init();
                        });
                    }

                    self.questionForm = false;

                    self.newQuestion = new Question();
                    self.newAlternative = new Alternative();

                    self.band = band;
                    self.band._getQuestions(self.user);
                }

                self.addQuestion = function () {
                    self.newQuestion.bandId = self.band.bandId;

                    self.newQuestion._add(self.user).then(function () {

                        self.questionForm = !self.questionForm;

                        self.newQuestion = new Question();
                        self.band._getQuestions(self.user);

                        ngToast.success('Pergunta adicionada.');

                    }, function () {
                        ngToast.danger('Falha ao adicionar pergunta. Tente novamente.');
                    })

                };

                self.addAlternative = function (question) {
                    self.newAlternative.questionId = question.questionId;
                    self.newAlternative.bandId = question.bandId;

                    self.newAlternative._add(self.user).then(function () {

                        self.newAlternative = new Alternative();
                        question._getAlternatives(self.user);

                        ngToast.success('Alternativa adicionada.');

                    }, function () {
                        ngToast.danger('Falha ao adicionar alternativa. Tente novamente.');
                    })

                };

                self.activateQuestion = function (question) {
                    var questionCopy = angular.copy(question);
                    questionCopy.isDeleted = 0;
                    questionCopy._save(self.user).then(function () {
                        question.isDeleted = '0';
                    }, function (err) {
                        console.log('Error message: ' + err.message);
                    });
                };

                self.deactivateQuestion = function (question) {
                    var questionCopy = angular.copy(question);
                    questionCopy.isDeleted = 1;
                    questionCopy._save(self.user).then(function () {
                        question.isDeleted = '1';
                    }, function (err) {
                        console.log('Error message: ' + err.message);
                    });
                };

                self.activateAlternative = function (alternative) {
                    var alternativeCopy = angular.copy(alternative);
                    alternativeCopy.isDeleted = 0;
                    alternativeCopy._save(self.user).then(function () {
                        alternative.isDeleted = '0';
                    }, function (err) {
                        console.log('Error message: ' + err.message);
                    });
                };

                self.deactivateAlternative = function (alternative) {
                    var alternativeCopy = angular.copy(alternative);
                    alternativeCopy.isDeleted = 1;
                    alternativeCopy._save(self.user).then(function () {
                        alternative.isDeleted = '1';
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