import TaskList from './task-list';


describe('TaskListController', () => {
  let controller;
  let scope;
  let taskService;


  beforeEach(() => {
    inject(($controller, $q, $rootScope) => {
      scope = $rootScope.$new();

      taskService = {
        tasks: [],
        getTasks: () => { return $q.resolve([]); }
      };

      controller = $controller(TaskList, {
        TaskService: taskService
      });
    });
  });


  describe('Initialization', () => {
    it('should set property `tasks` with an array', () => {
      scope.$digest();
      expect(Array.isArray(controller.tasks)).toBe(true);
    });
  });

});
