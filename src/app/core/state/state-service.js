import { Inject } from 'app/core/decorators/inject';


@Inject('$state', '$stateParams', 'Task')
export class StateService {
  constructor($state, $stateParams, Task) {
    this.state = $state;
    this.params = $stateParams;
    this.STATUS_ACTIVE = Task.STATUS_ACTIVE;
    this.STATUS_COMPLETED = Task.STATUS_COMPLETED;
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
