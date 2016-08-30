import template from './tasks.html';
import { RouterDispatcher } from '../../modules/router/router-dispatcher.js';

export let tasksParams = {}

export function TasksDirective() {
  return {
    controller: 'Tasks',
    controllerAs: 'tasks',
    restrict: 'E',
    scope: {},
    template
  };
}

export class Tasks {
  static $inject = [
    '$scope',
    'TaskActions',
    'TaskStore'
  ];

  constructor($scope, taskActions, taskStore) {
    const that = this;
    const subscription = taskStore.subscribe(list => this.list = list);
    const router =  RouterDispatcher.subscribe(function(params){
      tasksParams.filter = params.filter;
      that.selectedFilter = tasksParams.filter;
    });

    $scope.$on('$destroy', () => {
      subscription.unsubscribe();
    });

    this.actions = taskActions;
  }
}
