import 'babel-polyfill';
import 'styles/styles.scss';

import angular from 'angular';
import ngAria from 'angular-aria';
import uiRouter from 'angular-ui-router';

import { App, AppDirective } from 'components/app/app';
import { Tasks, TasksDirective } from 'components/tasks/tasks';
import { TaskForm, TaskFormDirective } from 'components/tasks/task-form/task-form';
import { TaskItem, TaskItemDirective } from 'components/tasks/task-item/task-item';
import { taskListFilter } from 'components/tasks/task-list-filter';

import { escapeDirective } from 'directives/escape-directive';
import { focusDirective } from 'directives/focus-directive';

import { APIService } from 'modules/api/api-service';
import { Dispatcher } from 'modules/dispatcher/dispatcher';
import { routerConfig } from 'modules/router/router-config';
import { TaskActions } from 'modules/task/task-actions';
import { TaskStore } from 'modules/task/task-store';


let app = angular.module('app', [
    ngAria,
    uiRouter
  ])

  .controller('App', App)
  .directive('app', AppDirective)

  .controller('Tasks', Tasks)
  .directive('tasks', TasksDirective)

  .controller('TaskForm', TaskForm)
  .directive('taskForm', TaskFormDirective)

  .controller('TaskItem', TaskItem)
  .directive('taskItem', TaskItemDirective)

  .filter('filterTasks', taskListFilter)

  .directive('escape', escapeDirective)
  .directive('focus', focusDirective)

  .service('APIService', APIService)
  .service('Dispatcher', Dispatcher)
  .service('TaskActions', TaskActions)
  .service('TaskStore', TaskStore)

  .config(routerConfig);


angular.element(document).ready(() => {
  angular.bootstrap(document, [app.name], {strictDi: true});
});
