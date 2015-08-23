import TaskService from './task-service';
import Task from './task';


describe('TaskService', () => {
  const storageKey = 'test';

  beforeEach(() => {
    angular.mock.module('angular-storage', ($provide) => {
      $provide.constant('localStorageKey', storageKey);
      $provide.value('Task', Task);
      $provide.service('taskService', TaskService);
    });
  });

  afterEach(() => {
    localStorage.clear();
  });


  function taskInStorage(task) {
    const list = JSON.parse(localStorage.getItem(storageKey));
    return list.some((item) => {
      return item.title === task.title;
    });
  }


  describe('Creating a task', () => {
    it('should add task to `tasks` array', inject(($rootScope, taskService) => {
      const title = 'test';

      taskService.tasks = [];
      taskService.createTask(title);
      $rootScope.$digest();

      expect(taskService.tasks[0].title).toBe(title);
    }));

    it('should add task to localStorage', inject(($rootScope, taskService) => {
      const title = 'test';

      taskService.tasks = [];
      taskService.createTask(title);
      $rootScope.$digest();

      expect(taskInStorage(taskService.tasks[0])).toBe(true);
    }));

    it('should fulfill promise with the newly created task', inject(($rootScope, taskService) => {
      const title = 'test';

      taskService
        .createTask(title)
        .then((task) => {
          expect(task.title).toBe(title);
        });

      $rootScope.$digest();
    }));
  });


  describe('Deleting a task', () => {
    it('should remove task from `tasks` array', inject(($rootScope, taskService) => {
      const task = {title: 'test'};

      taskService.tasks = [task];
      taskService.deleteTask(task);
      $rootScope.$digest();

      expect(taskService.tasks.length).toBe(0);
    }));

    it('should remove task from localStorage', inject(($rootScope, taskService) => {
      const task = {title: 'test'};

      taskService.tasks = [task];
      localStorage.setItem(storageKey, JSON.stringify(taskService.tasks));

      taskService.deleteTask(task);
      $rootScope.$digest();

      expect(taskInStorage(task)).toBe(false);
    }));

    it('should fulfill promise with the deleted task', inject(($rootScope, taskService) => {
      const task = {title: 'test'};

      taskService
        .deleteTask(task)
        .then(($task) => {
          expect($task).toBe(task);
        });

      $rootScope.$digest();
    }));
  });


  describe('Updating a task', () => {
    it('should update task in `tasks` array', inject(($rootScope, taskService) => {
      const task = {title: 'test'};

      taskService.tasks = [task];

      task.title = 'foo';

      taskService.updateTask(task);
      $rootScope.$digest();

      expect(taskService.tasks[0]).toBe(task);
    }));

    it('should update task in localStorage', inject(($rootScope, taskService) => {
      const task = {title: 'test'};

      taskService.tasks = [task];
      localStorage.setItem(storageKey, JSON.stringify(taskService.tasks));

      task.title = 'foo';

      taskService.updateTask(task);
      $rootScope.$digest();

      expect(taskInStorage(task)).toBe(true);
    }));

    it('should fulfill promise with the updated task', inject(($rootScope, taskService) => {
      const task = {title: 'test'};

      taskService
        .updateTask(task)
        .then(($task) => {
          expect($task).toBe(task);
        });

      $rootScope.$digest();
    }));
  });


  describe('Getting tasks from localStorage', () => {
    it('should set `tasks` with an array of tasks from localStorage', inject(($rootScope, taskService) => {
      localStorage.setItem(storageKey, JSON.stringify([{title: 'task1'}, {title: 'task2'}]));

      taskService.getTasks();
      $rootScope.$digest();

      expect(Array.isArray(taskService.tasks)).toBe(true);
      expect(taskService.tasks.length).toBe(2);
    }));

    it('should set `tasks` with an empty array if localStorage is empty', inject(($rootScope, taskService) => {
      taskService.getTasks();
      $rootScope.$digest();

      expect(Array.isArray(taskService.tasks)).toBe(true);
      expect(taskService.tasks.length).toBe(0);
    }));

    it('should fulfill promise with an array of tasks', inject(($rootScope, taskService) => {
      localStorage.setItem(storageKey, JSON.stringify([{title: 'task1'}, {title: 'task2'}]));

      taskService
        .getTasks()
        .then((tasks) => {
          expect(Array.isArray(tasks)).toBe(true);
          expect(tasks.length).toBe(2);
        });

      $rootScope.$digest();
    }));

    it('should fulfill promise with an empty array when there are no tasks', inject(($rootScope, taskService) => {
      taskService
        .getTasks()
        .then((tasks) => {
          expect(Array.isArray(tasks)).toBe(true);
          expect(tasks.length).toBe(0);
        });

      $rootScope.$digest();
    }));
  });

});
