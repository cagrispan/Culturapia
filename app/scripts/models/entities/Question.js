/**
 * Created by Carlos on 28/07/2016.
 */

(function (angular) {
    'use strict';
    angular.module('culturapia.question').factory('Question', ['questionResource', 'Alternative', function (questionResource, Alternative) {

        Question.prototype.constructor = Question;

        function Question() {

            this.questionId = null;
            this.bandId = null;

            this.description = null;

            this.isReported = null;
            this.isDeleted = null;

            this.likes = null;
            this.alternatives = null;
            this.responses = null;

            this._add = function (user) {
                var question = this;
                return questionResource.add(question, user)
                    .then(function (questionId) {
                        question.questionId = questionId;
                    });
            };

            this._getAlternatives = function (user) {
                var question = this;
                return Alternative.loadListByQuestion(question, user)
                    .then(function (alternativeList) {
                        question.alternatives = alternativeList;
                    });
            };

            this._loadByAdmin = function (admin) {
                var question = this;
                return questionResource.loadByAdmin(question, admin)
                    .then(function (response) {
                        question._set(response.question);
                    });
            };

            this._save = function (user) {
                var question = this;
                return questionResource.save(question, user)
                    .then(function (questionReturned) {
                        question._set(questionReturned);
                    });
            };

            this._remove = function (user) {
                var question = this;
                return questionResource.remove(question, user);
            };

            this._set = function (data) {
                for (var ix in this) {
                    if (data && this.hasOwnProperty(ix)) {
                        if (data[ix] !== undefined) {
                            this[ix] = data[ix];
                        }
                    }
                }
                return this;
            }
        }

        Question.loadListByBand = function(band, user){
            return questionResource.getAllByBand(band, user)
                .then(function (response) {

                    var questionList = [];

                    for(var i in response.questions){
                        var question = new Question();
                        question._set(response.questions[i]);
                        question._getAlternatives(user);
                        questionList.push(question)
                    }

                    return questionList;
                });
        };

        return Question;
    }]);
})(angular);

