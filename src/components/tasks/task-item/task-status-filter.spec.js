import { TaskStatus } from 'modules/task/task';
import { taskStatusFilter } from './task-status-filter';


describe('taskStatus filter', () => {
  beforeEach(() => {
    angular.module('test', [])
      .value('TaskStatus', TaskStatus)
      .filter('taskStatus', taskStatusFilter);

    angular.mock.module('test');
  });


  it('should filter active tasks when param `status` is `active`', inject(($filter, TaskStatus) => {
    let taskList = [{completed: true}, {completed: false}];
    let filter = $filter('taskStatus');
    let result = filter(taskList, TaskStatus.ACTIVE);

    expect(result.length).toBe(1);
    expect(result[0].completed).toBe(false);
  }));

  it('should filter completed tasks when param `status` is `completed`', inject(($filter, TaskStatus) => {
    let taskList = [{completed: true}, {completed: false}];
    let filter = $filter('taskStatus');
    let result = filter(taskList, TaskStatus.COMPLETED);

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
