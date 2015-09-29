export const taskStatusFilter = ['Task', (Task) => {
  return (taskList, status) => {
    if (!status) return taskList;

    const completed = status === Task.STATUS_COMPLETED;

    return taskList.filter((task) => {
      return task.completed === completed;
    });
  };
}];
