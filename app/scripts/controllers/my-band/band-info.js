(function (angular) {
    'use strict';
    angular.module('culturapia.band')
        .controller('BandInfoCtrl', ['facebookAPI', '$location', 'band', '$uibModalInstance', function (facebookAPI, $location, band, $uibModalInstance) {

            if (!facebookAPI.user) {
                $location.path('/login');
            }

            var self = this;

            self.user = facebookAPI.user;
            self.band = band;

            // STYLE

            self.styleInput = false;

            self.addStyle = function (style) {
                if (style && self.band.styles.indexOf(style) === -1) {
                    self.band.styles.push(style);
                }
                self.styleInput = !self.styleInput;
                self.newStyle = '';
            };

            self.removeStyle = function (style) {
                self.band.styles.splice(self.band.styles.indexOf(style), 1);
            };

            // MEMBER

            self.memberInput = false;

            self.addMember = function (member) {
                if (member && self.band.members.indexOf(member) === -1) {
                    self.band.members.push(member);
                }
                self.memberInput = !self.memberInput;
                self.newMember = '';
            };

            self.removeMember = function (member) {
                self.band.members.splice(self.band.members.indexOf(member), 1);
            };

            // INFLUENCES

            self.influenceInput = false;

            self.addInfluence = function (influence) {
                if (influence && self.band.influences.indexOf(influence) === -1) {
                    self.band.influences.push(influence);
                }
                self.influenceInput = !self.influenceInput;
                self.newInflence = '';
            };

            self.removeInfluence = function (influence) {
                self.band.influences.splice(self.band.influences.indexOf(influence), 1);
            };


            self.cancel = function () {
                $uibModalInstance.dismiss();
            };

            self.save = function () {
                $uibModalInstance.dismiss();
            };

        }]);
})(angular);