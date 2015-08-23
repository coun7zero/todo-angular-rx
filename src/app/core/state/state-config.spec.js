import { stateConfig } from './state-config';
import * as taskStatus from 'app/constants/task-status';


describe('stateConfig', () => {

  beforeEach(() => {
    angular.module('test', ['ui.router', 'app.templates'])
      .controller('TaskFormController', () => {})
      .controller('TaskListController', () => {})
      .config(stateConfig);

    angular.mock.module('test');
  });


  describe('`tasks` state', () => {
    it('should transition to `tasks` state', inject(($rootScope, $state) => {
      $state.go('tasks.all');
      $rootScope.$digest();

      expect($state.current.name).toBe('tasks.all');
    }));
  });


  describe('`tasks.filtered` state', () => {
    describe('with status: `active`', () => {
      it('should transition to `tasks.filtered` state', inject(($rootScope, $state) => {
        $state.go('tasks.filtered', {status: taskStatus.ACTIVE});
        $rootScope.$digest();
        expect($state.current.name).toBe('tasks.filtered');
      }));

      it('should set param `status` to `active`', inject(($rootScope, $state, $stateParams) => {
        $state.go('tasks.filtered', {status: taskStatus.ACTIVE});
        $rootScope.$digest();
        expect($stateParams.status).toBe('active');
      }));
    });

    describe('with status: `completed`', () => {
      it('should transition to `tasks.filtered` state', inject(($rootScope, $state) => {
        $state.go('tasks.filtered', {status: taskStatus.COMPLETED});
        $rootScope.$digest();
        expect($state.current.name).toBe('tasks.filtered');
      }));

      it('should set param `status` to `completed`', inject(($rootScope, $state, $stateParams) => {
        $state.go('tasks.filtered', {status: taskStatus.COMPLETED});
        $rootScope.$digest();
        expect($stateParams.status).toBe('completed');
      }));
    });

    describe('with invalid `status` param', () => {
      it('should transition to default `tasks` state', inject(($rootScope, $state) => {
        $state.go('tasks.filtered', {status: 'foo'});
        $rootScope.$digest();
        expect($state.current.name).toBe('tasks.all');
      }));
    });
  });

});
