(function (angular) {
    'use strict';
    angular.module('culturapia')
        .controller('AcceptCtrl', ['$location', '$uibModalInstance', 'shareData', 'ngToast', '$http', 'user',
            function ($location, $uibModalInstance, shareData, ngToast, $rootScope, user) {

                var self = this;

                function init() {
                    self.user = user;
                }

                self.save = function () {
                    self.user.accepted = true;
                    self.user._save().then(function () {
                        ngToast.success("Salvo com sucesso");
                        $uibModalInstance.close();
                    }, function (err) {
                        ngToast.danger(err);
                    });
                };

                self.cancel = function () {
                    $uibModalInstance.dismiss();
                };

                init();

            }]);
})(angular);