import template from './tasks.html';


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
    '$stateParams',
    'TaskActions',
    'TaskStore'
  ];

  constructor($scope, $stateParams, taskActions, taskStore) {
    const subscription = taskStore.subscribe(list => this.list = list);

    $scope.$on('$destroy', () => {
      subscription.unsubscribe();
    });

    this.actions = taskActions;
    this.selectedFilter = $stateParams.filter;
  }
}
