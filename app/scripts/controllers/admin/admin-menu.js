(function (angular) {
    'use strict';
    angular.module('culturapia')
        .controller('AdminMenuCtrl', ['$rootScope', '$location', function ($rootScope, $location) {

            var self = this;

            if (!$rootScope.admin) {
                $location.path('/admin');
            }

            self.moderation = function(){
                $location.path('/admin-moderation');
            };

            self.lists = function(){
                $location.path('/admin-lists');
            };

            self.manage = function(){
                $location.path('/admin-manage');
            };

            self.types = function(){
                $location.path('/admin-types');
            };

            self.bands = function(){
                $location.path('/admin-bands');
            };

            self.logout = function(){
                $rootScope.admin = null;
                $location.path('/admin');
            }
        }]);
})(angular);