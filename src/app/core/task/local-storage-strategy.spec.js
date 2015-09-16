import LocalStorageStrategy from './local-storage-strategy';
import Task from '../task/task';


describe('LocalStorageStrategy', () => {
  const storageKey = 'test';


  beforeEach(() => {
    angular.mock.module('angular-storage', $provide => {
      $provide.constant('localStorageKey', storageKey);
      $provide.value('Task', Task);
      $provide.service('storage', LocalStorageStrategy);
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
    it('should add task to `tasks` array', inject(($rootScope, storage) => {
      const title = 'test';

      storage.tasks = [];
      storage.createTask(title);
      $rootScope.$digest();

      expect(storage.tasks[0].title).toBe(title);
    }));

    it('should add task to localStorage', inject(($rootScope, storage) => {
      const title = 'test';

      storage.tasks = [];
      storage.createTask(title);
      $rootScope.$digest();

      expect(taskInStorage(storage.tasks[0])).toBe(true);
    }));

    it('should fulfill promise with the newly created task', inject(($rootScope, storage) => {
      const title = 'test';

      storage
        .createTask(title)
        .then(function(task){
          expect(task.title).toBe(title);
        });

      $rootScope.$digest();
    }));
  });


  describe('Deleting a task', () => {
    it('should remove task from `tasks` array', inject(($rootScope, storage) => {
      const task = {title: 'test'};

      storage.tasks = [task];
      storage.deleteTask(task);
      $rootScope.$digest();

      expect(storage.tasks.length).toBe(0);
    }));

    it('should remove task from localStorage', inject(($rootScope, storage) => {
      const task = {title: 'test'};

      storage.tasks = [task];
      localStorage.setItem(storageKey, JSON.stringify(storage.tasks));

      storage.deleteTask(task);
      $rootScope.$digest();

      expect(taskInStorage(task)).toBe(false);
    }));

    it('should fulfill promise with the deleted task', inject(($rootScope, storage) => {
      const task = {title: 'test'};

      storage
        .deleteTask(task)
        .then(function($task){
          expect($task).toBe(task);
        });

      $rootScope.$digest();
    }));
  });


  describe('Updating a task', () => {
    it('should update task in `tasks` array', inject(($rootScope, storage) => {
      const task = {title: 'test'};

      storage.tasks = [task];

      task.title = 'foo';

      storage.updateTask(task);
      $rootScope.$digest();

      expect(storage.tasks[0]).toBe(task);
    }));

    it('should update task in localStorage', inject(($rootScope, storage) => {
      const task = {title: 'test'};

      storage.tasks = [task];
      localStorage.setItem(storageKey, JSON.stringify(storage.tasks));

      task.title = 'foo';

      storage.updateTask(task);
      $rootScope.$digest();

      expect(taskInStorage(task)).toBe(true);
    }));

    it('should fulfill promise with the updated task', inject(($rootScope, storage) => {
      const task = {title: 'test'};

      storage
        .updateTask(task)
        .then(function($task){
          expect($task).toBe(task);
        });

      $rootScope.$digest();
    }));
  });


  describe('Getting tasks from localStorage', () => {
    it('should set `tasks` with an array of tasks from localStorage', inject(($rootScope, storage) => {
      localStorage.setItem(storageKey, JSON.stringify([{title: 'task1'}, {title: 'task2'}]));

      storage.getTasks();
      $rootScope.$digest();

      expect(Array.isArray(storage.tasks)).toBe(true);
      expect(storage.tasks.length).toBe(2);
    }));

    it('should set `tasks` with an empty array if localStorage is empty', inject(($rootScope, storage) => {
      storage.getTasks();
      $rootScope.$digest();

      expect(Array.isArray(storage.tasks)).toBe(true);
      expect(storage.tasks.length).toBe(0);
    }));

    it('should fulfill promise with an array of tasks', inject(($rootScope, storage) => {
      localStorage.setItem(storageKey, JSON.stringify([{title: 'task1'}, {title: 'task2'}]));

      storage
        .getTasks()
        .then(tasks => {
          expect(Array.isArray(tasks)).toBe(true);
          expect(tasks.length).toBe(2);
        });

      $rootScope.$digest();
    }));

    it('should fulfill promise with an empty array if there are no tasks', inject(($rootScope, storage) => {
      storage
        .getTasks()
        .then(tasks => {
          expect(Array.isArray(tasks)).toBe(true);
          expect(tasks.length).toBe(0);
        });

      $rootScope.$digest();
    }));
  });

});
