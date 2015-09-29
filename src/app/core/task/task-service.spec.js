import TaskService from './task-service';
import * as storageConfig from 'app/config/storage';


describe('TaskService', () => {
  const LocalStorageStrategy = {};
  const ServerStorageStrategy = {};


  describe('local storage strategy', () => {
    beforeEach(() => {
      let config = angular.copy(storageConfig);
      config.STORAGE_STRATEGY = 'LocalStorageStrategy';

      angular.mock.module($provide => {
        $provide.constant('storageConfig', config);
        $provide.value('LocalStorageStrategy', LocalStorageStrategy);
        $provide.factory('taskService', TaskService);
      });
    });

    it('should implement local api', inject(taskService => {
      expect(taskService).toBe(LocalStorageStrategy);
    }));
  });


  describe('server storage strategy', () => {
    beforeEach(() => {
      let config = angular.copy(storageConfig);
      config.STORAGE_STRATEGY = 'ServerStorageStrategy';

      angular.mock.module($provide => {
        $provide.constant('storageConfig', config);
        $provide.value('ServerStorageStrategy', ServerStorageStrategy);
        $provide.factory('taskService', TaskService);
      });
    });

    it('should implement server api', inject(taskService => {
      expect(taskService).toBe(ServerStorageStrategy);
    }));
  });

});
