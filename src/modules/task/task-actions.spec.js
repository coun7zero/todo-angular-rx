import { ActionTypes } from 'config/constants';
import { Dispatcher } from 'modules/dispatcher/dispatcher';
import { TaskActions } from './task-actions';


describe('TaskActions', () => {
  let dispatcher;
  let apiService;
  let taskActions;
  let q;
  let scope;


  beforeEach(() => {
    dispatcher = new Dispatcher();

    inject(($q, $rootScope) => {
      q = $q;
      scope = $rootScope;

      apiService = {
        create: sinon.stub(),
        delete: sinon.stub(),
        update: sinon.stub()
      };

      taskActions = new TaskActions(ActionTypes, dispatcher, apiService);
    });
  });


  describe('Creating a task', () => {
    it('should call apiService.create', () => {
      apiService.create.returns(q.resolve());
      taskActions.createTask('test');

      scope.$digest();

      expect(apiService.create.callCount).toBe(1);
    });

    it('should notify observer', () => {
      let observer = sinon.spy();
      let task = {};

      apiService.create.returns(q.resolve(task));
      dispatcher.subscribe(observer);
      taskActions.createTask('test');

      scope.$digest();

      expect(observer.callCount).toBe(1);
      expect(observer.args[0][0].type).toBe(ActionTypes.CREATE_TASK);
      expect(observer.args[0][0].task).toBe(task);
    });
  });

  describe('Deleting a task', () => {
    it('should call apiService.delete', () => {
      let task = {links: {self: '/tasks/123'}};
      apiService.delete.returns(q.resolve());
      taskActions.deleteTask(task);

      scope.$digest();

      expect(apiService.delete.callCount).toBe(1);
    });

    it('should notify observer', () => {
      let observer = sinon.spy();
      let task = {links: {self: '/tasks/123'}};

      apiService.delete.returns(q.resolve(task));
      dispatcher.subscribe(observer);
      taskActions.deleteTask(task);

      scope.$digest();

      expect(observer.callCount).toBe(1);
      expect(observer.args[0][0].type).toBe(ActionTypes.DELETE_TASK);
      expect(observer.args[0][0].task).toBe(task);
    });
  });

  describe('Updating a task', () => {
    it('should call apiService.update', () => {
      let task = {links: {self: '/tasks/123'}};
      apiService.update.returns(q.resolve());
      taskActions.updateTask(task);

      scope.$digest();

      expect(apiService.update.callCount).toBe(1);
    });

    it('should notify observer', () => {
      let observer = sinon.spy();
      let task = {links: {self: '/tasks/123'}};

      apiService.update.returns(q.resolve(task));
      dispatcher.subscribe(observer);
      taskActions.updateTask(task);

      scope.$digest();

      expect(observer.callCount).toBe(1);
      expect(observer.args[0][0].type).toBe(ActionTypes.UPDATE_TASK);
      expect(observer.args[0][0].task).toBe(task);
    });
  });
});

