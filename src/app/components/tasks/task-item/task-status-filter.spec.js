import { Task } from 'app/core/task/task';
import { taskStatusFilter } from './task-status-filter';


describe('taskStatus filter', () => {
  beforeEach(() => {
    angular.module('test', [])
      .value('Task', Task)
      .filter('taskStatus', taskStatusFilter);

    angular.mock.module('test');
  });


  it('should filter active tasks when param `status` is `active`', inject(($filter, Task) => {
    let taskList = [{completed: true}, {completed: false}];
    let filter = $filter('taskStatus');
    let result = filter(taskList, Task.STATUS_ACTIVE);

    expect(result.length).toBe(1);
    expect(result[0].completed).toBe(false);
  }));

  it('should filter completed tasks when param `status` is `completed`', inject(($filter, Task) => {
    let taskList = [{completed: true}, {completed: false}];
    let filter = $filter('taskStatus');
    let result = filter(taskList, Task.STATUS_COMPLETED);

    expect(result.length).toBe(1);
    expect(result[0].completed).toBe(true);
  }));

  it('should return all tasks when param `status` is undefined', inject($filter => {
    let taskList = [{completed: true}, {completed: false}];
    let filter = $filter('taskStatus');
    let result = filter(taskList);

    expect(result).toBe(taskList);
  }));

});
