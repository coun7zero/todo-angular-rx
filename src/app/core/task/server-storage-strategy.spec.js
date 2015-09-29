import ServerStorageStrategy from './server-storage-strategy';
import Task from '../task/task';
import * as storageConfig from 'app/config/storage';


describe('ServerStorageStrategy', () => {
  let storage;
  let httpBackend;


  beforeEach(() => {
    angular.mock.module($provide => {
      $provide.constant('storageConfig', storageConfig);
      $provide.value('Task', Task);
      $provide.service('ServerStorageStrategy', ServerStorageStrategy);
    });

    inject(($httpBackend, ServerStorageStrategy) => {
      httpBackend = $httpBackend;
      storage = ServerStorageStrategy;
    });
  });

  afterEach(() => {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });


  describe('Creating a task', () => {
    it('should add task to `tasks` array', () => {
      const task = {title: 'test'};

      httpBackend.whenPOST(storageConfig.TASKS_URL).respond(200, task);
      storage.tasks = [];
      storage.createTask(task.title);
      httpBackend.flush();

      expect(storage.tasks[0]).toEqual(task);
    });

    it('should POST new task to server', () => {
      const task = {completed: false, title: 'test'};
      httpBackend.expectPOST(storageConfig.TASKS_URL, task).respond(200);
      storage.createTask(task.title);
      httpBackend.flush();
    });

    it('should fulfill promise with the newly created task', () => {
      const task = {title: 'test'};

      httpBackend.whenPOST(storageConfig.TASKS_URL).respond(200, task);

      storage.createTask(task.title)
        .then(_task => {
          expect(_task).toEqual(task);
        });

      httpBackend.flush();
    });
  });


  describe('Deleting a task', () => {
    it('should remove task from `tasks` array', () => {
      const task = new Task('test');
      task.links = {self: '/tasks/123'};

      httpBackend.whenDELETE(storageConfig.BASE_URL + task.links.self).respond(204);
      storage.tasks = [task];
      storage.deleteTask(task);
      httpBackend.flush();

      expect(storage.tasks.length).toBe(0);
    });

    it('should DELETE task from server', () => {
      const task = new Task('test');
      task.links = {self: '/tasks/123'};

      httpBackend.expectDELETE(storageConfig.BASE_URL + task.links.self).respond(204);
      storage.deleteTask(task);
      httpBackend.flush();
    });

    it('should fulfill promise with the deleted task', () => {
      const task = new Task('test');
      task.links = {self: '/tasks/123'};

      httpBackend.whenDELETE(storageConfig.BASE_URL + task.links.self).respond(204);

      storage.deleteTask(task)
        .then(_task => {
          expect(_task).toBe(task);
        });

      httpBackend.flush();
    });
  });


  describe('Updating a task', () => {
    xit('should update task in `tasks` array', () => {});

    it('should PUT task to server', () => {
      const task = new Task('test');
      task.links = {self: '/tasks/123'};

      httpBackend.expectPUT(storageConfig.BASE_URL + task.links.self, task).respond(200);
      storage.updateTask(task);
      httpBackend.flush();
    });

    it('should fulfill promise with the updated task', () => {
      const task = new Task('test');
      task.links = {self: '/tasks/123'};

      httpBackend.whenPUT(storageConfig.BASE_URL + task.links.self).respond(200);

      storage.updateTask(task)
        .then(_task => {
          expect(_task).toBe(task);
        });

      httpBackend.flush();
    });
  });


  describe('Getting tasks', () => {
    it('should GET tasks from server', () => {
      httpBackend.expectGET(storageConfig.TASKS_URL).respond(200, []);
      storage.getTasks();
      httpBackend.flush();
    });

    it('should set `tasks` with an array of tasks from server', () => {
      httpBackend.whenGET(storageConfig.TASKS_URL).respond(200, [{}, {}]);
      storage.tasks = [];
      storage.getTasks();
      httpBackend.flush();

      expect(storage.tasks.length).toBe(2);
    });

    it('should set `tasks` with an empty array if there are no tasks', () => {
      httpBackend.whenGET(storageConfig.TASKS_URL).respond(200, []);
      storage.tasks = [];
      storage.getTasks();
      httpBackend.flush();

      expect(storage.tasks.length).toBe(0);
    });

    it('should fulfill promise with the tasks array', () => {
      httpBackend.whenGET(storageConfig.TASKS_URL).respond(200, [{}, {}]);
      storage.tasks = [];

      storage.getTasks()
        .then(tasks => {
          expect(tasks).toBe(storage.tasks);
        });

      httpBackend.flush();
    });
  });

});
