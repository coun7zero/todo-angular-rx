import { ActionTypes } from 'app/config/constants';
import { Dispatcher } from 'app/core/dispatcher/dispatcher';
import { TaskService } from './task-service';


describe('TaskService', () => {
  let dispatcher;
  let serverService;
  let taskService;
  let q;
  let scope;


  beforeEach(() => {
    dispatcher = new Dispatcher();

    inject(($q, $rootScope) => {
      q = $q;
      scope = $rootScope;

      serverService = {
        create: sinon.stub(),
        delete: sinon.stub(),
        update: sinon.stub()
      };

      taskService = new TaskService(ActionTypes, dispatcher, serverService);
    });
  });


  describe('Creating a task', () => {
    it('should call serverService.create', () => {
      serverService.create.returns(q.resolve());
      taskService.createTask('test');

      scope.$digest();

      expect(serverService.create.callCount).toBe(1);
    });

    it('should notify observer', () => {
      let observer = sinon.spy();
      let task = {};

      serverService.create.returns(q.resolve(task));
      dispatcher.subscribe(observer);
      taskService.createTask('test');

      scope.$digest();

      expect(observer.callCount).toBe(1);
      expect(observer.args[0][0].type).toBe(ActionTypes.CREATE_TASK);
      expect(observer.args[0][0].task).toBe(task);
    });
  });

  describe('Deleting a task', () => {
    it('should call serverService.delete', () => {
      let task = {links: {self: '/tasks/123'}};
      serverService.delete.returns(q.resolve());
      taskService.deleteTask(task);

      scope.$digest();

      expect(serverService.delete.callCount).toBe(1);
    });

    it('should notify observer', () => {
      let observer = sinon.spy();
      let task = {links: {self: '/tasks/123'}};

      serverService.delete.returns(q.resolve(task));
      dispatcher.subscribe(observer);
      taskService.deleteTask(task);

      scope.$digest();

      expect(observer.callCount).toBe(1);
      expect(observer.args[0][0].type).toBe(ActionTypes.DELETE_TASK);
      expect(observer.args[0][0].task).toBe(task);
    });
  });

  describe('Updating a task', () => {
    it('should call serverService.update', () => {
      let task = {links: {self: '/tasks/123'}};
      serverService.update.returns(q.resolve());
      taskService.updateTask(task);

      scope.$digest();

      expect(serverService.update.callCount).toBe(1);
    });

    it('should notify observer', () => {
      let observer = sinon.spy();
      let task = {links: {self: '/tasks/123'}};

      serverService.update.returns(q.resolve(task));
      dispatcher.subscribe(observer);
      taskService.updateTask(task);

      scope.$digest();

      expect(observer.callCount).toBe(1);
      expect(observer.args[0][0].type).toBe(ActionTypes.UPDATE_TASK);
      expect(observer.args[0][0].task).toBe(task);
    });
  });
});

