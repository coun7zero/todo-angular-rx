import { routerConfig } from './config/router';
import { storageConfig } from './config/storage';
import { StateService } from './core/state/state-service';
import { LocalStorageStrategy } from './core/task/local-storage-strategy';
import { ServerStorageStrategy } from './core/task/server-storage-strategy';
import { Task } from './core/task/task';
import { TaskService } from './core/task/task-service';
import { App } from './components/app/app';
import { TaskForm } from './components/tasks/task-form/task-form';
import { TaskItem } from './components/tasks/task-item/task-item';
import { taskStatusFilter } from './components/tasks/task-item/task-status-filter';
import { TaskList } from './components/tasks/task-list/task-list';
import { escapeDirective } from './directives/escape-directive';
import { focusDirective } from './directives/focus-directive';


let app = angular.module('app', [
    'angular-storage',
    'ngAria',
    'ui.router',
    'templates'
  ])


  /*===================================
    Constants
  -----------------------------------*/
  .constant('storageConfig', storageConfig)


  /*===================================
    State (ui-router)
  -----------------------------------*/
  .service('StateService', StateService)
  .config(routerConfig)


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
  .filter('taskStatus', taskStatusFilter)


  /*===================================
    TaskList component
  -----------------------------------*/
  .controller('TaskListController', TaskList)


  /*===================================
    Directives
  -----------------------------------*/
  .directive('focus', focusDirective)
  .directive('escape', escapeDirective);


// Bootstrap
angular.element(document).ready(function(){
  angular.bootstrap(document, [app.name], {strictDi: true});
});
