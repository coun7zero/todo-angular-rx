import 'babel-core/polyfill';
import 'styles/styles.scss';

import angular from 'angular';
import ngAria from 'angular-aria';
import uiRouter from 'angular-ui-router';

import { ActionTypes, Endpoints } from './config/constants';
import { routerConfig } from './config/router';
import { Dispatcher } from './modules/dispatcher/dispatcher';
import { APIService } from './modules/api/api-service';
import { RouterService } from './modules/router/router-service';
import { Task, TaskStatus } from './modules/task/task';
import { TaskActions } from './modules/task/task-actions';
import { TaskStore } from './modules/task/task-store';
import { App } from './components/app/app';
import { TaskForm } from './components/tasks/task-form/task-form';
import { TaskItem } from './components/tasks/task-item/task-item';
import { taskStatusFilter } from './components/tasks/task-item/task-status-filter';
import { TaskList } from './components/tasks/task-list/task-list';
import { escapeDirective } from './directives/escape-directive';
import { focusDirective } from './directives/focus-directive';


let app = angular.module('app', [
    ngAria,
    uiRouter
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
  .service('APIService', APIService)


  /*===================================
    State (ui-router)
  -----------------------------------*/
  .service('RouterService', RouterService)
  .config(routerConfig)


  /*===================================
    Task
  -----------------------------------*/
  .value('Task', Task)
  .value('TaskStatus', TaskStatus)
  .service('TaskActions', TaskActions)
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
