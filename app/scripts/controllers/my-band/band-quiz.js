(function (angular) {
    'use strict';
    angular.module('culturapia.band')
        .controller('QuizCtrl', ['shareData', '$location', 'band', '$uibModalInstance', 'Upload', 'ModalService', 'ngToast', 'Question', 'Alternative', 'bandTypes',
            function (shareData, $location, band, $uibModalInstance, Upload, ModalService, ngToast, Question, Alternative, bandTypes) {

                var self = this;

                function init() {
                    self.user = shareData.get('user');

                    if (!self.user) {
                        ModalService.login().result.then(function () {
                            self.user = shareData.get('user');
                            init();
                        });
                    } else {
                        bandTypes.getBandTypes()
                            .then(function (bandTypes) {
                                self.alternativeSize = parseInt(bandTypes[self.band.type].alternativeSize);
                                self.quizSize = parseInt(bandTypes[self.band.type].quizSize);
                            });

                        self.questionForm = false;

                        self.newQuestion = new Question();
                        self.newAlternative = new Alternative();

                        self.band = band;
                        self.band._getQuestions(self.user)
                            .then(isQuizDisable);
                    }
                }

                function isQuizDisable() {
                    var validQuestions = self.band.questions.filter(function (question) {
                        return question.isDeleted === '0';
                    });
                    self.isDisabled = validQuestions.length >= self.quizSize;
                }

                function isAlternativeDisable(question) {
                    var validAlternatives = self.band.question.alternatives.filter(function (question) {
                        return question.isDeleted === '0';
                    });
                    return validAlternatives.length >= self.alternativeSize;
                }

                self.addQuestion = function () {
                    if (self.newQuestion.description) {
                        self.newQuestion.bandId = self.band.bandId;

                        self.newQuestion._add(self.user).then(function () {

                            self.questionForm = !self.questionForm;

                            self.newQuestion = new Question();
                            self.band._getQuestions(self.user)
                                .then(isQuizDisable);

                            ngToast.success('Pergunta adicionada.');

                        }, function () {
                            ngToast.danger('Falha ao adicionar pergunta. Tente novamente.');
                        });
                    } else {
                        ngToast.danger('Adicione um texto para enviar.');

                    }



                };

                self.addAlternative = function (question) {
                    var isDisabled = isAlternativeDisable(question);
                    if (self.newAlternative.description && !isDisabled) {
                        self.newAlternative.questionId = question.questionId;
                        self.newAlternative.bandId = question.bandId;

                        self.newAlternative._add(self.user).then(function () {

                            self.newAlternative = new Alternative();
                            question._getAlternatives(self.user);

                            ngToast.success('Alternativa adicionada.');

                        }, function () {
                            ngToast.danger('Falha ao adicionar alternativa. Tente novamente.');
                        })
                    } else {
                        isDisabled ? ngToast.danger('Adicione um texto para enviar.') : ngToast.danger('Só é possível ter 5 alternativas ativas.');
                    }
                };

                self.activateQuestion = function (question) {
                    var questionCopy = angular.copy(question);
                    questionCopy.isDeleted = 0;
                    questionCopy._save(self.user).then(function () {
                        question.isDeleted = '0';
                        isQuizDisable();
                    }, function (err) {
                        console.log('Error message: ' + err.message);
                    });
                };

                self.deactivateQuestion = function (question) {
                    var questionCopy = angular.copy(question);
                    questionCopy.isDeleted = 1;
                    questionCopy._save(self.user).then(function () {
                        question.isDeleted = '1';
                        isQuizDisable();
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