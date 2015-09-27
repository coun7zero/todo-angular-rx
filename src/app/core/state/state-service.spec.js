import { routerConfig } from 'app/router';
import Task from 'app/core/task/task';
import StateService from './state-service';


describe('StateService', () => {

  beforeEach(() => {
    angular.module('test', ['ui.router', 'templates'])
      .value('Task', Task)
      .service('stateService', StateService)
      .controller('TaskFormController', () => {})
      .controller('TaskListController', () => {})
      .config(routerConfig);

    angular.mock.module('test');
  });


  describe('#isActiveTasks()', () => {
    it('should return true if current state matches', inject(($rootScope, $state, stateService, Task) => {
      $state.go('app.tasks', {filter: Task.STATUS_ACTIVE});
      $rootScope.$digest();
      expect(stateService.isActiveTasks()).toBe(true);
    }));

    it('should return false if current does not match', inject(($rootScope, $state, stateService, Task) => {
      $state.go('app.tasks', {filter: Task.STATUS_COMPLETED});
      $rootScope.$digest();
      expect(stateService.isActiveTasks()).toBe(false);
    }));
  });


  describe('#isCompletedTasks()', () => {
    it('should return true if current state matches', inject(($rootScope, $state, stateService, Task) => {
      $state.go('app.tasks', {filter: Task.STATUS_COMPLETED});
      $rootScope.$digest();
      expect(stateService.isCompletedTasks()).toBe(true);
    }));

    it('should return false if current does not match', inject(($rootScope, $state, stateService, Task) => {
      $state.go('app.tasks', {filter: Task.STATUS_ACTIVE});
      $rootScope.$digest();
      expect(stateService.isCompletedTasks()).toBe(false);
    }));
  });


  describe('#isTasks()', () => {
    it('should return true if current state matches', inject(($rootScope, $state, stateService) => {
      $state.go('app.tasks');
      $rootScope.$digest();
      expect(stateService.isTasks()).toBe(true);
    }));

    it('should return false if current does not match', inject(($rootScope, $state, stateService, Task) => {
      $state.go('app.tasks', {filter: Task.STATUS_COMPLETED});
      $rootScope.$digest();
      expect(stateService.isTasks()).toBe(false);
    }));
  });


  describe('#toActiveTasks()', () => {
    it('should go to requested state', inject(($rootScope, $state, $stateParams, stateService, Task) => {
      stateService.toActiveTasks();
      $rootScope.$digest();

      expect($state.current.name).toBe('app.tasks');
      expect($stateParams.filter).toBe(Task.STATUS_ACTIVE);
    }));

    it('should set `params.filter` to `active`', inject(($rootScope, $state, $stateParams, stateService, Task) => {
      stateService.toActiveTasks();
      $rootScope.$digest();

      expect(stateService.params.filter).toBe(Task.STATUS_ACTIVE);
    }));
  });


  describe('#toCompletedTasks()', () => {
    it('should go to requested state', inject(($rootScope, $state, $stateParams, stateService, Task) => {
      stateService.toCompletedTasks();
      $rootScope.$digest();

      expect($state.current.name).toBe('app.tasks');
      expect($stateParams.filter).toBe(Task.STATUS_COMPLETED);
    }));

    it('should set `params.filter` to `completed`', inject(($rootScope, $state, $stateParams, stateService, Task) => {
      stateService.toCompletedTasks();
      $rootScope.$digest();

      expect(stateService.params.filter).toBe(Task.STATUS_COMPLETED);
    }));
  });


  describe('#toTasks()', () => {
    it('should go to requested state', inject(($rootScope, $state, $stateParams, stateService) => {
      stateService.toTasks();
      $rootScope.$digest();

      expect($state.current.name).toBe('app.tasks');
      expect($stateParams.filter).not.toBeDefined();
    }));

    it('should not set `params.filter`', inject(($rootScope, $state, $stateParams, stateService) => {
      stateService.toTasks();
      $rootScope.$digest();

      expect(stateService.params.filter).not.toBeDefined();
    }));
  });

});
