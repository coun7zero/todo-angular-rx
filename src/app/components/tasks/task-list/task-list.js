import { Inject } from 'app/core/decorators/inject';


@Inject('$scope', 'TaskStore')
export class TaskList {
  constructor($scope, taskStore) {
    this.tasks = [];

    let subscription = taskStore.subscribe(tasks => {
      this.tasks = tasks;
    });

    $scope.$on('$destroy', () => {
      subscription.dispose();
    });
  }
}
