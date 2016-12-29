'use strict';

describe('Controller', function () {

  // load the controllers's module
  beforeEach(module('culturapia'));

  var scope;

  // Initialize the controllers and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
  }));

  xit('should attach a list of awesomeThings to the scope', function () {
    expect(true).toBe(true);
  });
});
