import Inject from 'app/core/decorators/inject';


@Inject('$scope', 'StateService', 'TaskService') // eslint-disable-line new-cap

export default class TaskList {
  constructor($scope, stateService, taskService) {
    $scope.state = stateService;

    this.taskService = taskService;

    taskService.getTasks().then(() => {
      this.tasks = taskService.tasks;
    });
  }
}
