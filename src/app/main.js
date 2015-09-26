import { LOCAL_STORAGE_KEY } from './config/storage';
import { STORAGE_STRATEGY } from './config/storage';
import { stateConfig } from './core/state/state-config';
import StateService from './core/state/state-service';
import LocalStorageStrategy from './core/task/local-storage-strategy';
import ServerStorageStrategy from './core/task/server-storage-strategy';
import Task from './core/task/task';
import TaskService from './core/task/task-service';
import App from './components/app/app';
import TaskForm from './components/tasks/task-form/task-form';
import TaskItem from './components/tasks/task-item/task-item';
import TaskList from './components/tasks/task-list/task-list';
import { taskStatusFilter } from './components/tasks/task-list/task-status-filter';
import { escapeDirective } from './common/escape-directive';
import { focusDirective } from './common/focus-directive';


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
  .constant('localStorageKey', LOCAL_STORAGE_KEY)
  .constant('storageStrategy', STORAGE_STRATEGY)


  /*===================================
    State (ui-router)
  -----------------------------------*/
  .service('StateService', StateService)
  .config(stateConfig)


  /*===================================
    Task
  -----------------------------------*/
  .value('Task', Task)
  .service('LocalStorageStrategy', LocalStorageStrategy)
  .service('ServerStorageStrategy', ServerStorageStrategy)
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
  .directive('focus', focusDirective)
  .directive('escape', escapeDirective);


// Bootstrap
angular.element(document).ready(function(){
  angular.bootstrap(document, [app.name], {strictDi: true});
});
