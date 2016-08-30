/**
 * Created by Carlos on 15/08/2016.
 */
angular.module('culturapia')
    .controller('HeaderCtrl', ['$scope', '$location', 'facebookAPI', function ($scope, $location, facebookAPI) {

        var self = this;

        self.logout = function(){
            facebookAPI.logout();
        };

        self.navCollapsed = true;

    }]);