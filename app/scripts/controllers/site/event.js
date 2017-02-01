(function (angular) {
    'use strict';
    angular.module('culturapia.band')
        .controller('EventCtrl', ['event', '$uibModalInstance',
            function (event, $uibModalInstance) {

                var self = this;

                function init() {
                    self.event = event;
                    if(self.event.start) self.event.start = new Date(self.event.start);
                    if(self.event.end) self.event.end = new Date(self.event.end);
                }

                self.cancel = function () {
                    $uibModalInstance.dismiss();
                };

                init();
            }]);
})(angular);