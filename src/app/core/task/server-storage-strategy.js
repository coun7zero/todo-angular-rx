import { Inject } from 'app/core/decorators/inject';


@Inject('$http', 'storageConfig', 'Task')
export class ServerStorageStrategy {
  constructor($http, storageConfig, Task) {
    this.http = $http;
    this.Task = Task;
    this.tasks = [];
    this.baseUrl = storageConfig.BASE_URL;
    this.tasksUrl = storageConfig.TASKS_URL;
  }

  loadTasks() {
    return this.http.get(this.tasksUrl)
      .then(response => {
        return this.tasks = response.data || [];
      });
  }

  createTask(title) {
    let task = new this.Task(title);
    return this.http.post(this.tasksUrl, task)
      .then(response => {
        this.tasks.push(response.data);
        return response.data;
      });
  }

  deleteTask(task) {
    this.tasks.splice(this.tasks.indexOf(task), 1);
    return this.http.delete(this.baseUrl + task.links.self)
      .then(() => task);
  }

  updateTask(task) {
    return this.http.put(this.baseUrl + task.links.self, task)
      .then(() => task);
  }
}
