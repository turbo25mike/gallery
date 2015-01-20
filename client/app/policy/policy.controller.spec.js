'use strict';

describe('Controller: PolicyCtrl', function () {

  // load the controller's module
  beforeEach(module('scottsAppApp'));

  var PolicyCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PolicyCtrl = $controller('PolicyCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
