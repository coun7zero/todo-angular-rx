import { routerConfig } from 'app/config/router';
import { TaskStatus } from 'app/core/task/task';
import { StateService } from './state-service';


describe('StateService', () => {
  beforeEach(() => {
    angular.module('test', ['ui.router', 'templates'])
      .value('TaskStatus', TaskStatus)
      .service('stateService', StateService)
      .controller('TaskFormController', () => {})
      .controller('TaskListController', () => {})
      .config(routerConfig);

    angular.mock.module('test');
  });


  describe('#isActiveTasks()', () => {
    it('should return true if current state matches', inject(($rootScope, $state, stateService, TaskStatus) => {
      $state.go('app.tasks', {filter: TaskStatus.ACTIVE});
      $rootScope.$digest();

      expect(stateService.isActiveTasks()).toBe(true);
    }));

    it('should return false if current does not match', inject(($rootScope, $state, stateService, TaskStatus) => {
      $state.go('app.tasks', {filter: TaskStatus.COMPLETED});
      $rootScope.$digest();

      expect(stateService.isActiveTasks()).toBe(false);
    }));
  });


  describe('#isCompletedTasks()', () => {
    it('should return true if current state matches', inject(($rootScope, $state, stateService, TaskStatus) => {
      $state.go('app.tasks', {filter: TaskStatus.COMPLETED});
      $rootScope.$digest();

      expect(stateService.isCompletedTasks()).toBe(true);
    }));

    it('should return false if current does not match', inject(($rootScope, $state, stateService, TaskStatus) => {
      $state.go('app.tasks', {filter: TaskStatus.ACTIVE});
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

    it('should return false if current does not match', inject(($rootScope, $state, stateService, TaskStatus) => {
      $state.go('app.tasks', {filter: TaskStatus.COMPLETED});
      $rootScope.$digest();

      expect(stateService.isTasks()).toBe(false);
    }));
  });


  describe('#toActiveTasks()', () => {
    it('should go to requested state', inject(($rootScope, $state, $stateParams, stateService, TaskStatus) => {
      stateService.toActiveTasks();
      $rootScope.$digest();

      expect($state.current.name).toBe('app.tasks');
      expect($stateParams.filter).toBe(TaskStatus.ACTIVE);
    }));

    it('should set `params.filter` to `active`', inject(($rootScope, $state, $stateParams, stateService, TaskStatus) => {
      stateService.toActiveTasks();
      $rootScope.$digest();

      expect(stateService.params.filter).toBe(TaskStatus.ACTIVE);
    }));
  });


  describe('#toCompletedTasks()', () => {
    it('should go to requested state', inject(($rootScope, $state, $stateParams, stateService, TaskStatus) => {
      stateService.toCompletedTasks();
      $rootScope.$digest();

      expect($state.current.name).toBe('app.tasks');
      expect($stateParams.filter).toBe(TaskStatus.COMPLETED);
    }));

    it('should set `params.filter` to `completed`', inject(($rootScope, $state, $stateParams, stateService, TaskStatus) => {
      stateService.toCompletedTasks();
      $rootScope.$digest();

      expect(stateService.params.filter).toBe(TaskStatus.COMPLETED);
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
