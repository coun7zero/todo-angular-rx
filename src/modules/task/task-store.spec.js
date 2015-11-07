import { Dispatcher } from 'modules/dispatcher';

import {
  CREATE_TASK,
  DELETE_TASK,
  UPDATE_TASK
} from './constants';

import { TaskStore } from './task-store';


describe('TaskStore', () => {
  let api;
  let dispatcher;
  let scope;
  let store;


  beforeEach(() => {
    dispatcher = new Dispatcher();

    inject(($q, $rootScope) => {
      scope = $rootScope;

      api = {
        fetch: sinon.stub().returns($q.resolve([]))
      };

      store = new TaskStore(api, dispatcher);
    });
  });


  describe('Initialization', () => {
    it('should get tasks from server', () => {
      scope.$digest();

      expect(api.fetch.callCount).toBe(1);
      expect(api.fetch.calledWith('/tasks')).toBe(true);
    });

    it('should set property `tasks` with response from server', () => {
      scope.$digest();

      expect(Array.isArray(store.list)).toBe(true);
    });

    it('should notify subscriber once tasks are retrieved from server', () => {
      let subscriber = sinon.spy();
      store.subscribe(subscriber);

      scope.$digest();

      expect(subscriber.callCount).toBe(1);
    });
  });


  describe('Action handlers:', () => {
    describe('when a new task is created', () => {
      it('should add task to `tasks` array', () => {
        scope.$digest();

        dispatcher.next({type: CREATE_TASK, payload: {}});

        expect(store.list.length).toBe(1);
      });

      it('should notify subscriber', () => {
        scope.$digest();

        let subscriber = sinon.spy();
        store.subscribe(subscriber);
        dispatcher.next({type: CREATE_TASK, payload: {}});

        expect(subscriber.callCount).toBe(2); // 2 calls with ReplaySubject(1)
      });
    });

    describe('When a task is deleted', () => {
      it('should remove task from `tasks` array', () => {
        scope.$digest();

        let task = {completed: false, title: 'test-task'};
        store.list.push(task);
        dispatcher.next({type: DELETE_TASK, task});

        expect(store.list.length).toBe(0);
      });

      it('should notify subscriber', () => {
        scope.$digest();

        let subscriber = sinon.spy();
        store.subscribe(subscriber);
        dispatcher.next({type: DELETE_TASK, payload: {}});

        expect(subscriber.callCount).toBe(2); // 2 calls with ReplaySubject(1)
      });
    });

    describe('When a task is updated', () => {
      it('should notify subscriber', () => {
        scope.$digest();

        let subscriber = sinon.spy();
        store.subscribe(subscriber);
        dispatcher.next({type: UPDATE_TASK, payload: {}});

        expect(subscriber.callCount).toBe(2); // 2 calls with ReplaySubject(1)
      });
    });
  });
});
