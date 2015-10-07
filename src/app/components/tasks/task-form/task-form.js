import { Inject } from 'app/core/decorators/inject';


@Inject('$scope', 'TaskService')
export class TaskForm {
  constructor($scope, taskService) {
    this.scope = $scope;
    this.taskService = taskService;
    this.setTitle();
  }

  cancel() {
    this.setTitle();
  }

  submit() {
    if (this.scope.newTaskForm.$valid) {
      this.taskService
        .createTask(this.title)
        .then(() => this.setTitle());
    }
  }

  setTitle() {
    this.title = '';
  }
}
