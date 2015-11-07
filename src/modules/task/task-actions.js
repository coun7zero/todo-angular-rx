import { API_TASKS_PATH } from 'modules/api';

import {
  CREATE_TASK,
  DELETE_TASK,
  UPDATE_TASK
} from './constants';

import { Task } from './task';


export class TaskActions {
  static $inject = [
    'APIService',
    'Dispatcher'
  ];

  constructor(api, dispatcher) {
    this.api = api;
    this.dispatcher = dispatcher;
  }

  createTask(title) {
    this.api.create(API_TASKS_PATH, new Task(title))
      .then(data => this.dispatcher.next({
        type: CREATE_TASK,
        payload: data
      }));
  }

  deleteTask(task) {
    this.api.delete(`${API_TASKS_PATH}/${task.id}`)
      .then(() => this.dispatcher.next({
        type: DELETE_TASK,
        payload: task
      }));
  }

  updateTask(task) {
    this.api.update(`${API_TASKS_PATH}/${task.id}`, task)
      .then(data => this.dispatcher.next({
        type: UPDATE_TASK,
        payload: data
      }));
  }
}
