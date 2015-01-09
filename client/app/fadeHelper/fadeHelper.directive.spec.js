'use strict';

describe('Directive: fadeHelper', function () {

  // load the directive's module
  beforeEach(module('scottsAppApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<fade-helper></fade-helper>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the fadeHelper directive');
  }));
});