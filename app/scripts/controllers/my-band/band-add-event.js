(function (angular) {
    'use strict';
    angular.module('culturapia.band')
        .controller('AddEventCtrl', ['$uibModalInstance', 'band', 'shareData', 'Event', 'ngToast',
            function ($uibModalInstance, band, shareData, Event, ngToast) {

                var self = this;

                function init() {
                    self.user = shareData.get('user');
                    self.band = band;
                    self.newEvent = new Event();
                }

                self.save = function () {
                    self.newEvent.bandId = self.band.bandId;
                    self.newEvent._add(self.user)
                        .then(function () {
                            ngToast.success('Evento adicionado.');
                            $uibModalInstance.close();
                        }, function () {
                            ngToast.danger('Falha ao adicionar evento. Tente novamente.');
                        });
                };

                self.cancel = function () {
                    $uibModalInstance.dismiss();
                };

                init();

                //-------------------------------------------------------- datepicker---------------------------------

                self.today = function () {
                    self.band.foundation = new Date();
                };

                self.clear = function () {
                    self.band.foundation = null;
                };

                self.inlineOptions = {
                    dateDisabled: true,
                    customClass: getDayClass,
                    minDate: new Date(),
                    showWeeks: true
                };

                self.dateOptions = {
                    formatYear: 'yyyy',
                    minDate: new Date(),
                    startingDay: 0
                };

                // Disable weekend selection

                self.toggleMin = function () {
                    self.inlineOptions.minDate = self.inlineOptions.minDate ? self.inlineOptions.minDate : new Date();
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