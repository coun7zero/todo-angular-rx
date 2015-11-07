import { ActionTypes } from 'config/constants';
import { Dispatcher } from 'modules/dispatcher/dispatcher';
import { TaskStore } from './task-store';


describe('TaskStore', () => {
  let dispatcher;
  let serverService;
  let scope;
  let store;

  beforeEach(() => {
    dispatcher = new Dispatcher();

    inject(($q, $rootScope) => {
      scope = $rootScope;

      serverService = {
        get: sinon.stub().returns($q.resolve([]))
      };

      store = new TaskStore(ActionTypes, dispatcher, serverService);
    });
  });


  describe('Initialization', () => {
    it('should get tasks from server', () => {
      scope.$digest();

      expect(serverService.get.callCount).toBe(1);
      expect(serverService.get.calledWith('/tasks')).toBe(true);
    });

    it('should set property `tasks` with response from server', () => {
      scope.$digest();

      expect(Array.isArray(store.tasks)).toBe(true);
    });

    it('should notify observer once tasks are retrieved from server', () => {
      let observer = sinon.spy();
      store.subscribe(observer);

      scope.$digest();

      expect(observer.callCount).toBe(1);
    });
  });


  describe('Action handlers:', () => {
    describe('when a new task is created', () => {
      it('should add task to `tasks` array', () => {
        scope.$digest();

        dispatcher.onNext({type: ActionTypes.CREATE_TASK, task: {}});

        expect(store.tasks.length).toBe(1);
      });

      it('should notify observer', () => {
        scope.$digest();

        let observer = sinon.spy();
        store.subscribe(observer);
        dispatcher.onNext({type: ActionTypes.CREATE_TASK, task: {}});

        expect(observer.callCount).toBe(2); // 2 calls with ReplaySubject(1)
      });
    });

    describe('When a task is deleted', () => {
      it('should remove task from `tasks` array', () => {
        scope.$digest();

        let task = {completed: false, title: 'test-task'};
        store.tasks.push(task);
        dispatcher.onNext({type: ActionTypes.DELETE_TASK, task});

        expect(store.tasks.length).toBe(0);
      });

      it('should notify observer', () => {
        scope.$digest();

        let observer = sinon.spy();
        store.subscribe(observer);
        dispatcher.onNext({type: ActionTypes.DELETE_TASK, task: {}});

        expect(observer.callCount).toBe(2); // 2 calls with ReplaySubject(1)
      });
    });

    describe('When a task is updated', () => {
      it('should notify observer', () => {
        scope.$digest();

        let observer = sinon.spy();
        store.subscribe(observer);
        dispatcher.onNext({type: ActionTypes.UPDATE_TASK, task: {}});

        expect(observer.callCount).toBe(2); // 2 calls with ReplaySubject(1)
      });
    });
  });
});
