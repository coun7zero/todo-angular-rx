import { Inject } from 'modules/decorators/inject';


@Inject('$state', '$stateParams', 'TaskStatus')
export class RouterService {
  constructor($state, $stateParams, TaskStatus) {
    this.state = $state;
    this.params = $stateParams;
    this.STATUS_ACTIVE = TaskStatus.ACTIVE;
    this.STATUS_COMPLETED = TaskStatus.COMPLETED;
  }

  /**
   * @returns {boolean}
   */
  isActiveTasks() {
    return this.state.is('app.tasks', {filter: this.STATUS_ACTIVE});
  }

  /**
   * @returns {boolean}
   */
  isCompletedTasks() {
    return this.state.is('app.tasks', {filter: this.STATUS_COMPLETED});
  }

  /**
   * @returns {boolean}
   */
  isTasks() {
    return this.state.is('app.tasks', {filter: ''});
  }

  /**
   * @async
   * @returns $state.current
   */
  toActiveTasks() {
    return this.state.go('app.tasks', {filter: this.STATUS_ACTIVE});
  }

  /**
   * @async
   * @returns $state.current
   */
  toCompletedTasks() {
    return this.state.go('app.tasks', {filter: this.STATUS_COMPLETED});
  }

  /**
   * @async
   * @returns $state.current
   */
  toTasks() {
    return this.state.go('app.tasks');
  }
}
