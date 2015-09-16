import Inject from 'app/core/decorators/inject';


@Inject('$http', 'Task') // eslint-disable-line new-cap

export default class ServerStorageStrategy {
  constructor($http, Task) {
    this.http = $http;
    this.Task = Task;
    this.tasks = [];
  }

  getTasks() {
    return this.http
      .get('http://localhost:8000/tasks')
      .then(response => {
        return this.tasks = response.data || [];
      });
  }

  createTask(title) {
    var task = new this.Task(title);
    return this.http
      .post('http://localhost:8000/tasks', task)
      .then(response => {
        this.tasks.push(response.data);
        return response.data;
      });
  }

  deleteTask(task) {
    this.tasks.splice(this.tasks.indexOf(task), 1);
    return this.http
      .delete('http://localhost:8000' + task.links.self)
      .then(() => {
        return task;
      });
  }

  updateTask(task) {
    return this.http
      .put('http://localhost:8000' + task.links.self, task)
      .then(() => {
        return task;
      });
  }
}
