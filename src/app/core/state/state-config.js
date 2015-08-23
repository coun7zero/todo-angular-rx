export const stateConfig = ['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
  const taskListView = {
    'list@tasks': {
      controller: 'TaskListController as taskList',
      templateUrl: 'task-list/task-list.html'
    }
  };


  $stateProvider
    .state({
      abstract: true,
      name: 'tasks',
      views: {
        '': {
          templateUrl: 'tasks/tasks.html'
        },

        'form@tasks': {
          controller: 'TaskFormController as taskForm',
          templateUrl: 'task-form/task-form.html'
        }
      }
    })

    .state({
      name: 'tasks.all',
      url: '/tasks',
      views: taskListView
    })

    .state({
      name: 'tasks.filtered',
      url: '/tasks/{status:active|completed}',
      views: taskListView
    });


  $urlRouterProvider.otherwise('/tasks');
}];
