/**
 * Created by Carlos on 28/07/2016.
 */

(function (angular) {
    'use strict';
    angular.module('culturapia.admin').factory('Admin', ['adminResource', function (adminResource) {

        Admin.prototype.constructor = Admin;

        function Admin() {

            this.adminId = null;
            this.name = null;
            this.email = null;
            this.password = null;
            this.token = null;

            this._login = function () {
                var admin = this;
                return adminResource.login(admin)
                    .then(function (adminReturned) {
                        admin._set(adminReturned);
                        admin.password = null;
                        return admin;
                    });
            };
            
            this._add = function (admin) {
                var adminToAdd = this;
                return adminResource.add(adminToAdd, admin)
                    .then(function (adminId) {
                        adminToAdd.adminId = adminId;
                    });
            };

            this._remove = function (admin) {
                var adminToRemove = this;
                return adminResource.remove(adminToRemove, admin);
            };

            this._set = function (data) {
                for (var ix in this) {
                    if (data && this.hasOwnProperty(ix)) {
                        if (data[ix] !== undefined) {
                            this[ix] = data[ix];
                        }
                    }
                }
                return this;
            }
        }

        Admin.loadList = function(admin){
            return adminResource.getAll(admin)
                .then(function (response) {

                    var adminList = [];

                    for(var i in response.admins){
                        var admin = new Admin();
                        admin._set(response.admins[i]);
                        adminList.push(admin)
                    }

                    return adminList;
                });
        };

        return Admin;
    }]);
})(angular);

