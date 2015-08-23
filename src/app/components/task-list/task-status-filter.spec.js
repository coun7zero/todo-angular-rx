import * as taskStatus from 'app/constants/task-status';
import { taskStatusFilter } from './task-status-filter';


describe('taskStatus filter', () => {

  beforeEach(() => {
    angular.module('test', [])
      .constant('taskStatus', taskStatus)
      .filter('taskStatus', taskStatusFilter);

    angular.mock.module('test');
  });


  it('should filter active tasks when param `status` is `active`', inject(($filter) => {
    const taskList = [{completed: true}, {completed: false}];
    const filter = $filter('taskStatus');
    const result = filter(taskList, taskStatus.ACTIVE);

    expect(result.length).toBe(1);
    expect(result[0].completed).toBe(false);
  }));

  it('should filter completed tasks when param `status` is `completed`', inject(($filter) => {
    const taskList = [{completed: true}, {completed: false}];
    const filter = $filter('taskStatus');
    const result = filter(taskList, taskStatus.COMPLETED);

    expect(result.length).toBe(1);
    expect(result[0].completed).toBe(true);
  }));

  it('should return all tasks when param `status` is undefined', inject(($filter) => {
    const taskList = [{completed: true}, {completed: false}];
    const filter = $filter('taskStatus');
    const result = filter(taskList);

    expect(result).toBe(taskList);
  }));

  it('should return all tasks when param `status` is invalid', inject(($filter) => {
    const taskList = [{completed: true}, {completed: false}];
    const filter = $filter('taskStatus');
    const result = filter(taskList, 'foo');

    expect(result).toBe(taskList);
  }));

});
