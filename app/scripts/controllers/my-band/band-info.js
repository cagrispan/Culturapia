(function (angular) {
    'use strict';
    angular.module('culturapia.band')
        .controller('BandInfoCtrl', ['facebookAPI', '$location', 'band', '$uibModalInstance', 'lists', function (facebookAPI, $location, band, $uibModalInstance, lists) {

            if (!facebookAPI.user) {
                $location.path('/login');
            }

            var self = this;

            self.states = lists.states;

            self.setState = function () {
                self.cities = self.state.cities;
            };

            self.user = facebookAPI.user;
            self.band = band;

            for (var index in self.states) {
                if (self.states[index].name === self.band.state) {
                    self.state = self.states[index];
                    self.setState();
                    break;
                }
            }

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
                self.band.state = self.state.name;
                self.band._save(self.user).then(function () {
                    $uibModalInstance.dismiss();
                }, function (err) {
                    console.log(err.message);
                });

            };


            //-------------------------------------------------------- datepicker---------------------------------

            self.today = function () {
                self.band.foundation = new Date();
            };

            self.clear = function () {
                self.band.foundation = null;
            };

            self.inlineOptions = {
                customClass: getDayClass,
                minDate: new Date('01/01/1901'),
                showWeeks: true
            };

            self.dateOptions = {
                formatYear: 'yyyy',
                maxDate: new Date(),
                minDate: new Date(1930, 1, 1),
                startingDay: 0
            };

            // Disable weekend selection

            self.toggleMin = function () {
                self.inlineOptions.minDate = self.inlineOptions.minDate ? null : new Date();
                self.dateOptions.minDate = self.inlineOptions.minDate;
            };

            self.toggleMin();

            self.open = function () {
                self.popup.opened = true;
            };

            self.setDate = function (year, month, day) {
                self.band.foundation = new Date(year, month, day);
            };

            self.format = 'dd/MM/yyyy';

            self.popup = {
                opened: false
            };

            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            var afterTomorrow = new Date();
            afterTomorrow.setDate(tomorrow.getDate() + 1);
            self.events = [
                {
                    date: tomorrow,
                    status: 'full'
                },
                {
                    date: afterTomorrow,
                    status: 'partially'
                }
            ];

            function getDayClass(data) {
                var date = data.date,
                    mode = data.mode;
                if (mode === 'day') {
                    var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                    for (var i = 0; i < self.events.length; i++) {
                        var currentDay = new Date(self.events[i].date).setHours(0, 0, 0, 0);

                        if (dayToCheck === currentDay) {
                            return self.events[i].status;
                        }
                    }
                }

                return '';
            }

        }]);
})(angular);