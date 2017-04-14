const context = require.context('../../src', true, /\.spec\.js$/);
context.keys().forEach(context);

describe('abc', () => {
  it('fff', () => {
    expect(1).to.equal(1);
  });
});
