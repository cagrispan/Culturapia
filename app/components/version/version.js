'use strict';

angular.module('culturapia.version', [
  'culturapia.version.interpolate-filter',
  'culturapia.version.version-directive'
])

.value('version', '0.1');
