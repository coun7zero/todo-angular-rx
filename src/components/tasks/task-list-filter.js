import {
  TASK_STATUS_ACTIVE,
  TASK_STATUS_COMPLETED
} from 'modules/task/constants';


export function taskListFilter() {
  return (list, filterType) => {
    if (!list || !filterType) return list;

    switch (filterType) {
      case TASK_STATUS_ACTIVE:
        return list.filter(task => !task.completed);

      case TASK_STATUS_COMPLETED:
        return list.filter(task => task.completed);

      default:
        return list;
    }
  };
}
