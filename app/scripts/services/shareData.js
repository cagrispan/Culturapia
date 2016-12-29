'use strict';
angular.module('utils').service('shareData', function(){
    var self = this;
    self.list = {};

    self.set = function(object, key){
        var keyToSet = key;
        if(!keyToSet){
            keyToSet = self.list.length;
        }

        self.list[keyToSet] = object;
    };

    self.get = function(key){
        return self.list[key] ? self.list[key] : null;
    };

});
