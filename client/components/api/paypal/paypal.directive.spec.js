'use strict';

describe('Directive: paypal', function () {

  // load the directive's module
  beforeEach(module('scottsAppApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<paypal></paypal>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the paypal directive');
  }));
});