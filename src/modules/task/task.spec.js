import { Task } from './task';


describe('Task', () => {
  it('should set default value of property `completed` to be `false`', () => {
    let task = new Task();
    expect(task.completed).toBe(false);
  });

  it('should set property `title` with provided value', () => {
    let task = new Task('test');
    expect(task.title).toBe('test');
  });
});
