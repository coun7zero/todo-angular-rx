import ServerApi from './server-api';
import Task from '../task/task';


describe('ServerApi', () => {
  let api;
  let httpBackend;


  beforeEach(() => {
    angular.mock.module($provide => {
      $provide.value('Task', Task);
      $provide.service('ServerApi', ServerApi);
    });

    inject(($httpBackend, ServerApi) => {
      httpBackend = $httpBackend;
      api = ServerApi;
    });
  });

  afterEach(() => {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });


  describe('Creating a task', () => {
    it('should add task to `tasks` array', () => {
      const task = {title: 'test'};

      httpBackend.whenPOST('http://localhost:8000/tasks').respond(200, task);
      api.tasks = [];
      api.createTask(task.title);
      httpBackend.flush();

      expect(api.tasks[0]).toEqual(task);
    });

    it('should POST new task to server', () => {
      const task = {completed: false, title: 'test'};
      httpBackend.expectPOST('http://localhost:8000/tasks', task).respond(200);
      api.createTask(task.title);
      httpBackend.flush();
    });

    it('should fulfill promise with the newly created task', () => {
      const task = {title: 'test'};

      httpBackend.whenPOST('http://localhost:8000/tasks').respond(200, task);

      api.createTask(task.title)
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

      httpBackend.whenDELETE('http://localhost:8000/tasks/123').respond(204);
      api.tasks = [task];
      api.deleteTask(task);
      httpBackend.flush();

      expect(api.tasks.length).toBe(0);
    });

    it('should DELETE task from server', () => {
      const task = new Task('test');
      task.links = {self: '/tasks/123'};

      httpBackend.expectDELETE('http://localhost:8000/tasks/123').respond(204);
      api.deleteTask(task);
      httpBackend.flush();
    });

    it('should fulfill promise with the deleted task', () => {
      const task = new Task('test');
      task.links = {self: '/tasks/123'};

      httpBackend.whenDELETE('http://localhost:8000/tasks/123').respond(204);

      api.deleteTask(task)
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

      httpBackend.expectPUT('http://localhost:8000/tasks/123', task).respond(200);
      api.updateTask(task);
      httpBackend.flush();
    });

    it('should fulfill promise with the updated task', () => {
      const task = new Task('test');
      task.links = {self: '/tasks/123'};

      httpBackend.whenPUT('http://localhost:8000/tasks/123').respond(200);

      api.updateTask(task)
        .then(_task => {
          expect(_task).toBe(task);
        });

      httpBackend.flush();
    });
  });


  describe('Getting tasks', () => {
    it('should GET tasks from server', () => {
      httpBackend.expectGET('http://localhost:8000/tasks').respond(200, []);
      api.getTasks();
      httpBackend.flush();
    });

    it('should set `tasks` with an array of tasks from server', () => {
      httpBackend.whenGET('http://localhost:8000/tasks').respond(200, [{}, {}]);
      api.tasks = [];
      api.getTasks();
      httpBackend.flush();

      expect(api.tasks.length).toBe(2);
    });

    it('should set `tasks` with an empty array if there are no tasks', () => {
      httpBackend.whenGET('http://localhost:8000/tasks').respond(200, []);
      api.tasks = [];
      api.getTasks();
      httpBackend.flush();

      expect(api.tasks.length).toBe(0);
    });

    it('should fulfill promise with the tasks array', () => {
      httpBackend.whenGET('http://localhost:8000/tasks').respond(200, [{}, {}]);
      api.tasks = [];

      api.getTasks()
        .then(tasks => {
          expect(tasks).toBe(api.tasks);
        });

      httpBackend.flush();
    });
  });

});
