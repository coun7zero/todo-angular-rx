export const taskStatusFilter = ['Task', Task => {
  return (taskList, filter) => {
    let completed;

    if (filter === Task.STATUS_ACTIVE) {
      completed = false;
    }
    else if (filter === Task.STATUS_COMPLETED) {
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
