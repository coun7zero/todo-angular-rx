import LocalStorageApi from './local-storage-api';
import Task from '../task/task';


describe('LocalStorageApi', () => {
  const storageKey = 'test';


  beforeEach(() => {
    angular.mock.module('angular-storage', $provide => {
      $provide.constant('localStorageKey', storageKey);
      $provide.value('Task', Task);
      $provide.service('api', LocalStorageApi);
    });
  });

  afterEach(() => {
    localStorage.clear();
  });


  function taskInStorage(task) {
    const list = JSON.parse(localStorage.getItem(storageKey));
    return list.some(item => {
      return item.title === task.title;
    });
  }


  describe('Creating a task', () => {
    it('should add task to `tasks` array', inject(($rootScope, api) => {
      const title = 'test';

      api.tasks = [];
      api.createTask(title);
      $rootScope.$digest();

      expect(api.tasks[0].title).toBe(title);
    }));

    it('should add task to localStorage', inject(($rootScope, api) => {
      const title = 'test';

      api.tasks = [];
      api.createTask(title);
      $rootScope.$digest();

      expect(taskInStorage(api.tasks[0])).toBe(true);
    }));

    it('should fulfill promise with the newly created task', inject(($rootScope, api) => {
      const title = 'test';

      api
        .createTask(title)
        .then(function(task){
          expect(task.title).toBe(title);
        });

      $rootScope.$digest();
    }));
  });


  describe('Deleting a task', () => {
    it('should remove task from `tasks` array', inject(($rootScope, api) => {
      const task = {title: 'test'};

      api.tasks = [task];
      api.deleteTask(task);
      $rootScope.$digest();

      expect(api.tasks.length).toBe(0);
    }));

    it('should remove task from localStorage', inject(($rootScope, api) => {
      const task = {title: 'test'};

      api.tasks = [task];
      localStorage.setItem(storageKey, JSON.stringify(api.tasks));

      api.deleteTask(task);
      $rootScope.$digest();

      expect(taskInStorage(task)).toBe(false);
    }));

    it('should fulfill promise with the deleted task', inject(($rootScope, api) => {
      const task = {title: 'test'};

      api
        .deleteTask(task)
        .then(function($task){
          expect($task).toBe(task);
        });

      $rootScope.$digest();
    }));
  });


  describe('Updating a task', () => {
    it('should update task in `tasks` array', inject(($rootScope, api) => {
      const task = {title: 'test'};

      api.tasks = [task];

      task.title = 'foo';

      api.updateTask(task);
      $rootScope.$digest();

      expect(api.tasks[0]).toBe(task);
    }));

    it('should update task in localStorage', inject(($rootScope, api) => {
      const task = {title: 'test'};

      api.tasks = [task];
      localStorage.setItem(storageKey, JSON.stringify(api.tasks));

      task.title = 'foo';

      api.updateTask(task);
      $rootScope.$digest();

      expect(taskInStorage(task)).toBe(true);
    }));

    it('should fulfill promise with the updated task', inject(($rootScope, api) => {
      const task = {title: 'test'};

      api
        .updateTask(task)
        .then(function($task){
          expect($task).toBe(task);
        });

      $rootScope.$digest();
    }));
  });


  describe('Getting tasks from localStorage', () => {
    it('should set `tasks` with an array of tasks from localStorage', inject(($rootScope, api) => {
      localStorage.setItem(storageKey, JSON.stringify([{title: 'task1'}, {title: 'task2'}]));

      api.getTasks();
      $rootScope.$digest();

      expect(Array.isArray(api.tasks)).toBe(true);
      expect(api.tasks.length).toBe(2);
    }));

    it('should set `tasks` with an empty array if localStorage is empty', inject(($rootScope, api) => {
      api.getTasks();
      $rootScope.$digest();

      expect(Array.isArray(api.tasks)).toBe(true);
      expect(api.tasks.length).toBe(0);
    }));

    it('should fulfill promise with an array of tasks', inject(($rootScope, api) => {
      localStorage.setItem(storageKey, JSON.stringify([{title: 'task1'}, {title: 'task2'}]));

      api
        .getTasks()
        .then(tasks => {
          expect(Array.isArray(tasks)).toBe(true);
          expect(tasks.length).toBe(2);
        });

      $rootScope.$digest();
    }));

    it('should fulfill promise with an empty array if there are no tasks', inject(($rootScope, api) => {
      api
        .getTasks()
        .then(tasks => {
          expect(Array.isArray(tasks)).toBe(true);
          expect(tasks.length).toBe(0);
        });

      $rootScope.$digest();
    }));
  });

});
