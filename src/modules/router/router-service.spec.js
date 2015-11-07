import { routerConfig } from 'config/router';
import { TaskStatus } from 'modules/task/task';
import { RouterService } from './router-service';


describe('RouterService', () => {
  beforeEach(() => {
    angular.module('test', ['ui.router', 'templates'])
      .value('TaskStatus', TaskStatus)
      .service('router', RouterService)
      .controller('TaskFormController', () => {})
      .controller('TaskListController', () => {})
      .config(routerConfig);

    angular.mock.module('test');
  });


  describe('#isActiveTasks()', () => {
    it('should return true if current state matches', inject(($rootScope, $state, router, TaskStatus) => {
      $state.go('app.tasks', {filter: TaskStatus.ACTIVE});
      $rootScope.$digest();

      expect(router.isActiveTasks()).toBe(true);
    }));

    it('should return false if current does not match', inject(($rootScope, $state, router, TaskStatus) => {
      $state.go('app.tasks', {filter: TaskStatus.COMPLETED});
      $rootScope.$digest();

      expect(router.isActiveTasks()).toBe(false);
    }));
  });


  describe('#isCompletedTasks()', () => {
    it('should return true if current state matches', inject(($rootScope, $state, router, TaskStatus) => {
      $state.go('app.tasks', {filter: TaskStatus.COMPLETED});
      $rootScope.$digest();

      expect(router.isCompletedTasks()).toBe(true);
    }));

    it('should return false if current does not match', inject(($rootScope, $state, router, TaskStatus) => {
      $state.go('app.tasks', {filter: TaskStatus.ACTIVE});
      $rootScope.$digest();

      expect(router.isCompletedTasks()).toBe(false);
    }));
  });


  describe('#isTasks()', () => {
    it('should return true if current state matches', inject(($rootScope, $state, router) => {
      $state.go('app.tasks');
      $rootScope.$digest();

      expect(router.isTasks()).toBe(true);
    }));

    it('should return false if current does not match', inject(($rootScope, $state, router, TaskStatus) => {
      $state.go('app.tasks', {filter: TaskStatus.COMPLETED});
      $rootScope.$digest();

      expect(router.isTasks()).toBe(false);
    }));
  });


  describe('#toActiveTasks()', () => {
    it('should go to requested state', inject(($rootScope, $state, $stateParams, router, TaskStatus) => {
      router.toActiveTasks();
      $rootScope.$digest();

      expect($state.current.name).toBe('app.tasks');
      expect($stateParams.filter).toBe(TaskStatus.ACTIVE);
    }));

    it('should set `params.filter` to `active`', inject(($rootScope, $state, $stateParams, router, TaskStatus) => {
      router.toActiveTasks();
      $rootScope.$digest();

      expect(router.params.filter).toBe(TaskStatus.ACTIVE);
    }));
  });


  describe('#toCompletedTasks()', () => {
    it('should go to requested state', inject(($rootScope, $state, $stateParams, router, TaskStatus) => {
      router.toCompletedTasks();
      $rootScope.$digest();

      expect($state.current.name).toBe('app.tasks');
      expect($stateParams.filter).toBe(TaskStatus.COMPLETED);
    }));

    it('should set `params.filter` to `completed`', inject(($rootScope, $state, $stateParams, router, TaskStatus) => {
      router.toCompletedTasks();
      $rootScope.$digest();

      expect(router.params.filter).toBe(TaskStatus.COMPLETED);
    }));
  });


  describe('#toTasks()', () => {
    it('should go to requested state', inject(($rootScope, $state, $stateParams, router) => {
      router.toTasks();
      $rootScope.$digest();

      expect($state.current.name).toBe('app.tasks');
      expect($stateParams.filter).not.toBeDefined();
    }));

    it('should not set `params.filter`', inject(($rootScope, $state, $stateParams, router) => {
      router.toTasks();
      $rootScope.$digest();

      expect(router.params.filter).not.toBeDefined();
    }));
  });

});
