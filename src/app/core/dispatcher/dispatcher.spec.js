import { Subject } from 'rx';
import { Dispatcher } from './dispatcher';


describe('Dispatcher', () => {
  beforeEach(() => {
    angular.mock.module(($provide) => {
      $provide.service('Dispatcher', Dispatcher);
    });
  });

  it('should be an instance of Rx.Subject', inject(Dispatcher => {
    expect(Dispatcher instanceof Subject).toBe(true);
  }));
});
