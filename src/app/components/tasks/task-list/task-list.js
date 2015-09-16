import Inject from 'app/core/decorators/inject';


@Inject('TaskService') // eslint-disable-line new-cap

export default class TaskList {
  constructor(taskService) {
    this.taskService = taskService;
    this.tasks = [];

    taskService.getTasks().then(() => {
      this.tasks = taskService.tasks;
    });
  }
}
