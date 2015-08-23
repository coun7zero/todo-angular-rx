import Inject from 'app/core/decorators/inject';


@Inject('$state', '$stateParams', 'taskStatus') // eslint-disable-line new-cap

export default class StateService {
  constructor($state, $stateParams, taskStatus) {
    this.state = $state;
    this.params = $stateParams;
    this.taskStatus = taskStatus;
  }

  isActiveTasks() {
    return this.state.is('tasks.filtered', {status: this.taskStatus.ACTIVE});
  }

  /**
   * @returns {boolean}
   */
  isCompletedTasks() {
    return this.state.is('tasks.filtered', {status: this.taskStatus.COMPLETED});
  }

  /**
   * @returns {boolean}
   */
  isTasks() {
    return this.state.is('tasks.all');
  }

  /**
   * @async
   * @returns {promise}
   */
  toActiveTasks() {
    return this.state.go('tasks.filtered', {status: this.taskStatus.ACTIVE});
  }

  /**
   * @async
   * @returns {promise}
   */
  toCompletedTasks() {
    return this.state.go('tasks.filtered', {status: this.taskStatus.COMPLETED});
  }

  /**
   * @async
   * @returns {promise}
   */
  toTasks() {
    return this.state.go('tasks.all');
  }
}
