import { Inject } from 'app/core/decorators/inject';
import { Task } from 'app/core/task/task';


@Inject('ActionTypes', 'Dispatcher', 'ServerService')
export class TaskService {
  constructor(ActionTypes, dispatcher, serverService) {
    this.actionTypes = ActionTypes;
    this.dispatcher = dispatcher;
    this.serverService = serverService;
  }

  createTask(title) {
    let task = new Task(title);
    this.serverService.create('/tasks', task)
      .then(resource => {
        this.dispatcher.onNext({
          type: this.actionTypes.CREATE_TASK,
          task: resource
        });
      });
  }

  deleteTask(task) {
    this.serverService.delete(task.links.self)
      .then(() => {
        this.dispatcher.onNext({
          type: this.actionTypes.DELETE_TASK,
          task
        });
      });
  }

  updateTask(task) {
    this.serverService.update(task.links.self, task)
      .then(resource => {
        this.dispatcher.onNext({
          type: this.actionTypes.UPDATE_TASK,
          task: resource
        });
      });
  }
}
