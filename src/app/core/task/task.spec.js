import Task from './task';


describe('Task', () => {

  beforeEach(() => {
    angular.mock.module(($provide) => {
      $provide.value('Task', Task);
    });
  });


  it('should have static property `STATUS_ACTIVE`', inject((Task) => {
    expect(Task.STATUS_ACTIVE).toBe('active');
  }));

  it('should have static property `STATUS_COMPLETED`', inject((Task) => {
    expect(Task.STATUS_COMPLETED).toBe('completed');
  }));


  describe('Constructor', () => {
    it('should set property `completed` to be `false`', inject((Task) => {
      const task = new Task();
      expect(task.completed).toBe(false);
    }));

    it('should set property `title` with provided value', inject((Task) => {
      const task = new Task('test');
      expect(task.title).toBe('test');
    }));

    it('should set property `title` with empty string if title is not provided', inject((Task) => {
      const task = new Task();
      expect(task.title).toBe('');
    }));
  });

});
