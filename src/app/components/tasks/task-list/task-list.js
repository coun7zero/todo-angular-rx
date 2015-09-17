import Inject from 'app/core/decorators/inject';


@Inject('TaskService') // eslint-disable-line new-cap

export default class TaskList {
  constructor(taskService) {
    this.tasks = [];

    taskService.getTasks().then(tasks => {
      this.tasks = tasks;
    });
  }
}
