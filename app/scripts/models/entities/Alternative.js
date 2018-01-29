/**
 * Created by Carlos on 28/07/2016.
 */

(function (angular) {
    'use strict';
    angular.module('culturapia.alternative').factory('Alternative', ['alternativeResource', function (alternativeResource) {

        Alternative.prototype.constructor = Alternative;

        function Alternative() {

            this.alternativeId = null;
            this.questionId = null;
            this.bandId = null;

            this.description = null;

            this.isDeleted = null;

            this.likes = null;

            this._add = function (user) {
                var alternative = this;
                return alternativeResource.add(alternative, user)
                    .then(function (alternativeId) {
                        alternative.alternativeId = alternativeId;
                    });
            };

            this._save = function (user) {
                var alternative = this;
                return alternativeResource.save(alternative, user)
                    .then(function (alternativeReturned) {
                        alternative._set(alternativeReturned);
                    });
            };

            this._remove = function (user) {
                var alternative = this;
                return alternativeResource.remove(alternative, user)
                    .then(function () {});
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

        Alternative.loadListByQuestion = function(question, user){
            return alternativeResource.getAllByQuestion(question, user)
                .then(function (response) {

                    var alternativeList = [];

                    for(var i in response.alternatives){
                        var alternative = new Alternative();
                        alternative._set(response.alternatives[i]);
                        alternativeList.push(alternative)
                    }

                    return alternativeList;
                });
        };

        return Alternative;
    }]);
})(angular);

