import { TaskForm } from './task-form';


describe('TaskFormController', () => {
  let controller;
  let scope;
  let taskService;


  beforeEach(() => {
    inject(($controller, $q, $rootScope) => {
      scope = $rootScope.$new();
      scope.newTaskForm = {$valid: true};

      taskService = {
        createTask: (task) => {
          return $q.resolve(task);
        }
      };

      sinon.spy(taskService, 'createTask');

      controller = $controller(TaskForm, {
        $scope: scope,
        TaskService: taskService
      });
    });
  });


  describe('Initialization', () => {
    it('should set property `title` with an empty string', () => {
      expect(controller.title).toBe('');
    });

    it('should define a `cancel` function', () => {
      expect(typeof controller.cancel).toBe('function');
    });

    it('should define a `submit` function', () => {
      expect(typeof controller.submit).toBe('function');
    });
  });


  describe('Creating a task', () => {
    describe('when form is valid', () => {
      it('should delegate to TaskService#createTask', () => {
        controller.submit();
        scope.$digest();
        expect(taskService.createTask.callCount).toBe(1);
      });

      it('should pass value of `title` to TaskService#createTask', () => {
        const title = 'foo';
        controller.title = title;
        controller.submit();
        scope.$digest();
        expect(taskService.createTask.calledWith(title)).toBe(true);
      });

      it('should set `title` with an empty string when create is successful', () => {
        controller.title = 'foo';
        controller.submit();
        scope.$digest();
        expect(controller.title).toBe('');
      });
    });

    describe('when form is invalid', () => {
      it('should do nothing', () => {
        scope.newTaskForm.$valid = false;
        controller.submit();
        scope.$digest();
        expect(taskService.createTask.callCount).toBe(0);
      });
    });
  });


  describe('Cancelling', () => {
    it('should set `title` with an empty string', () => {
      controller.title = 'foo';
      controller.cancel();
      expect(controller.title).toBe('');
    });
  });

});
