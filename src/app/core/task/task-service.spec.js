import TaskService from './task-service';


describe('TaskService', () => {
  const LocalStorageStrategy = {};
  const ServerStorageStrategy = {};


  describe('local storage strategy', () => {
    beforeEach(() => {
      angular.mock.module($provide => {
        $provide.constant('storageStrategy', 'LocalStorageStrategy');
        $provide.value('LocalStorageStrategy', LocalStorageStrategy);
        $provide.value('ServerStorageStrategy', ServerStorageStrategy);
        $provide.factory('taskService', TaskService);
      });
    });

    it('should implement local api', inject(taskService => {
      expect(taskService).toBe(LocalStorageStrategy);
    }));
  });


  describe('server storage strategy', () => {
    beforeEach(() => {
      angular.mock.module($provide => {
        $provide.constant('storageStrategy', 'ServerStorageStrategy');
        $provide.value('LocalStorageStrategy', LocalStorageStrategy);
        $provide.value('ServerStorageStrategy', ServerStorageStrategy);
        $provide.factory('taskService', TaskService);
      });
    });

    it('should implement server api', inject(taskService => {
      expect(taskService).toBe(ServerStorageStrategy);
    }));
  });

});
