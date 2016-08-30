/**
 * Created by Carlos on 15/08/2016.
 */
'use strict';
angular.module('culturapia').filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);