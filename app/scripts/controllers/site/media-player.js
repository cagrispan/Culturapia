(function (angular) {
    'use strict';
    angular.module('culturapia')
        .controller('MediaPlayerCtrl', ['$uibModalInstance', function ($uibModalInstance) {
            var self = this;

            self.cancel = function () {
                $uibModalInstance.dismiss();
            };
        }]);
})(angular);