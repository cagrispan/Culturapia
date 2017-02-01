/**
 * Created by Carlos on 23/07/2016.
 */
angular.module('culturapia')
    .controller('AdminLoginCtrl', ['webService', 'md5', '$location', '$rootScope', 'Admin', 'ngToast',
        function (webService, md5, $location, $rootScope, Admin, ngToast) {

            var self = this;

            self.login = function () {

                var admin = new Admin();

                admin.email = self.email;
                admin.password = md5.createHash(self.password);

                admin._login()
                    .then(function (admin) {
                            $rootScope.admin = admin;
                            $location.path('/admin-moderation')
                        },
                        function (err) {
                            ngToast.danger(err.data.message);
                        });
            };
        }]);