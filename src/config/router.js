import appTemplate from 'components/app/app.html';
import taskFormTemplate from 'components/tasks/task-form/task-form.html';
import taskListTemplate from 'components/tasks/task-list/task-list.html';
import tasksTemplate from 'components/tasks/tasks.html';


export const routerConfig = ['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
  $stateProvider
    .state({
      abstract: true,
      name: 'app',
      views: {
        '': {
          controller: 'AppController as app',
          template: appTemplate
        }
      }
    })

    .state({
      name: 'app.tasks',
      url: '/tasks?filter',
      views: {
        'main@app': {
          template: tasksTemplate
        },

        'form@app.tasks': {
          controller: 'TaskFormController as taskForm',
          template: taskFormTemplate
        },

        'list@app.tasks': {
          controller: 'TaskListController as taskList',
          template: taskListTemplate
        }
      }
    });


  $urlRouterProvider.otherwise('/tasks');
}];
