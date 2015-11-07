import { ReplaySubject } from '@reactivex/rxjs/dist/cjs/Rx';

import {
  CREATE_TASK,
  DELETE_TASK,
  UPDATE_TASK
} from './constants';


export class TaskStore {
  static $inject = [
    'APIService',
    'Dispatcher'
  ];

  constructor(api, dispatcher) {
    this.emitter = new ReplaySubject(1);

    this.registerHandler(dispatcher, CREATE_TASK, this.created);
    this.registerHandler(dispatcher, DELETE_TASK, this.deleted);
    this.registerHandler(dispatcher, UPDATE_TASK, this.updated);

    api.fetch('/tasks')
      .then(data => {
        this.list = data || [];
        this.emit();
      });
  }

  subscribe(next, error) {
    return this.emitter.subscribe(next, error);
  }

  emit() {
    this.emitter.next(this.list);
  }

  created(action) {
    this.list.push(action.payload);
    this.emit();
  }

  deleted(action) {
    this.list.splice(this.list.indexOf(action.payload), 1);
    this.emit();
  }

  updated(/*action*/) {
    this.emit();
  }

  registerHandler(dispatcher, type, handler) {
    return dispatcher
      .filter(action => action.type === type)
      .subscribe(handler.bind(this));
  }
}
