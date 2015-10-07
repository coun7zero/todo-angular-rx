export class Task {
  static STATUS_ACTIVE = 'active';
  static STATUS_COMPLETED = 'completed';

  constructor(title = '') {
    this.completed = false;
    this.title = title;
  }
}
