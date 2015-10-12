export const taskStatusFilter = ['TaskStatus', TaskStatus => {
  return (taskList, filter) => {
    let completed;

    if (filter === TaskStatus.ACTIVE) {
      completed = false;
    }
    else if (filter === TaskStatus.COMPLETED) {
      completed = true;
    }
    else {
      return taskList;
    }

    return taskList.filter(task => {
      return task.completed === completed;
    });
  };
}];
