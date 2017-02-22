'use strict';
angular.module('utils').service('shareData', ['localStorageService', 'User', function(localStorageService, User){
    var self = this;

    self.set = function(object, key){
        localStorageService.set(key, object);
    };

    self.get = function(key){
        var user = new User();
        user._set(localStorageService.get(key));
        console.log(user);
        return user;
    };

}]);
