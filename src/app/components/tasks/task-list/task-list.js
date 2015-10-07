import { Inject } from 'app/core/decorators/inject';


@Inject('TaskService')
export class TaskList {
  constructor(taskService) {
    this.tasks = [];

    taskService.loadTasks()
      .then(tasks => this.tasks = tasks );
  }
}
