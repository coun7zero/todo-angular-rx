export class Task {
  constructor(title) {
    this.completed = false;
    this.title = title;
  }
}


export const TaskStatus = {
  ACTIVE: 'active',
  COMPLETED: 'completed'
};
