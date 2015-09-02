import Inject from 'app/core/decorators/inject';


@Inject('$state', '$stateParams', 'Task') // eslint-disable-line new-cap

export default class StateService {
  constructor($state, $stateParams, Task) {
    this.state = $state;
    this.params = $stateParams;
    this.STATUS_ACTIVE = Task.STATUS_ACTIVE;
    this.STATUS_COMPLETED = Task.STATUS_COMPLETED;
  }

  isActiveTasks() {
    return this.state.is('tasks.filtered', {status: this.STATUS_ACTIVE});
  }

  /**
   * @returns {boolean}
   */
  isCompletedTasks() {
    return this.state.is('tasks.filtered', {status: this.STATUS_COMPLETED});
  }

  /**
   * @returns {boolean}
   */
  isTasks() {
    return this.state.is('tasks.all');
  }

  /**
   * @async
   * @returns $state.current
   */
  toActiveTasks() {
    return this.state.go('tasks.filtered', {status: this.STATUS_ACTIVE});
  }

  /**
   * @async
   * @returns $state.current
   */
  toCompletedTasks() {
    return this.state.go('tasks.filtered', {status: this.STATUS_COMPLETED});
  }

  /**
   * @async
   * @returns $state.current
   */
  toTasks() {
    return this.state.go('tasks.all');
  }
}
