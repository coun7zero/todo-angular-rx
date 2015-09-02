import { stateConfig } from './state-config';
import StateService from './state-service';
import Task from 'app/core/task/task';


describe('StateService', () => {

  beforeEach(() => {
    angular.module('test', ['ui.router', 'app.templates'])
      .value('Task', Task)
      .service('stateService', StateService)
      .controller('TaskFormController', () => {})
      .controller('TaskListController', () => {})
      .config(stateConfig);

    angular.mock.module('test');
  });


  describe('#isActiveTasks()', () => {
    it('should return true if current state matches', inject(($rootScope, $state, stateService, Task) => {
      $state.go('tasks.filtered', {status: Task.STATUS_ACTIVE});
      $rootScope.$digest();
      expect(stateService.isActiveTasks()).toBe(true);
    }));

    it('should return false if current does not match', inject(($rootScope, $state, stateService, Task) => {
      $state.go('tasks.filtered', {status: Task.STATUS_COMPLETED});
      $rootScope.$digest();
      expect(stateService.isActiveTasks()).toBe(false);
    }));
  });


  describe('#isCompletedTasks()', () => {
    it('should return true if current state matches', inject(($rootScope, $state, stateService, Task) => {
      $state.go('tasks.filtered', {status: Task.STATUS_COMPLETED});
      $rootScope.$digest();
      expect(stateService.isCompletedTasks()).toBe(true);
    }));

    it('should return false if current does not match', inject(($rootScope, $state, stateService, Task) => {
      $state.go('tasks.filtered', {status: Task.STATUS_ACTIVE});
      $rootScope.$digest();
      expect(stateService.isCompletedTasks()).toBe(false);
    }));
  });


  describe('#isTasks()', () => {
    it('should return true if current state matches', inject(($rootScope, $state, stateService) => {
      $state.go('tasks.all');
      $rootScope.$digest();
      expect(stateService.isTasks()).toBe(true);
    }));

    it('should return false if current does not match', inject(($rootScope, $state, stateService, Task) => {
      $state.go('tasks.filtered', {status: Task.STATUS_COMPLETED});
      $rootScope.$digest();
      expect(stateService.isTasks()).toBe(false);
    }));
  });


  describe('#toActiveTasks()', () => {
    it('should go to requested state', inject(($rootScope, $state, $stateParams, stateService, Task) => {
      stateService.toActiveTasks();
      $rootScope.$digest();

      expect($state.current.name).toBe('tasks.filtered');
      expect($stateParams.status).toBe(Task.STATUS_ACTIVE);
    }));

    it('should set `params.status` to `active`', inject(($rootScope, $state, $stateParams, stateService, Task) => {
      stateService.toActiveTasks();
      $rootScope.$digest();

      expect(stateService.params.status).toBe(Task.STATUS_ACTIVE);
    }));
  });


  describe('#toCompletedTasks()', () => {
    it('should go to requested state', inject(($rootScope, $state, $stateParams, stateService, Task) => {
      stateService.toCompletedTasks();
      $rootScope.$digest();

      expect($state.current.name).toBe('tasks.filtered');
      expect($stateParams.status).toBe(Task.STATUS_COMPLETED);
    }));

    it('should set `params.status` to `completed`', inject(($rootScope, $state, $stateParams, stateService, Task) => {
      stateService.toCompletedTasks();
      $rootScope.$digest();

      expect(stateService.params.status).toBe(Task.STATUS_COMPLETED);
    }));
  });


  describe('#toTasks()', () => {
    it('should go to requested state', inject(($rootScope, $state, $stateParams, stateService) => {
      stateService.toTasks();
      $rootScope.$digest();

      expect($state.current.name).toBe('tasks.all');
      expect($stateParams.status).not.toBeDefined();
    }));

    it('should not set `params.status`', inject(($rootScope, $state, $stateParams, stateService) => {
      stateService.toTasks();
      $rootScope.$digest();

      expect(stateService.params.status).not.toBeDefined();
    }));
  });

});
