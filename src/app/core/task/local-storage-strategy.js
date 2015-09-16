import Inject from 'app/core/decorators/inject';


@Inject('$q', '$localStorage', 'localStorageKey', 'Task') // eslint-disable-line new-cap

export default class LocalStorageStrategy {
  constructor($q, $localStorage, localStorageKey, Task) {
    this.q = $q;
    this.storage = $localStorage;
    this.storageKey = localStorageKey;
    this.Task = Task;
    this.tasks = [];
  }

  getTasks() {
    this.tasks = this.storage.getObject(this.storageKey) || [];
    return this.q.resolve(this.tasks);
  }

  createTask(title) {
    let task = new this.Task(title);
    this.tasks.unshift(task);
    this.save();
    return this.q.resolve(task);
  }

  deleteTask(task) {
    this.tasks.splice(this.tasks.indexOf(task), 1);
    this.save();
    return this.q.resolve(task);
  }

  updateTask(task) {
    this.save();
    return this.q.resolve(task);
  }

  save() {
    this.storage.putObject(this.storageKey, this.tasks);
  }
}
