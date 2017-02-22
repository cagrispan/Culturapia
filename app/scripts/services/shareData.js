'use strict';
angular.module('utils').service('shareData', ['localStorageService', 'User', function(localStorageService, User){
    var self = this;

    self.set = function(object, key){
        localStorageService.set(key, object);
    };

    self.get = function(key){

        var userJSON = localStorageService.get(key);

        if(userJSON){
            var user = new User();
            user._set(userJSON);
            return user;
        }

        return;

    };

}]);
