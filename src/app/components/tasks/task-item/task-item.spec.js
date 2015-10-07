import { TaskItem } from './task-item';


describe('TaskItemController', () => {
  let controller;
  let scope;
  let taskService;


  beforeEach(() => {
    inject(($controller, $q, $rootScope) => {
      scope = $rootScope.$new();
      scope.task = {completed: false, title: 'test'};

      taskService = {
        tasks: [],
        deleteTask: () => { return $q.resolve(); },
        updateTask: () => { return $q.resolve(); }
      };

      sinon.spy(taskService, 'deleteTask');
      sinon.spy(taskService, 'updateTask');

      controller = $controller(TaskItem, {
        $scope: scope,
        TaskService: taskService
      });
    });
  });


  describe('Initialization', () => {
    it('should set property `editing` to be `false`', () => {
      expect(controller.editing).toBe(false);
    });

    it('should set property `statusUpdated` to be `false`', () => {
      expect(controller.statusUpdated).toBe(false);
    });

    it('should define a `cancelEdit` function', () => {
      expect(typeof controller.cancelEdit).toBe('function');
    });

    it('should define a `edit` function', () => {
      expect(typeof controller.edit).toBe('function');
    });

    it('should define a `delete` function', () => {
      expect(typeof controller.delete).toBe('function');
    });

    it('should define a `save` function', () => {
      expect(typeof controller.save).toBe('function');
    });

    it('should define a `toggleCompleted` function', () => {
      expect(typeof controller.toggleCompleted).toBe('function');
    });
  });


  describe('Editing a task', () => {
    it('should set `editing` to `true`', () => {
      controller.edit();
      expect(controller.editing).toBe(true);
    });

    it('should set `title` to equal `scope.task.title`', () => {
      controller.edit();
      expect(controller.title).toBe(scope.task.title);
    });
  });


  describe('Canceling edit mode', () => {
    it('should set `editing` to `false`', () => {
      controller.editing = true;
      controller.cancelEdit();
      expect(controller.editing).toBe(false);
    });
  });


  describe('Deleting a task', () => {
    it('should delegate to TaskService#deleteTask', () => {
      controller.delete();
      scope.$digest();
      expect(taskService.deleteTask.callCount).toBe(1);
    });

    it('should pass task object to TaskService#deleteTask', () => {
      controller.delete();
      scope.$digest();
      expect(taskService.deleteTask.calledWith(scope.task)).toBe(true);
    });
  });


  describe('Updating a task', () => {
    it('should set `editing` to `false`', () => {
      controller.editing = true;
      controller.save();
      scope.$digest();
      expect(controller.editing).toBe(false);
    });

    describe('when `editing` is `false`', () => {
      it('should do nothing', () => {
        controller.save();
        scope.$digest();
        expect(taskService.updateTask.callCount).toBe(0);
      });
    });

    describe('when `editing` is `true` and title has changed', () => {
      it('should delegate to TaskService#updateTask', () => {
        controller.editing = true;
        controller.title = 'foo';
        controller.save();
        scope.$digest();
        expect(taskService.updateTask.callCount).toBe(1);
      });

      it('should pass task object to TaskService#updateTask', () => {
        controller.editing = true;
        controller.title = 'foo';
        controller.save();
        scope.$digest();
        expect(taskService.updateTask.calledWith(scope.task)).toBe(true);
      });
    });

    describe('when `editing` is `true` and title has not changed', () => {
      it('should do nothing', () => {
        controller.editing = true;
        controller.title = scope.task.title;
        controller.save();
        scope.$digest();
        expect(taskService.updateTask.callCount).toBe(0);
      });
    });
  });


  describe('Toggling task status', () => {
    it('should delegate to TaskService#updateTask', () => {
      controller.toggleCompleted();
      expect(taskService.updateTask.callCount).toBe(1);
    });

    it('should toggle `statusModified` value', () => {
      expect(controller.statusUpdated).toBe(false);

      controller.toggleCompleted();
      expect(controller.statusUpdated).toBe(true);

      controller.toggleCompleted();
      expect(controller.statusUpdated).toBe(false);
    });
  });

});
