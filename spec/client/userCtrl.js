describe('Users factory', () => {
  let Users;

  // Before each test load our noteApp module
  beforeEach(angular.mock.module('noteApp'));

  // Before each  inject Notes factory to local Users variable
  beforeEach(inject((_userFactory_) => {
    Users = _userFactory_;
  }));

  // Verify the the factory exists
  it('should exist', () => {
    expect(Users).toBeDefined();
  });
});