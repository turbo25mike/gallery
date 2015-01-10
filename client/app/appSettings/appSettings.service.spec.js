'use strict';

describe('Service: appSettings', function () {

  // load the service's module
  beforeEach(module('scottsAppApp'));

  // instantiate service
  var appSettings;
  beforeEach(inject(function (_config_) {
    appSettings = _config_;
  }));

  it('should do something', function () {
    expect(!!appSettings).toBe(true);
  });

});
