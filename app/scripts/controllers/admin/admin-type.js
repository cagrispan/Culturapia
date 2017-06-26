(function (angular) {
    'use strict';
    angular.module('culturapia')
        .controller('AdminTypesCtrl', ['$rootScope', '$location', 'webService', 'ngToast',
            function ($rootScope, $location, webService, ngToast) {

                var self = this;

                if (!$rootScope.admin) {
                    $location.path('/admin');
                } else {
                    getTypes();
                }

                function getTypes() {
                    webService.get('/admins/' + $rootScope.admin.adminId + '/types', { token: $rootScope.admin.token })
                        .then(function (response) {
                            var types = response.data.types;
                            Object.keys(types).forEach(function (type) {
                                types[type].video = parseInt(types[type].video);
                                types[type].photo = parseInt(types[type].photo);
                                types[type].audio = parseInt(types[type].audio);
                                types[type].quiz = !!parseInt(types[type].quiz);
                                types[type].calendar = !!parseInt(types[type].calendar);
                            });
                            self.types = types;
                        });
                };

                self.save = function () {
                    var types = angular.copy(self.types);
                    Object.keys(types).forEach(function (type) {
                        types[type].quiz = types[type].quiz ? 1 : 0;
                        types[type].calendar = types[type].calendar ? 1 : 0;
                    });
                    webService.put('/admins/' + $rootScope.admin.adminId + '/types', types, { token: $rootScope.admin.token })
                        .then(function () {
                            ngToast.success('Salvo com sucesso.');
                            Object.keys(types).forEach(function (type) {
                                types[type].quiz = !!types[type].quiz;
                                types[type].calendar = !!types[type].calendar;
                            });
                            self.types = types;
                        }, function (err) {
                            ngToast.danger('Falha ao salvar.');
                            console.log(err);
                        })
                };

            }]);
})(angular);