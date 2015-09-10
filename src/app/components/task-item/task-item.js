import Inject from 'app/core/decorators/inject';


@Inject('$scope', 'TaskService') // eslint-disable-line new-cap

export default class TaskItem {
  constructor($scope, taskService) {
    this.scope = $scope;
    this.taskService = taskService;
    this.editing = false;
  }

  cancelEdit() {
    this.editing = false;
  }

  edit() {
    this.title = this.scope.task.title;
    this.editing = true;
  }

  delete() {
    this.taskService.deleteTask(this.scope.task);
  }

  save() {
    if (this.editing) {
      if (this.scope.task.title !== this.title) {
        this.scope.task.title = this.title;
        this.taskService.updateTask(this.scope.task);
      }
      this.editing = false;
    }
  }

  toggleCompleted() {
    this.scope.task.completed = !this.scope.task.completed;
    this.taskService.updateTask(this.scope.task);
  }
}
