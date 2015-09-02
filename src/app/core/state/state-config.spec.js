import { stateConfig } from './state-config';
import Task from 'app/core/task/task';


describe('stateConfig', () => {

  beforeEach(() => {
    angular.module('test', ['ui.router', 'app.templates'])
      .controller('AppController', angular.noop)
      .controller('TaskFormController', angular.noop)
      .controller('TaskListController', angular.noop)
      .config(stateConfig);

    angular.mock.module('test');
  });


  describe('`tasks` state', () => {
    it('should transition to `tasks` state', inject(($rootScope, $state) => {
      $state.go('app.tasks');
      $rootScope.$digest();

      expect($state.current.name).toBe('app.tasks');
    }));
  });


  describe('`app.tasks.filtered` state', () => {
    describe('with status: `active`', () => {
      it('should transition to `app.tasks.filtered` state', inject(($rootScope, $state) => {
        $state.go('app.tasks.filtered', {status: Task.STATUS_ACTIVE});
        $rootScope.$digest();
        expect($state.current.name).toBe('app.tasks.filtered');
      }));

      it('should set param `status` to `active`', inject(($rootScope, $state, $stateParams) => {
        $state.go('app.tasks.filtered', {status: Task.STATUS_ACTIVE});
        $rootScope.$digest();
        expect($stateParams.status).toBe('active');
      }));
    });

    describe('with status: `completed`', () => {
      it('should transition to `app.tasks.filtered` state', inject(($rootScope, $state) => {
        $state.go('app.tasks.filtered', {status: Task.STATUS_COMPLETED});
        $rootScope.$digest();
        expect($state.current.name).toBe('app.tasks.filtered');
      }));

      it('should set param `status` to `completed`', inject(($rootScope, $state, $stateParams) => {
        $state.go('app.tasks.filtered', {status: Task.STATUS_COMPLETED});
        $rootScope.$digest();
        expect($stateParams.status).toBe('completed');
      }));
    });

    describe('with invalid `status` param', () => {
      it('should transition to default `tasks` state', inject(($rootScope, $state) => {
        $state.go('app.tasks.filtered', {status: 'foo'});
        $rootScope.$digest();
        expect($state.current.name).toBe('app.tasks');
      }));
    });
  });

});
