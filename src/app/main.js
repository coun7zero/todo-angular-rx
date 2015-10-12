import { ActionTypes, Endpoints } from './config/constants';
import { routerConfig } from './config/router';
import { Dispatcher } from './core/dispatcher/dispatcher';
import { ServerService } from './core/server/server-service';
import { StateService } from './core/state/state-service';
import { Task, TaskStatus } from './core/task/task';
import { TaskService } from './core/task/task-service';
import { TaskStore } from './core/task/task-store';
import { App } from './components/app/app';
import { TaskForm } from './components/tasks/task-form/task-form';
import { TaskItem } from './components/tasks/task-item/task-item';
import { taskStatusFilter } from './components/tasks/task-item/task-status-filter';
import { TaskList } from './components/tasks/task-list/task-list';
import { escapeDirective } from './directives/escape-directive';
import { focusDirective } from './directives/focus-directive';


let app = angular.module('app', [
    'ngAria',
    'ui.router',
    'templates'
  ])


  /*===================================
    Constants
  -----------------------------------*/
  .constant('ActionTypes', ActionTypes)
  .constant('Endpoints', Endpoints)


  /*===================================
    Dispatcher
  -----------------------------------*/
  .service('Dispatcher', Dispatcher)


  /*===================================
    Server
  -----------------------------------*/
  .service('ServerService', ServerService)


  /*===================================
    State (ui-router)
  -----------------------------------*/
  .service('StateService', StateService)
  .config(routerConfig)


  /*===================================
    Task
  -----------------------------------*/
  .value('Task', Task)
  .value('TaskStatus', TaskStatus)
  .service('TaskService', TaskService)
  .service('TaskStore', TaskStore)


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
