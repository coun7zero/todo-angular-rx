import TaskList from './task-list';


describe('TaskListController', () => {
  var controller;
  var scope;
  var stateService;
  var taskService;


  beforeEach(() => {
    inject(($controller, $q, $rootScope) => {
      scope = $rootScope.$new();

      stateService = {};

      taskService = {
        tasks: [],
        getTasks: () => { return $q.resolve([]); }
      };

      controller = $controller(TaskList, {
        $scope: scope,
        StateService: stateService,
        TaskService: taskService
      });
    });
  });


  describe('Initialization', () => {
    it('should set `scope.state` with stateService', () => {
      expect(scope.state).toBe(stateService);
    });

    it('should set property `tasks` with an array', () => {
      scope.$digest();
      expect(Array.isArray(controller.tasks)).toBe(true);
    });
  });

});
