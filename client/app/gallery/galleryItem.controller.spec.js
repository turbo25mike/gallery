'use strict';

describe('Controller: GalleryItemCtrl', function () {

  // load the controller's module
  beforeEach(module('scottsAppApp'));

  var GalleryItemCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GalleryItemCtrl = $controller('GalleryItemCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
