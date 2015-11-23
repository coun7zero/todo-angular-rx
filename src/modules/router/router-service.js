import {
  TASK_STATUS_ACTIVE,
  TASK_STATUS_COMPLETED
} from 'modules/task/constants';


export class RouterService {
  constructor($state, $stateParams) {
    this.state = $state;
    this.params = $stateParams;
  }

  isActiveTasks() {
    return this.state.is('app.tasks', {filter: TASK_STATUS_ACTIVE});
  }

  isCompletedTasks() {
    return this.state.is('app.tasks', {filter: TASK_STATUS_COMPLETED});
  }

  isTasks() {
    return this.state.is('app.tasks', {filter: ''});
  }

  toActiveTasks() {
    return this.state.go('app.tasks', {filter: TASK_STATUS_ACTIVE});
  }

  toCompletedTasks() {
    return this.state.go('app.tasks', {filter: TASK_STATUS_COMPLETED});
  }

  toTasks() {
    return this.state.go('app.tasks');
  }
}
