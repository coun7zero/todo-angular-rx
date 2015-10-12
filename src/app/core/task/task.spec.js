import { Task, TaskStatus } from './task';


describe('Task', () => {
  it('should set default value of property `completed` to be `false`', () => {
    let task = new Task();
    expect(task.completed).toBe(false);
  });

  it('should set property `title` with provided value', () => {
    let task = new Task('test');
    expect(task.title).toBe('test');
  });


  describe('TaskStatus', () => {
    it('should have static property `ACTIVE`', () => {
      expect(TaskStatus.ACTIVE).toBe('active');
    });

    it('should have static property `COMPLETED`', () => {
      expect(TaskStatus.COMPLETED).toBe('completed');
    });
  });
});
