routerConfig.$inject = [
  '$stateProvider',
  '$urlRouterProvider'
];
import { RouterDispatcher } from './router-dispatcher.js';

const onEnter = ['$stateParams', function($stateParams){
  RouterDispatcher.next($stateParams);
}];

export function routerConfig($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state({
      abstract: true,
      name: 'app',
      views: {
        '': {
          template: '<app></app>'
        }
      }
    })

    .state({
      name: 'app.tasks',
      url: '/tasks?filter',
      onEnter: onEnter,
      views: {
        'main@app': {
          template: '<tasks></tasks>'
        }
      }
    });


  $urlRouterProvider.otherwise('/tasks');
}
