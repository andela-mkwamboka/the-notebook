describe('Notes factory', () => {
  let Notes;

  // Before each test load our noteApp module
  beforeEach(angular.mock.module('noteApp'));

  // Before each inject Note factory to our local Notes variable
  beforeEach(inject((_notesFactory_) => {
    Notes = _notesFactory_;
  }));

  // Verify the the factory exists
  it('should exist', () => {
    expect(Notes).toBeDefined();
  });
});