import { Inject } from 'modules/decorators/inject';


@Inject('$scope', 'TaskActions')
export class TaskForm {
  constructor($scope, taskActions) {
    this.scope = $scope;
    this.taskActions = taskActions;
    this.setTitle();
  }

  cancel() {
    this.setTitle();
  }

  submit() {
    if (this.scope.newTaskForm.$valid) {
      this.taskActions.createTask(this.title);
      this.setTitle();
    }
  }

  setTitle() {
    this.title = '';
  }
}
