import { Subject } from '@reactivex/rxjs/dist/cjs/Rx';
import { Dispatcher } from './dispatcher';


describe('Dispatcher', () => {
  beforeEach(() => {
    angular.mock.module(($provide) => {
      $provide.service('Dispatcher', Dispatcher);
    });
  });

  it('should be an instance of `Subject`', inject(Dispatcher => {
    expect(Dispatcher instanceof Subject).toBe(true);
  }));
});
