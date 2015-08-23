import * as keyCodes from './constants/key-codes';
import { LOCAL_STORAGE_KEY } from './constants/local-storage';
import * as taskStatus from './constants/task-status';
import { stateConfig } from './core/state/state-config';
import StateService from './core/state/state-service';
import Task from './core/task/task';
import TaskService from './core/task/task-service';
import TaskForm from './components/task-form/task-form';
import TaskItem from './components/task-item/task-item';
import TaskList from './components/task-list/task-list';
import { taskStatusFilter } from './components/task-list/task-status-filter';
import { escapeDirective } from './common/escape-directive';


const app = angular

  .module('app', [
    'angular-storage',
    'ngAria',
    'ui.router',
    'app.templates'
  ])


  /*===================================
    Constants
  -----------------------------------*/
  .constant('keyCodes', keyCodes)
  .constant('localStorageKey', LOCAL_STORAGE_KEY)
  .constant('taskStatus', taskStatus)


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
