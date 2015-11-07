import { Inject } from 'modules/decorators/inject';
import { Task } from 'modules/task/task';


@Inject('ActionTypes', 'Dispatcher', 'APIService')
export class TaskActions {
  constructor(ActionTypes, dispatcher, api) {
    this.actionTypes = ActionTypes;
    this.dispatcher = dispatcher;
    this.api = api;
  }

  createTask(title) {
    let task = new Task(title);
    this.api.create('/tasks', task)
      .then(resource => {
        this.dispatcher.onNext({
          type: this.actionTypes.CREATE_TASK,
          task: resource
        });
      });
  }

  deleteTask(task) {
    this.api.delete(task.links.self)
      .then(() => {
        this.dispatcher.onNext({
          type: this.actionTypes.DELETE_TASK,
          task
        });
      });
  }

  updateTask(task) {
    this.api.update(task.links.self, task)
      .then(resource => {
        this.dispatcher.onNext({
          type: this.actionTypes.UPDATE_TASK,
          task: resource
        });
      });
  }
}
