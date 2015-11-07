import { TaskList } from './task-list';


describe('TaskListController', () => {
  let controller;
  let scope;
  let subscription;
  let taskStore;


  beforeEach(() => {
    inject(($controller, $q, $rootScope) => {
      scope = $rootScope.$new();

      subscription = {
        dispose: sinon.spy()
      };

      taskStore = {
        subscribe: sinon.stub().returns(subscription)
      };

      controller = $controller(TaskList, {
        $scope: scope,
        TaskStore: taskStore
      });
    });
  });


  describe('Initialization', () => {
    it('should set property `tasks` with an array', () => {
      expect(Array.isArray(controller.tasks)).toBe(true);
    });

    it('should subscribe to TaskStore', () => {
      expect(taskStore.subscribe.callCount).toBe(1);
    });

    it('should unsubscribe from TaskStore when scope is destroyed', () => {
      scope.$destroy();
      expect(subscription.dispose.callCount).toBe(1);
    });
  });

});
