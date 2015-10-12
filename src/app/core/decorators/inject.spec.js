import { Inject } from './inject';


describe('Decorator: Inject', () => {
  it('should set static property `$inject` with array of provided dependencies', () => {
    @Inject('Bar', 'Baz')
    class Foo {}

    expect(Foo.$inject).toEqual(['Bar', 'Baz']);
  });
});
