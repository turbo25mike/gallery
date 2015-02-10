'use strict';

describe('Directive: facebook', function () {

  // load the directive's module
  beforeEach(module('scottsAppApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<facebook></facebook>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the facebook directive');
  }));
});