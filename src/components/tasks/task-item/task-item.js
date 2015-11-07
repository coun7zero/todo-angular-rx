import { Inject } from 'modules/decorators/inject';


@Inject('$scope', 'TaskActions')
export class TaskItem {
  constructor($scope, taskActions) {
    this.scope = $scope;
    this.taskActions = taskActions;
    this.editing = false;
    this.statusUpdated = false;
  }

  cancelEdit() {
    this.editing = false;
  }

  edit() {
    this.title = this.scope.task.title;
    this.editing = true;
  }

  delete() {
    this.taskActions.deleteTask(this.scope.task);
  }

  save() {
    if (this.editing) {
      if (this.scope.task.title !== this.title) {
        this.scope.task.title = this.title;
        this.taskActions.updateTask(this.scope.task);
      }
      this.editing = false;
    }
  }

  toggleCompleted() {
    this.scope.task.completed = !this.scope.task.completed;
    this.taskActions.updateTask(this.scope.task);
    this.statusUpdated = this.scope.task.completed;
  }
}
