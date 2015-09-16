import { API_TYPE } from './config/api';
import { LOCAL_STORAGE_KEY } from './config/local-storage';
import LocalStorageApi from './core/api/local-storage-api';
import ServerApi from './core/api/server-api';
import { stateConfig } from './core/state/state-config';
import StateService from './core/state/state-service';
import Task from './core/task/task';
import TaskService from './core/task/task-service';
import App from './components/app/app';
import TaskForm from './components/tasks/task-form/task-form';
import TaskItem from './components/tasks/task-item/task-item';
import TaskList from './components/tasks/task-list/task-list';
import { taskStatusFilter } from './components/tasks/task-list/task-status-filter';
import { escapeDirective } from './common/escape-directive';


const app = angular

  .module('app', [
    'angular-storage',
    'ngAria',
    'ui.router',
    'templates'
  ])


  /*===================================
    Constants
  -----------------------------------*/
  .constant('apiType', API_TYPE)
  .constant('localStorageKey', LOCAL_STORAGE_KEY)


  /*===================================
    API
  -----------------------------------*/
  .service('LocalStorageApi', LocalStorageApi)
  .service('ServerApi', ServerApi)


  /*===================================
    State (ui-router)
  -----------------------------------*/
  .service('StateService', StateService)
  .config(stateConfig)


  /*===================================
    Task
  -----------------------------------*/
  .value('Task', Task)
  .service('TaskService', TaskService)


  /*===================================
    App component
  -----------------------------------*/
  .controller('AppController', App)


  /*===================================
    TaskForm component
  -----------------------------------*/
  .controller('TaskFormController', TaskForm)


  /*===================================
    TaskItem component
  -----------------------------------*/
  .controller('TaskItemController', TaskItem)


  /*===================================
    TaskList component
  -----------------------------------*/
  .controller('TaskListController', TaskList)
  .filter('taskStatus', taskStatusFilter)


  /*===================================
    Directives
  -----------------------------------*/
  .directive('escape', escapeDirective);


// Bootstrap
angular.element(document).ready(function(){
  angular.bootstrap(document, [app.name], {strictDi: true});
});
