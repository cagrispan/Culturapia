(function (angular) {
    'use strict';
    angular.module('culturapia')
        .controller('VideoCtrl', ['$location', 'video', '$uibModalInstance',
            function ($location, video, $uibModalInstance) {

                var self = this;

                self.video = video;

                self.band = function(){
                    $location.path('/bands/'+self.video.bandId);
                    $uibModalInstance.dismiss();
                };

                self.ok = function () {
                    $uibModalInstance.dismiss();
                };

                self.cancel = function () {
                    $uibModalInstance.dismiss();
                };

            }]);
})(angular);