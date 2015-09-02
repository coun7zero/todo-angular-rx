import TaskService from './task-service';


describe('TaskService', () => {
  const LocalStorageApi = {};
  const ServerApi = {};


  describe('local api', () => {
    beforeEach(() => {
      angular.mock.module($provide => {
        $provide.constant('apiType', 'LocalStorageApi');
        $provide.value('LocalStorageApi', LocalStorageApi);
        $provide.value('ServerApi', ServerApi);
        $provide.factory('taskService', TaskService);
      });
    });

    it('should implement local api', inject(taskService => {
      expect(taskService).toBe(LocalStorageApi);
    }));
  });


  describe('server api', () => {
    beforeEach(() => {
      angular.mock.module($provide => {
        $provide.constant('apiType', 'ServerApi');
        $provide.value('LocalApi', LocalStorageApi);
        $provide.value('ServerApi', ServerApi);
        $provide.factory('taskService', TaskService);
      });
    });

    it('should implement server api', inject(taskService => {
      expect(taskService).toBe(ServerApi);
    }));
  });

});
