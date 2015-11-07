import { Dispatcher } from 'modules/dispatcher';

import {
  CREATE_TASK,
  DELETE_TASK,
  UPDATE_TASK
} from './constants';

import { TaskActions } from './task-actions';


describe('TaskActions', () => {
  let api;
  let dispatcher;
  let q;
  let scope;
  let taskActions;


  beforeEach(() => {
    dispatcher = new Dispatcher();

    inject(($q, $rootScope) => {
      q = $q;
      scope = $rootScope;

      api = {
        create: sinon.stub(),
        delete: sinon.stub(),
        update: sinon.stub()
      };

      taskActions = new TaskActions(api, dispatcher);
    });
  });


  describe('Creating a task', () => {
    it('should call api.create', () => {
      api.create.returns(q.resolve());
      taskActions.createTask('test');

      scope.$digest();

      expect(api.create.callCount).toBe(1);
    });

    it('should notify subscriber', () => {
      let subscriber = sinon.spy();
      let task = {};

      api.create.returns(q.resolve(task));
      dispatcher.subscribe(subscriber);
      taskActions.createTask('test');

      scope.$digest();

      expect(subscriber.callCount).toBe(1);
      expect(subscriber.args[0][0].type).toBe(CREATE_TASK);
      expect(subscriber.args[0][0].payload).toBe(task);
    });
  });

  describe('Deleting a task', () => {
    it('should call api.delete', () => {
      let task = {links: {self: '/tasks/123'}};
      api.delete.returns(q.resolve());
      taskActions.deleteTask(task);

      scope.$digest();

      expect(api.delete.callCount).toBe(1);
    });

    it('should notify subscriber', () => {
      let subscriber = sinon.spy();
      let task = {links: {self: '/tasks/123'}};

      api.delete.returns(q.resolve(task));
      dispatcher.subscribe(subscriber);
      taskActions.deleteTask(task);

      scope.$digest();

      expect(subscriber.callCount).toBe(1);
      expect(subscriber.args[0][0].type).toBe(DELETE_TASK);
      expect(subscriber.args[0][0].payload).toBe(task);
    });
  });

  describe('Updating a task', () => {
    it('should call api.update', () => {
      let task = {links: {self: '/tasks/123'}};
      api.update.returns(q.resolve());
      taskActions.updateTask(task);

      scope.$digest();

      expect(api.update.callCount).toBe(1);
    });

    it('should notify subscriber', () => {
      let subscriber = sinon.spy();
      let task = {links: {self: '/tasks/123'}};

      api.update.returns(q.resolve(task));
      dispatcher.subscribe(subscriber);
      taskActions.updateTask(task);

      scope.$digest();

      expect(subscriber.callCount).toBe(1);
      expect(subscriber.args[0][0].type).toBe(UPDATE_TASK);
      expect(subscriber.args[0][0].payload).toBe(task);
    });
  });
});

