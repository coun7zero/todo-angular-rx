import { routerConfig } from './router';
import { TaskStatus } from 'app/core/task/task';


describe('Router config', () => {
  beforeEach(() => {
    angular.module('test', ['ui.router', 'templates'])
      .controller('AppController', angular.noop)
      .controller('TaskFormController', angular.noop)
      .controller('TaskListController', angular.noop)
      .config(routerConfig);

    angular.mock.module('test');
  });


  describe('`tasks` state', () => {
    it('should transition to `tasks` state', inject(($rootScope, $state) => {
      $state.go('app.tasks');
      $rootScope.$digest();

      expect($state.current.name).toBe('app.tasks');
    }));
  });


  describe('`app.tasks` state', () => {
    describe('with `filter=active`', () => {
      it('should transition to `app.tasks` state', inject(($rootScope, $state) => {
        $state.go('app.tasks', {filter: TaskStatus.ACTIVE});
        $rootScope.$digest();
        expect($state.current.name).toBe('app.tasks');
      }));

      it('should set param `filter` to `active`', inject(($rootScope, $state, $stateParams) => {
        $state.go('app.tasks', {filter: TaskStatus.ACTIVE});
        $rootScope.$digest();
        expect($stateParams.filter).toBe('active');
      }));
    });

    describe('with `filter=completed`', () => {
      it('should transition to `app.tasks` state', inject(($rootScope, $state) => {
        $state.go('app.tasks', {filter: TaskStatus.COMPLETED});
        $rootScope.$digest();
        expect($state.current.name).toBe('app.tasks');
      }));

      it('should set param `filter` to `completed`', inject(($rootScope, $state, $stateParams) => {
        $state.go('app.tasks', {filter: TaskStatus.COMPLETED});
        $rootScope.$digest();
        expect($stateParams.filter).toBe('completed');
      }));
    });

    describe('with invalid `filter` param', () => {
      it('should transition to default `tasks` state', inject(($rootScope, $state) => {
        $state.go('app.tasks', {filter: 'foo'});
        $rootScope.$digest();
        expect($state.current.name).toBe('app.tasks');
      }));
    });
  });

});
