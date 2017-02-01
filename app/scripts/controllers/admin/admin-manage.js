(function (angular) {
    'use strict';
    angular.module('culturapia')
        .controller('AdminManageCtrl', ['$rootScope', '$location', 'lists', 'webService', 'ModalService', 'md5', 'Admin', 'ngToast',
            function ($rootScope, $location, lists, webService, ModalService, md5, Admin, ngToast) {

                var self = this;

                if (!$rootScope.admin) {
                    $location.path('/admin');
                } else {
                    self.newAdmin = new Admin();
                    self.passwordConfirm = null;
                    self.newAdminForm = false;
                    getAdmins($rootScope.admin);
                }

                function getAdmins(admin) {
                    Admin.loadList(admin).then(function (adminList) {
                        self.admins = adminList;
                    });
                }

                self.addAdmin = function () {
                    if (self.newAdmin.password === self.passwordConfirm) {
                        self.newAdmin.password = md5.createHash(self.newAdmin.password);
                        self.newAdmin._add($rootScope.admin)
                            .then(function () {
                                self.newAdmin = new Admin();
                                self.passwordConfirm = null;
                                ngToast.success('Administrador adicionado.');
                                getAdmins($rootScope.admin);
                            }, function (err) {
                                ngToast.danger(err.data.message);
                            });
                    }
                };

                self.removeAdmin = function (admin) {
                    admin._remove($rootScope.admin)
                        .then(function () {
                            ngToast.success('Administrador excluído.');
                            getAdmins($rootScope.admin);
                        }, function (err) {
                            ngToast.danger(err.data.message);
                        });
                };

            }]);
})(angular);