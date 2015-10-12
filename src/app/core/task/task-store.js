import { ReplaySubject } from 'rx';
import { Inject } from 'app/core/decorators/inject';


@Inject('ActionTypes', 'Dispatcher', 'ServerService')
export class TaskStore {
  constructor(ActionTypes, dispatcher, serverService) {
    this._subject = new ReplaySubject(1);

    this._registerHandler(dispatcher, ActionTypes.CREATE_TASK, this._created);
    this._registerHandler(dispatcher, ActionTypes.DELETE_TASK, this._deleted);
    this._registerHandler(dispatcher, ActionTypes.UPDATE_TASK, this._updated);

    serverService.get('/tasks')
      .then(tasks => {
        this.tasks = tasks;
        this._emit();
      });
  }

  subscribe(next, error) {
    return this._subject.subscribe(next, error);
  }

  _emit() {
    this._subject.onNext(this.tasks);
  }

  _created(action) {
    this.tasks.push(action.task);
    this._emit();
  }

  _deleted(action) {
    this.tasks.splice(this.tasks.indexOf(action.task), 1);
    this._emit();
  }

  _updated() {
    this._emit();
  }

  _registerHandler(dispatcher, type, handler) {
    return dispatcher
      .filter(action => action.type === type)
      .subscribe(handler.bind(this));
  }
}
